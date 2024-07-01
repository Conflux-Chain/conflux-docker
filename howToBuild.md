# How To Build

## Dev Image

Dev Image is used to run a Conflux local node, with default config 10 test account wich 1000 CFX, can be auto setup.

1. Download binary from Github release page: `make download-binary TAG=2.0.2`
2. Build image: `make build TAG=2.0.2`
3. Push to DockerHub: `make push TAG=2.0.2`

## Mainnet

1. Download binary from Github release page: `make download-binary TAG=2.0.2`
2. Build image: `make build-release TAG=2.0.2-mainnet`
3. Push to DockerHub: `make push-release TAG=2.0.2-mainnet`

## Testnet

1. Download binary from Github release page: `make download-binary TAG=2.0.2-testnet`
2. Build image: `make build-release TAG=2.0.2-testnet`
3. Push to DockerHub: `make push-release TAG=2.0.2-testnet`

## Buildx

To create images for linux/arm64 and linux/amd64 platforms using Docker buildx, if you see the error `ERROR: Multi-platform build not supported for docker driver`., you can run `docker buildx create --name multiarch --bootstrap --use`.

1. test build(build result will only remain in the build cache): `make buildx TAG=2.4.0-testnet`
2. build local images(build image and load to docker) : `make buildx-load TAG=2.4.0-testnet`
3. build multi-platform images and push to dockerHub: `make buildx-push TAG=2.4.0-testnet`


## Buildx for dev node

dev node should use the mainnet tag to build

1. test build: `make buildx-dev TAG=2.3.5`
2. build local images(build image and load to docker): `make buildx-dev-load TAG=2.3.5`
3. build multi-platform images and push to dockerHub: `make buildx-dev-push TAG=2.3.5`