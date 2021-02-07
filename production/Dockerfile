FROM debian:buster-slim
# FROM alpine:3.13
WORKDIR /root
ADD conflux-binary/run cfxrun
WORKDIR /root/cfxrun
ENTRYPOINT [ "sh", "./start.sh" ]
