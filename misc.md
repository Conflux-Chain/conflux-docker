Simple doc
===

### Goal

1. Minimal size
2. Attach config file from outside
3. Support to use conflux commands
4. Initial accounts with balance

### Initial accounts

1. Generate 10 private key, write it to the private_secret file
2. Convert private key to keystore file, then import it
3. The author address will receive the mine rewards

So i need a script to:
1. check if the config file has the `genesis_secrets` if have, read all it's privatekey then import to local
2. unlock the account with default password

### TO OP

1. install cmake with apt-get
2. generate miner account random
3. OP genesis account generate way


keys location in docker: /root/.local/share/Conflux/keys

