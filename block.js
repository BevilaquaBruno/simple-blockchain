const sha256 = require('crypto-js/sha256')

class Block {
	constructor(index = 0, previousHash = null, data = 'My Genesis block', difficulty = 1) {
		//index for the transaction
		this.index = index
		//the hash of the previous transaction
		this.previousHash = previousHash
		//the data of this transaction
		this.data = data
		//the timestamp of this transaction
		this.timestamp = new Date()
		//the difficulty - to be more difficulty to create a node
		this.difficulty = difficulty
		//the nonce
		this.nonce = 0

		this.mine()
	}

	generateHash() {
		//genereate the hash with the data in the constructor
		return sha256(this.index + this.previousHash + JSON.stringify(this.data) + this.timestamp + this.nonce).toString()
	}

	mine() {
		//get the hash
		this.actualHash = this.generateHash()
		//mine to find a valid hash with the 0's before
		while (!(/^0*$/.test(this.actualHash.substring(0, this.difficulty)))) {
				this.nonce++
				this.actualHash = this.generateHash()
		}
	}
}

module.exports = Block