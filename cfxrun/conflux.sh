#!/bin/bash
# init config
cd ./scripts
node initConfig.js
cd ..

# start conflux
/bin/conflux --config ./conflux.toml