FROM --platform=$BUILDPLATFORM rust:1.79.0 as builder
ARG VERSION
WORKDIR /work
RUN git clone -b v${VERSION} --single-branch --depth 1 --recurse-submodules --shallow-submodules https://github.com/Conflux-Chain/conflux-rust.git conflux && \
    cd conflux && \
    cargo build --release

FROM node:18-slim
RUN apt-get update && apt-get install -y \
    libssl-dev\
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /work/conflux/target/release/conflux /bin/conflux

COPY ./cfxrun/scripts/package.json .
RUN npm install

WORKDIR /root
COPY ./cfxrun ./run

WORKDIR /root/run
RUN chmod +x start.sh conflux.sh gene_account.sh

EXPOSE 12535 12536 12537 12538 12539 32323 32525
ENTRYPOINT [ "./start.sh" ]