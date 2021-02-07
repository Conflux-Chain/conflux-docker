#!/bin/bash

set -m

./conflux.sh & 

./gene_account.sh

fg %1