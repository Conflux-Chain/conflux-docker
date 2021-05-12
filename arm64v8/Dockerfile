FROM arm64v8/node:16-buster-slim
WORKDIR /root
COPY cfxrun run
ADD cfxrun/scripts/package.json package.json
RUN cd cfxrun/scripts && npm install

WORKDIR /root/run
RUN chmod +x start.sh conflux.sh gene_account.sh

EXPOSE 12535 12536 12537 12538 12539 32323 32525
ENTRYPOINT [ "./start.sh" ]