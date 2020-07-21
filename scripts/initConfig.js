const TOML = require('@iarna/toml');
const fs = require('fs');
const {Account} = require('js-conflux-sdk');

function initialConfig() {
    const configStr = fs.readFileSync("../run/default.toml", "utf-8");
    const config = TOML.parse(configStr);
    // if "mode" is not docker leave it alone
    if (config.mode !== 'docker') {  
        return;
    }
    config.mode = 'dev';
    // generate a random chain_id
    config.chain_id = parseInt(Math.random() * 10000); 
    // generate random mining_auther
    const randomAccount = Account.random();
    config.mining_author = randomAccount.address.replace('0x', '');
    config.mining_key = randomAccount.privateKey;
    fs.writeFileSync("../run/default.toml", TOML.stringify(config));
    console.log('CFXDOCKER: config file set success !');
}


initialConfig();
