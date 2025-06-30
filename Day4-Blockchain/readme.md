# 🧱 Simple Blockchain in Node.js

This is a basic implementation of a Proof-of-Work blockchain using Node.js and SHA-256 hashing.

## 📘 Key Concepts

### 🔐 Hash
- A **hash** is a digital fingerprint of block data.
- It’s calculated using SHA-256 and changes completely even if the data changes slightly.
- Helps ensure data integrity and link blocks securely.

```js
calculateHash() {
  return crypto
    .createHash('sha256')
    .update(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce)
    .digest('hex');
} 
```


### 🔁 Nonce
- A **Nonce** is a number that gets incremented during mining.
- It’s used to find a hash that meets a specific difficulty level (e.g., starts with `0000`).
- Part of the Proof-of-Work system.
```js 
mineBlock(difficulty) {
  while (!this.hash.startsWith(Array(difficulty + 1).join('0'))) {
    this.nonce++;
    this.hash = this.calculateHash();
  }
}
```

### 🧮 Difficulty
- Defines how **hard** it is to mine a block.
- Higher difficulty = longer time to find a valid hash.
- In code:
  ```js
  this.difficulty = 4;

### Genesis Block
- The first block in the blockchain.
- It has no previous block, so its previousHash is set to '0'.
- Acts as the base of the blockchain.

```js createGenesisBlock() {
  return new Block(0, Date.now().toString(), 'Genesis Block', '0');
} 
```


