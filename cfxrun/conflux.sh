#!/bin/bash
# init config
cd ./scripts
node initConfig.js
cd ..

# start conflux
./conflux --config ./default.toml