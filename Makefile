TAG = 0.5.0.5

.PHONY: all build push

all: build

clone: 
	rm -rf conflux
	git clone -b v${TAG} --single-branch --depth 1 https://github.com/Conflux-Chain/conflux-rust.git conflux

build: clone
	docker build -t confluxchain/conflux-rust:${TAG} .

push:
	docker push confluxchain/conflux-rust:${TAG}

build-prod: clone
	docker build -f Dockerfile.alpine -t confluxchain/conflux-rust:${TAG}-alpine3.12 .