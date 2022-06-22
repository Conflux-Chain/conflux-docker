# How To Build

## Dev Image

Dev Image is used to run a Conflux local node, with default config 10 test account wich 1000 CFX, can be auto setup.

1. Download binary from Github release page: `make download-binary TAG=2.0.2`
2. Build image: `make build TAG=2.0.2`
3. Push to DockerHub: `make push TAG=2.0.2`

## Mainnet

1. Download binary from Github release page: `make download-binary TAG=2.0.2`
2. Build image: `make build-mainnet TAG=2.0.2`
3. Push to DockerHub: `make push-mainnet TAG=2.0.2`

## Testnet

1. Download binary from Github release page: `make download-binary TAG=2.0.2-testnet`
2. Build image: `make build-testnet TAG=2.0.2`
3. Push to DockerHub: `make push-testnet TAG=2.0.2`

## M1

To build a Mac M1 image, a Conflux-rust M1 binary is required, and also need M1 base image.