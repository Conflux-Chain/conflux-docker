confluxchain/conflux-rust
===
Conflux-rust is a Rust implementation of the Conflux protocol.
This is Conflux-rust's docker image.

## Tags

[Current tags](https://hub.docker.com/r/confluxchain/conflux-rust/tags)

`Warning`: These tags image's `default.toml` will config a independent chain with 10 genesis accounts (each with 1000 CFX) and all unlocked, you can use it as local Dapp develop environment. If you want run a `mainnet` or `testnet` node, you need to use your own config file, and your local config file's bootnodes need to set to corresponding networks genesis node, you can find them at [conflux-rust's release page](https://github.com/Conflux-Chain/conflux-rust/releases), all you need to do is download your platform's release then unzip it, find the `toml` file (tethys.toml for mainnet, testnet.toml for testnet).

`Note`: the unlock process maybe need one or two minutes.

## How to run

Step 1 pull image from docker hub
```sh
$ docker pull confluxchain/conflux-rust
```

Step 2 run the image
#### Quick run a local dev node

```sh
$ docker run -p 12537:12537 --name cfx-node confluxchain/conflux-rust
```

#### Run with your own config file and save data to host machine
You can attach an folder from local machine to container, which folder should contain conflux `config files` the config file should name to `default.toml`. You can download a zip file from Conflux-rust [release page](https://github.com/Conflux-Chain/conflux-rust/releases), the unziped folder will include a `tethys.toml` or `testnet.toml`, rename it to `default.toml`, then you can use this folder as Conflux-rust run context folder. When conflux client runs up, chain data will also save to this folder。

```sh
$ docker run -p 12537:12537 -v /path-to-your-config-folder:/root/run --name cfx-node confluxchain/conflux-rust
```

### Docs

1. [Official doc - How to install and run conflux-rust](https://developer.conflux-chain.org/docs/conflux-doc/docs/get_started)
2. [How to run an Independent Chain](https://developer.conflux-chain.org/docs/conflux-doc/docs/independent_chain)
3. [Window 10 Conflux Studio docker setup introduction (Chinese doc)](https://forum.conflux.fun/t/topic/4280)

### Note

1. When use docker you can't use `jsonrpc_local_tcp_port` and `jsonrpc_local_http_port`, but in `dev` mode you can access local RPC on `jsonrpc_http_port`
2. Local dev node will not connect to `testnet` or `mainnet`, it is a independent chain
