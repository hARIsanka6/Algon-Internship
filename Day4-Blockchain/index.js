const {Blockchain,Block} = require('./blockchain');

const myCoin = new Blockchain();
const isChainValid = require("./isChainValid")

console.log('⛏ Mining block 1...');
myCoin.addBlock(new (require('./blockchain').Block)(1, Date.now().toString(), { amount: 4 }));

console.log('⛏ Mining block 2...');
myCoin.addBlock(new (require('./blockchain').Block)(2, Date.now().toString(), { amount: 8 }));

console.log(JSON.stringify(myCoin, null, 2));
console.log('Is blockchain valid?', isChainValid(myCoin.chain));