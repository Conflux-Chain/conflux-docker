TAG = 1.0.0

.PHONY: all build push

all: build

clone: 
	rm -rf conflux
	git clone -b v${TAG} --single-branch --depth 1 https://github.com/Conflux-Chain/conflux-rust.git conflux

build: 
	docker build -f Dockerfile.slim -t confluxchain/conflux-rust:${TAG} .

# host-build: 
# 	docker build -t confluxchain/conflux-rust:${TAG} . --network host

push:
	docker push confluxchain/conflux-rust:${TAG}

build-release: 
	docker build -f production/Dockerfile -t confluxchain/conflux-rust:${TAG} .

push-release:
	docker push confluxchain/conflux-rust:${TAG}

build-node: 
	docker build -f Dockerfile.node -t confluxchain/conflux-node:${TAG} .

push-node:
	docker push confluxchain/conflux-node:${TAG}

download-binary: 
	rm -rf conflux_linux_*.zip
	rm -rf conflux-binary
	rm -f cfxrun/conflux
	wget https://github.com/Conflux-Chain/conflux-rust/releases/download/v${TAG}/conflux_linux_glibc2.27_x64_v${TAG}.zip
	unzip conflux_linux_glibc2.27_x64_v${TAG}.zip -d conflux-binary
	cp conflux-binary/run/conflux cfxrun/conflux

buildx:
	docker buildx build -f Dockerfile.buildx --platform=linux/arm64,linux/amd64 --build-arg="VERSION=v${TAG}" -t confluxchain/conflux-rust:${TAG} . 

buildx-load:
	docker buildx build -f Dockerfile.buildx --load --build-arg="VERSION=v${TAG}" -t confluxchain/conflux-rust:v${TAG} . 

buildx-push:
	docker buildx build -f Dockerfile.buildx --push --platform=linux/arm64,linux/amd64 --build-arg="VERSION=v${TAG}" -t confluxchain/conflux-rust:${TAG} . 


buildx-dev:
	docker buildx build -f Dockerfile.dev.buildx --platform=linux/arm64,linux/amd64 --build-arg="VERSION=v${TAG}" -t confluxchain/conflux-rust:${TAG} . 

buildx-dev-load:
	docker buildx build -f Dockerfile.dev.buildx --load --build-arg="VERSION=v${TAG}" -t confluxchain/conflux-rust:${TAG} . 

buildx-dev-push:
	docker buildx build -f Dockerfile.dev.buildx --push --platform=linux/arm64,linux/amd64 --build-arg="VERSION=v${TAG}" -t confluxchain/conflux-rust:${TAG} .