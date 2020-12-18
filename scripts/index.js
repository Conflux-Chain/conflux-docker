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

async function unlockAccounts(accounts) {
    for(let target of accounts) {
        console.log(`Unlocking account ${target}`);
        await client.call('unlock_account', target, PASSWORD, '0x0');
    }
}

async function testRPCServiceUp(times = 3) {
    for(let i = 0; i < times; i++) {
        try {
            await getAccounts();
            return;
        } catch(e) {
            console.log("wait 5s and try again");
            await waitns(5);
        }
    }
}

;(async () => {
    // wait rpc service started
    await waitns(10);

    // check mining address
    const config = readConfig();
    if (!config.mining_key) {
        return;
    }
    
    console.log('===== Try to setup accounts')
    await testRPCServiceUp(5);
    // check accounts
    let accounts = await getAccounts();
    if (accounts.length >= 10) {
        // unlock and return
        await unlockAccounts(accounts);
        return;
    }

    console.log('===== Generate 10 accounts')
    // gen 10 accounts
    await genAccounts(); 
    accounts = await getAccounts();
    await unlockAccounts(accounts);
    // wait 10s
    // await waitns(10);

    console.log('===== Seed gene accounts')
    const account = cfx.Account(config.mining_key);
    console.log("Gene account: ", account.address);
    
    // transfer cfx to genesis account
    await transferCfx(account);
    // unlock accounts
    fs.writeFileSync("./info.txt", "Finished");  // indicate init success
})();
