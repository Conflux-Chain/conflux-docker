TAG = 1.0.0

.PHONY: all build push

all: build

clone: 
	rm -rf conflux
	git clone -b v${TAG} --single-branch --depth 1 https://github.com/Conflux-Chain/conflux-rust.git conflux

build: 
	docker build -f Dockerfile.slim -t confluxchain/conflux-rust:${TAG} .

host-build: 
	docker build --progress plain -t confluxchain/conflux-rust:${TAG} . --network host

push:
	docker push confluxchain/conflux-rust:${TAG}

build-mainnet: 
	docker build -f production/Dockerfile -t confluxchain/conflux-rust:${TAG}-mainnet .

push-mainnet:
	docker push confluxchain/conflux-rust:${TAG}-mainnet

build-testnet: 
	docker build -f production/Dockerfile -t confluxchain/conflux-rust:${TAG}-testnet .

push-testnet:
	docker push confluxchain/conflux-rust:${TAG}-testnet

build-node: 
	docker build -f base-images/Dockerfile.node -t confluxchain/conflux-node:${TAG} .

push-node:
	docker push confluxchain/conflux-node:${TAG}

download: 
	rm -rf conflux_linux_*.zip
	rm -rf conflux-binary
	rm -f cfxrun/conflux
	wget https://github.com/Conflux-Chain/conflux-rust/releases/download/v${TAG}/conflux_linux_v${TAG}.zip
	unzip conflux_linux_v${TAG}.zip -d conflux-binary
	cp conflux-binary/run/conflux cfxrun/conflux