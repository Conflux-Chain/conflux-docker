# Conflux-rust Docker Image

Conflux-rust is a Rust implementation of the Conflux protocol. This is Conflux-rust's docker image.

The conflux-rust docker image can be used to:

1. Run a `Conflux dev node for local development`
2. Setup a `Conflux mainnet/testnet node` to providing RPC services or becoming a PoS validator.

## Docker Image Tags

Currently, we publish the following image tags to Docker Hub:

1. `x.x.x` - the default tag family, which is for running a local dev node
2. `x.x.x-mainnet` - the mainnet tag family, which is for running a mainnet node
3. `x.x.x-testnet` - the testnet tag family, which is for running a testnet node

Check docker hub [conflux-rust tag list page](https://hub.docker.com/r/confluxchain/conflux-rust/tags) for the latest available tags.

**Note: If you want run a `mainnet` or `testnet` node, you should use the `x.x.x-mainnet` or `x.x.x-testnet` tag.**

## Run a local dev node

The local dev node is a Conflux node that runs in `dev` mode. It is a standalone chain that is not connected to the Conflux mainnet or testnet. It is useful for local development and testing.

It will setup 10 genesis accounts (each with 1000 CFX) and all unlocked, you can use it as local Dapp develop environment. Developers can use the local RPC methods `cfx_accounts` to list accounts, and use `cfx_sendTransaction` to send transactions.

### Quick Start

Step 1 pull image from docker hub

```sh
docker pull confluxchain/conflux-rust:latest
```

Step 2 run the image

```sh
docker run -p 12537:12537 -p 12539:12539 --rm --name cfx-node confluxchain/conflux-rust:latest
```

After the container is running, you can use SDKs or RPC tools to connect to the local node, the RPC endpoint is `http://localhost:12539`.

**`Note`: the unlock process maybe need one or two minutes.**

You can use docker exec to enter the container and check the config files:

```sh
docker exec -it cfx-node /bin/bash # replace cfx-node with your container name
# miner private key is in conflux.toml, you can use `cat conflux.toml` to check it
```

You can also check [How to run an Independent Chain](https://doc.confluxnetwork.org/docs/general/run-a-node/advanced-topics/running-independent-chain) for more details.

## Run a Mainnet/Testnet node

To run a mainnet or testnet node, you can use the `x.x.x-mainnet` or `x.x.x-testnet` tag.

```sh
docker run -p 12537:12537 --name cfx-node confluxchain/conflux-rust:x.x.x-mainnet
```

If everything is ok, the node will start syncing the mainnet or testnet chain data. Which will take some time(one or two month).

By default the node data and pos_key will be saved in the container, if you want to save the data to the host machine, you can use the `-v` option to mount a host folder to the container.

1. First get `config files` from [conflux-rust release page](https://github.com/Conflux-Chain/conflux-rust/releases). There are two categories release, one is `mainnet` and the other is `testnet(tag name include 'testnet' eg Conflux v2.3.5-testnet)`, you can download the corresponding according to your needs.
2. Rename the `hydra.toml or testnet.toml` to `conflux.toml`
3. Add `dev_pos_private_key_encryption_password = "your-pos-key-password"` to `conflux.toml`

```sh
# replace /path-to-your-config-folder with your config folder path
# replace x.x.x-mainnet with the tag you want to use
docker run -p 12537:12537 -v /path-to-your-config-folder:/root/run --name cfx-node confluxchain/conflux-rust:2.4.0-mainnet 
```

By this way, the node data and pos_key will be saved in the host folder `/path-to-your-config-folder`. You can also download the blockchain snapshot data from [Conflux Snapshot](https://doc.confluxnetwork.org/docs/general/run-a-node/snapshot-tool) to speed up the sync process.

## Notes

1. When use docker you can't use `jsonrpc_local_tcp_port` and `jsonrpc_local_http_port`, but in `dev` mode you can access local RPC on `jsonrpc_http_port`
2. Local dev node will not connect to `testnet` or `mainnet`, it is a independent chain
3. **From v2.0 the docker image's default config file is renamed from `default.toml` to `conflux.toml`**, if you want mount your own config file, please rename it to `conflux.toml`.
4. **If you want use your own config file, need manually add this option `dev_pos_private_key_encryption_password = "your-pos-pwd"`**

## Docs

1. [Official doc - How to install and run conflux-rust](https://doc.confluxnetwork.org/docs/general/run-a-node/)
