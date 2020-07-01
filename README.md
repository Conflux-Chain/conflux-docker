conflux-rust-docker
===
Conflux-rust is a implementation of the Conflux protocol with Rust.
This is the docker image of Conflux-rust.

# Warning
Only use this image run a test/dev mode conflux-chain, don't use this for the formal online environment.
When node runs up, it will init 10 genesis account, each with 1000 CFX.


## Tags

* 0.5.0.2

## How to run

```sh
$ docker pull confluxchain/conflux-rust
```

#### Simple run a node in frontground

```sh
$ docker run -p 12537:12537 --name cfx-node confluxchain/conflux-rust
```

#### Run with local config and data 
You can attach a folder on local machine to container, in which folder should include conflux config file, or even genesis_secret, genesis_account file。When conflux client run up, chain data will also save to this folder。

```sh
$ docker run -p 12537:12537 -v $(pwd)/run:/root/run --name cfx-node confluxchain/conflux-rust
```







