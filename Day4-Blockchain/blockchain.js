const crypto = require('crypto');


class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return crypto
      .createHash('sha256')
      .update(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce)
      .digest('hex');
  }

  mineBlock(difficulty) {
    while (!this.hash.startsWith(Array(difficulty + 1).join('0'))) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log(`Block mined: ${this.hash}`);
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;//change this line to increase or decrease mining difficulty.
  }

  createGenesisBlock() {
    return new Block(0, Date.now().toString(), 'Genesis Block', '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }
  /*
    Tampered the isValid function added new function from new JS file to index.js for checking
  */
  

//   isChainValid() {
//     for (let i = 1; i < this.chain.length; i++) {
//       const current = this.chain[i];
//       const previous = this.chain[i - 1];

//       if (current.hash !== current.calculateHash()) return false;
//       if (current.previousHash !== previous.hash) return false;
//     }
//     return true;
//   }
}

module.exports ={Blockchain,Block} ;