TAG = 0.5.0.4

.PHONY: all build push

all: build

build:
	docker build -t confluxchain/conflux-rust:${TAG} .

push:
	docker push confluxchain/conflux-rust:${TAG}

