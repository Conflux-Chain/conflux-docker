FROM debian:buster-slim
# FROM alpine:3.13
WORKDIR /root
# Add the config files
ADD conflux-binary/run run
# Move to bin directory
RUN mv run/conflux /bin/conflux

# Prepare config
COPY prepare-config.sh /root/prepare-config.sh
RUN sh /root/prepare-config.sh

WORKDIR /root/run
ENTRYPOINT [ "/bin/conflux", "--config", "conflux.toml" ]
