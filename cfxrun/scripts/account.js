const { providerFactory: provider } = require('js-conflux-sdk');

const client = provider({ url: 'http://localhost:12537' });

async function genAccounts() {
  for (let i = 1; i <= 10; i++) {
    let info = await client.call("new_account", "123456");
    console.log('Gen account: ', info);
  }
}

async function getAccounts() {
  let result = await client.call('accounts');
  return result;
}