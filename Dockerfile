FROM confluxchain/conflux-rust-builder:0.1.1 as builder
WORKDIR /usr/src
ADD conflux /usr/src/conflux
WORKDIR /usr/src/conflux
# RUN mkdir $HOME/.cargo
# ADD misc/cargo-config.toml $HOME/.cargo/config
RUN cargo clean
# ENV HTTP_PROXY "http://host.docker.internal:1087"
# ENV HTTPS_PROXY "http://host.docker.internal:1087"
RUN cargo install --path .


FROM confluxchain/conflux-node:0.1.0
WORKDIR /root
COPY --from=builder /usr/local/cargo/bin/conflux /usr/local/bin/conflux
COPY --from=builder /usr/local/cargo/bin/cfxkey /usr/local/bin/cfxkey
COPY . .
RUN cd scripts && npm i 
# --registry=https://registry.npm.taobao.org
EXPOSE 12535 12536 12537 12538 12539 32323 32525
# CMD ["conflux", "--config", "default.toml"]
RUN chmod +x start.sh
RUN chmod +x conflux.sh
RUN chmod +x gene_account.sh
ENTRYPOINT [ "./start.sh" ]