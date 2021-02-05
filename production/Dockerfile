FROM debian:buster-slim
# FROM alpine:3.13
ADD conflux-binary/run conflux
WORKDIR conflux
RUN pwd
# blockchain_data
ENTRYPOINT [ "sh",  "./start.sh" ]
