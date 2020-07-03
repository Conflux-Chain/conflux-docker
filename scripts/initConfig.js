const TOML = require('@iarna/toml');
const fs = require('fs');

function initialConfig() {
    const configStr = fs.readFileSync("../run/default.toml", "utf-8");
    const config = TOML.parse(configStr);
    // if "mode" is not docker leave it alone
    if (config.mode !== 'docker') {  
        return;
    }
    config.mode = 'dev';
    config.chain_id = parseInt(Math.random() * 10000); // generate a random chain_id
    console.log('CFXDOCKER: config file set success !');
    fs.writeFileSync("../run/default.toml", TOML.stringify(config));
}


initialConfig();
