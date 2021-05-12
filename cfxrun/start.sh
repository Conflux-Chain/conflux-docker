#!/bin/bash
set -m
# start conflux node process and put it in background
./conflux.sh & 
# generate account
./gene_account.sh
# put conflux node in front ground
fg %1