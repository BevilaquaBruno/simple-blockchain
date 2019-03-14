const sha256 = require('crypto-js/sha256')
const { DIFFICULTY_CONFIG, MINE_RATE_CONFIG } = require('./config')
class Block {
	constructor(index = 0, previousHash = null, data = 'My Genesis block', lastBlock = null) {
		//index for the transaction
		this.index = index
		//the hash of the previous transaction
		this.previousHash = previousHash
		//the data of this transaction
		this.data = data
		//the timestamp of this transaction
		this.timestamp = new Date().getTime()
		//the difficulty - to be more difficulty to create a node
		this.difficulty = DIFFICULTY_CONFIG
		//the nonce
		this.nonce = 0

		this.mine(lastBlock)
	}

	generateHash() {
		//genereate the hash with the data in the constructor
		return sha256(this.index + this.previousHash + JSON.stringify(this.data) + this.timestamp + this.nonce).toString()
	}

	mine(lastBlock) {
		//get the hash
		this.actualHash = this.generateHash()
		//mine to find a valid hash with the 0's before
		while (!(/^0*$/.test(this.actualHash.substring(0, this.difficulty)))) {
			this.nonce++
			const timestamp = new Date().getTime()
			this.difficulty = this.changeDifficulty(lastBlock, timestamp)
			this.actualHash = this.generateHash()
		}
	}

	changeDifficulty(lastBlock, now){
		var timestamp, difficulty
		if (this.index != 0) {
			difficulty = lastBlock.difficulty
			timestamp = lastBlock.timestamp
		}else{
			difficulty = DIFFICULTY_CONFIG
			timestamp = this.timestamp
		}
    const hard = timestamp + MINE_RATE_CONFIG > now
    return hard ? difficulty + 1 : difficulty - 1
	}
}

module.exports = Block