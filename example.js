const Blockchain = require('./blockchain')

const blockchain = new Blockchain()
blockchain.addBlock({ amount: 4 })
blockchain.addBlock({ amount: 50 })

console.log(blockchain)

//this expect returns true
console.log(blockchain.isValid())
//update some value inside the blockchain
blockchain.blocks[1].data.amount = 30000
//this expects return false
console.log(blockchain.isValid())
