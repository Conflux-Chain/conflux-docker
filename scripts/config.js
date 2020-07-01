const TOML = require('@iarna/toml')
const fs = require('fs');


let config = fs.readFileSync("./run/default.toml", "utf-8");
// console.log('config', config);
var data = TOML.parse(config);
console.log('data', data);


console.log("data", TOML.stringify(data));

const PRIVATE_KEY = '0x35D29A5A56DB5C87FD257DC0EE83799F8D12D20C6BCBF5E8927218BB436FDA3D';