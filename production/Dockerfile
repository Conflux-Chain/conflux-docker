FROM debian:buster-slim
# FROM alpine:3.13
WORKDIR /root
ADD conflux-binary/run run
WORKDIR /root/run
ENTRYPOINT [ "sh", "./start.sh" ]
