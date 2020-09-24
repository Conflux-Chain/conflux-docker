TAG = 0.5.2

.PHONY: all build push

all: build

clone: 
	rm -rf conflux
	git clone -b v${TAG} --single-branch --depth 1 https://github.com/Conflux-Chain/conflux-rust.git conflux

build: 
	docker build -t confluxchain/conflux-rust:${TAG} .

push:
	docker push confluxchain/conflux-rust:${TAG}

build-prod: clone
	docker build -f Dockerfile.slim -t confluxchain/conflux-rust:${TAG}-slim .

push-prod:
	docker push confluxchain/conflux-rust:${TAG}-slim