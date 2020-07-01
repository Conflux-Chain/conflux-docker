FROM rust:1.42.0-buster as builder
# install cmake
RUN wget https://github.com/Kitware/CMake/releases/download/v3.15.2/cmake-3.15.2.tar.gz && \
    tar -zxvf cmake-3.15.2.tar.gz && \
    cd cmake-3.15.2 && \
    ./bootstrap && \
    make && \
    make install
WORKDIR /usr/src
RUN git clone -b v0.5.0.2  --single-branch --depth 1 https://github.com/Conflux-Chain/conflux-rust.git conflux
WORKDIR /usr/src/conflux
RUN cargo install --path .

FROM debian:buster-slim
RUN apt-get update && apt-get install -y curl build-essential
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - && \
    apt-get install -y nodejs

WORKDIR /root
COPY --from=builder /usr/local/cargo/bin/conflux /usr/local/bin/conflux
COPY --from=builder /usr/local/cargo/bin/cfxkey /usr/local/bin/cfxkey
COPY . .
RUN cd scripts && npm i

EXPOSE 12535 12536 12537 12538 12539 32323 32525
# CMD ["conflux", "--config", "default.toml"]
RUN chmod +x start.sh
RUN chmod +x conflux.sh
RUN chmod +x gene_account.sh
ENTRYPOINT [ "./start.sh" ]