confluxchain/conflux-rust
===
Conflux-rust is a implementation of the Conflux protocol with Rust.
This is the docker image of Conflux-rust.

## Tags

* 0.5.2
* 0.5.0.2

`Warning`: These tags image's `default.toml` will config a independent chain with 10 genesis accounts (each with 1000 CFX), you can use them as local Dapp develop environment. You need to use your own config file if you want run a mainnet node.

#### Slim Tags

* 0.5.2-slim

slim images is much smaller, and will not init gene account for test.
You can use these images to run a mainnet node, but remember use your own config.

## How to run

Step 1 pull image from docker hub
```sh
$ docker pull confluxchain/conflux-rust
```

Step 2 run the image
#### Simple run

```sh
$ docker run -p 12537:12537 --name cfx-node confluxchain/conflux-rust
```

#### Run with local config and data 
You can attach an folder from local machine to container, in which folder should include conflux config file, or even genesis_secret, genesis_account file。When conflux client run up, chain data will also save to this folder。

```sh
$ docker run -p 12537:12537 -v $(pwd)/run:/root/run --name cfx-node confluxchain/conflux-rust
```


### Note

1. When use docker you can't use `jsonrpc_local_tcp_port` and `jsonrpc_local_http_port`, but in `dev` you can access local RPC on `jsonrpc_http_port`







