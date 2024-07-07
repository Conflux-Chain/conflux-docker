import TOML from '@iarna/toml'
import fs from 'node:fs' 
import {PrivateKeyAccount as Account, format} from 'js-conflux-sdk'
import { createPosConfig } from './createPosConfig.js';

async function initialConfig() {
    const configStr = fs.readFileSync("../conflux.toml", "utf-8");
    const config = TOML.parse(configStr);

    if (config.mode !== "docker") {
      // If the mode is not Docker, refrain from altering the conflux.toml file or any other elements, including comments or spaces.
      const stream = fs.createWriteStream("../conflux.toml", {flags: 'a'});
      
      stream.write("\n");
      
      if (!config.chain_id) {
        config.chain_id = parseInt(Math.random() * 10000);
      
        console.warn(
          "chain_id not found in conflux.toml, generate a random one: " +
            config.chain_id
        );
      
        stream.write(`chain_id = ${config.chain_id}\n`);
      }
      if (!config.evm_chain_id) {
        config.evm_chain_id = config.chain_id + 1;
      
        console.warn(
          "evm_chain_id not found in conflux.toml, generate a one: " +
            config.evm_chain_id
        );
      
        stream.write(`evm_chain_id = ${config.evm_chain_id}\n`);
      }
      
      // The createPosConfig function must always be executed to generate the pos configuration.
      stream.end();
      await createPosConfig(config.chain_id);
      return;
    }

    config.mode = 'dev';
    
    // generate a random chain_id
    config.chain_id = parseInt(Math.random() * 10000);
    config.evm_chain_id = config.chain_id + 1;
    
    // generate random mining_auther
    const randomAccount = Account.random(undefined, config.chain_id);
    config.mining_author = format.hexAddress(randomAccount.address);
    config.mining_key = randomAccount.privateKey;
    
    // setting genesis_secret
    config.genesis_secrets = './genesis_secret.txt';
    fs.writeFileSync("../genesis_secret.txt", randomAccount.privateKey.replace('0x', ''));
    
    // write config back
    fs.writeFileSync("../conflux.toml", TOML.stringify(config));

    await createPosConfig(config.chain_id)
    console.log('CFXDOCKER: config file set success !');
}

await initialConfig();
