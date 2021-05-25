FROM confluxchain/conflux-node-arm64:0.0.1
WORKDIR /root
COPY cfxrun run
RUN ln -s /root/run/conflux /usr/local/bin/conflux
RUN cd run/scripts && npm install

WORKDIR /root/run
RUN chmod +x start.sh conflux.sh gene_account.sh

EXPOSE 12535 12536 12537 12538 12539 32323 32525
ENTRYPOINT [ "./start.sh" ]