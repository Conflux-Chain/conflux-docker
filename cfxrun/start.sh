#!/bin/bash

set -m

# Start the node
./conflux.sh & 
# Generate and seed account 
./gene_account.sh

fg %1