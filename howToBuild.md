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

## Buildx

To create images for linux/arm64 and linux/amd64 platforms using Docker buildx, if you see the error `ERROR: Multi-platform build not supported for docker driver`., you can run `docker buildx create --name multiarch --bootstrap --use`.

1. test build(build result will only remain in the build cache): `make buildx TAG=2.4.0-testnet`
2. build local images(build image and load to docker) : `make buildx-load TAG=2.4.0-testnet`
3. build multi-platform images and push to dockerHub: `make buildx-push TAG=2.4.0-testnet`