// Add new function to validate the chain
module.exports = function isChainValid(chain) {
  for (let i = 1; i < chain.length; i++) {
    const current = chain[i];
    const previous = chain[i - 1];

    if (current.hash !== current.calculateHash()) {
      console.log(`Block ${i} has been tampered.`);
      return false;
    }

    if (current.previousHash !== previous.hash) {
      console.log(`Block ${i} is not linked correctly.`);
      return false;
    }
  }

  console.log("All blocks are valid.");
  return true;
};
