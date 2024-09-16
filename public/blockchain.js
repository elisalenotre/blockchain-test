const crypto = require('crypto');

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    constructor(index, timestamp, transactions, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return crypto.createHash('sha256').update(
            this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions)
        ).digest('hex');
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.pendingTransactions = [];
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2023", [], "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    minePendingTransactions() {
        let block = new Block(this.chain.length, Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.hash = block.calculateHash();
        this.chain.push(block);

        this.pendingTransactions = [];
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Blockchain, Transaction };
} else {
    // pour le navigateur
    window.Blockchain = Blockchain;
    window.Transaction = Transaction;
}

// initialize the blockchain
let myCoin = new Blockchain();