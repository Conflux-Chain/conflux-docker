# about dev node config

## When updating config file, follow options should be set

* mode: docker  # used by `initConfig.js`
* bootnodes: commented
* node_type: archive
* public_rpc_apis: all
* public_evm_rpc_apis = "evm,ethdebug"
* persist_block_number_index: true
* persist_tx_index: true
* dev_block_interval_ms: 250
* executive_trace: true
* dev_pos_private_key_encryption_password = "CFXV20" # pos_key password
* poll_lifetime_in_seconds = 60 # to open core space filter related methods

## how to enable cips

```toml
# v2.0 cips: pos + espace
hydra_transition_number = 5
hydra_transition_height = 5
cip43_init_end_number = 5
pos_reference_enable_height = 5

# v2.1
dao_vote_transition_number = 6
dao_vote_transition_height = 6
cip43_init_end_number = 6
cip78_patch_transition_number = 6
cip90_transition_height = 6
cip90_transition_number = 6
cip105_transition_number = 6

# v2.3
cip107_transition_number=7
cip112_transition_height=7
cip118_transition_number=7
cip119_transition_number=7

# v2.4 cips: 1559, 137 and others
next_hardfork_transition_number=10  # cip131, cip132, cip133b, cip137, cip144, cip145
next_hardfork_transition_height=10  # cip130, cip133

cip1559_transition_height=10
cancun_opcodes_transition_number=10
```