const {Conflux, provider, util} = require('js-conflux-sdk');
const TOML = require('@iarna/toml');
const fs = require('fs');

const URL = "http://localhost:12537";
const client = provider(URL);
const PRI_KEY = '0x35D29A5A56DB5C87FD257DC0EE83799F8D12D20C6BCBF5E8927218BB436FDA3D';
const cfx = new Conflux({
    url: URL,
    defaultGasPrice: 100, // The default gas price of your following transactions
    defaultGas: 1000000, // The default gas of your following transactions
    // logger: console,
});
const account = cfx.Account(PRI_KEY);
console.log("Gene account: ", account.address);

function readConfig() {
    let configString = fs.readFileSync("../run/default.toml", "utf-8");
    let config = TOML.parse(configString);
    return config;
}

async function genAccounts() {
    for(let i = 1; i <= 10; i++) {
        let info = await client.call("new_account", "123456");  // default password is 123456
        console.log('Gen account: ', info);
    }
}

async function getAccounts() {
    let result = await client.call('accounts');
    return result;
}

async function transferCfx() {
    let accounts = await getAccounts();
    for(let target of accounts) {
        try {
            const tx = await cfx.sendTransaction({
                from: account,
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

;(async () => {
    // check mining address
    const config = readConfig();
    if("0x" + config.mining_author !== account.address) {
        return;
    }
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
    await transferCfx();
})();