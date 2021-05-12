FROM rust:1.51.0-buster as builder
RUN apt-get update && apt-get install -y cmake
RUN cmake --version