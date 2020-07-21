const {Conflux, provider, util} = require('js-conflux-sdk');
const TOML = require('@iarna/toml');
const fs = require('fs');
const PASSWORD = '123456';
const URL = "http://localhost:12537";
const client = provider(URL);
const cfx = new Conflux({
    url: URL,
    defaultGasPrice: 100, // The default gas price of your following transactions
    defaultGas: 1000000, // The default gas of your following transactions
    // logger: console,
});

function readConfig() {
    let configString = fs.readFileSync("../run/default.toml", "utf-8");
    let config = TOML.parse(configString);
    return config;
}

async function genAccounts() {
    for(let i = 1; i <= 10; i++) {
        let info = await client.call("new_account", PASSWORD);
        console.log('Gen account: ', info);
    }
}

async function getAccounts() {
    let result = await client.call('accounts');
    return result;
}

async function transferCfx(from) {
    let accounts = await getAccounts();
    for(let target of accounts) {
        try {
            const tx = await cfx.sendTransaction({
                from: from,
                to: target,
                value: util.unit.fromCFXToDrip(1000), // use unit to transfer from CFX to Drip
            }).executed();
            console.log(`Transfering to ${target} hash ${tx.transactionHash}`);
        } catch(e) {
            console.error(e);
        }
    }
}

async function waitns(number = 30) {
    await new Promise(function(resolve, reject) {
        setTimeout(resolve, number * 1000);
    });
}

async function unlockAccounts() {
    let accounts = await getAccounts();
    for(let target of accounts) {
        await client.call('unlock_account', [target, PASSWORD, '0x0']);
    }
}

;(async () => {
    // check mining address
    await waitns(5);
    const config = readConfig();
    if (!config.mining_key) {
        return;
    }
    const account = cfx.Account(config.mining_key);
    console.log("Gene account: ", account.address);
    // wait 30s
    await waitns(30);
    // check accounts
    let accounts = await getAccounts();
    if (accounts.length >= 10) {
        return;
    }
    // gen 10 accounts
    await genAccounts(); 
    // wait 30s
    await waitns(10);
    // transfer cfx to genesis account
    await transferCfx(account);
    // unlock accounts
    await unlockAccounts();
})();
