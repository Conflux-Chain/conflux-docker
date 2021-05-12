FROM rust:1.51.0-buster as builder
RUN apt-get update && apt-get install -y cmake
WORKDIR /usr/src
ADD conflux conflux
# RUN mkdir $HOME/.cargo
# ADD misc/cargo-config.toml $HOME/.cargo/config
# ENV HTTP_PROXY "http://host.docker.internal:1087"
# ENV HTTPS_PROXY "http://host.docker.internal:1087"
WORKDIR /usr/src/conflux
RUN cargo clean
RUN cargo install --path .


FROM confluxchain/conflux-node:0.2.1
ADD cfxrun /root/run
COPY --from=builder /usr/local/cargo/bin/conflux /usr/local/bin/conflux
COPY --from=builder /usr/local/cargo/bin/cfxkey /usr/local/bin/cfxkey
COPY --from=builder /usr/local/cargo/bin/conflux /root/run/conflux

RUN apt-get update && apt-get install -y openssl libssl-dev

WORKDIR /root/run
RUN chmod +x start.sh conflux.sh gene_account.sh
EXPOSE 12535 12536 12537 12538 12539 32323 32525
ENTRYPOINT [ "./start.sh" ]