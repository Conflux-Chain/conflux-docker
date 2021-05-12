const TOML = require('@iarna/toml');
const fs = require('fs');
const { PrivateKeyAccount: Account, format } = require('js-conflux-sdk');
const DOCKER_MODE = 'docker';

function initialConfig() {
  const configStr = fs.readFileSync("../default.toml", "utf-8");
  const config = TOML.parse(configStr);

  // if "mode" is not docker leave it alone
  if (config.mode !== DOCKER_MODE) {
    return;
  }
  config.mode = 'dev';

  // generate a random chain_id
  config.chain_id = parseInt(Math.random() * 10000);

  // generate random mining_auther
  const randomAccount = Account.random(undefined, config.chain_id);
  config.mining_author = format.hexAddress(randomAccount.address);
  config.mining_key = randomAccount.privateKey;

  // setting genesis_secret
  config.genesis_secrets = './genesis_secret.txt';
  fs.writeFileSync("../genesis_secret.txt", randomAccount.privateKey.replace('0x', ''));

  // write config back
  fs.writeFileSync("../default.toml", TOML.stringify(config));
  console.log('CFXDOCKER: config file set success !');
}


initialConfig();
