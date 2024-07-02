#!/bin/sh
# Rename config file to conflux.toml
if [ -f "/root/run/hydra.toml" ];then
  mv /root/run/hydra.toml /root/run/conflux.toml
 else
 mv /root/run/testnet.toml /root/run/conflux.toml
fi
# Add default pos_key password
echo '\n\ndev_pos_private_key_encryption_password = "CFXV20"' >> /root/run/conflux.toml