const {Conflux, provider} = require('js-conflux-sdk');

const client = provider('http://localhost:12537');

async function genAccounts() {
    for(let i = 1; i <= 10; i++) {
        let info = await client.call("new_account", "123456");
        console.log('Gen account: ', info);
    }
}

async function getAccounts() {
    let result = await client.call('accounts');
    return result;
}

// ;(async () => {
//     await genAccounts();
//     // await getAccounts();
// })();

exports.getAccounts = getAccounts;