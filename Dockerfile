FROM --platform=$BUILDPLATFORM rust:1.79.0-slim AS builder
ARG VERSION

RUN apt-get update && apt-get install -y \
    git \
    clang \
    libsqlite3-dev \
    pkg-config \
    libssl-dev \
    cmake \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /work

RUN git clone -b v${VERSION} --single-branch --depth 1 https://github.com/Conflux-Chain/conflux-rust.git conflux 

WORKDIR /work/conflux

RUN export CC=clang && export CXX=clang++ && cargo build --release



FROM node:18-slim AS node_modules

COPY --from=builder /work/conflux/target/release/conflux /bin/conflux

WORKDIR /root

COPY ./cfxrun/scripts/package.json .

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    build-essential && \
    npm install


FROM node:18-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl &&\
    rm -rf /var/lib/apt/lists/*

COPY --from=builder /work/conflux/target/release/conflux /bin/conflux

WORKDIR /root

COPY ./cfxrun/scripts/package.json .

COPY --from=node_modules /root/node_modules /root/node_modules

COPY ./cfxrun ./run

WORKDIR /root/run
RUN chmod +x start.sh conflux.sh gene_account.sh

EXPOSE 12535 12536 12537 12538 12539 32323 32525
ENTRYPOINT [ "./start.sh" ]