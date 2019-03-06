const sha256 = require('crypto-js/sha256')
const { DIFFICULTY, MINE_RATE } = require('./config')

class Block {
	constructor(index = 0, lastBlock = null, data = 'My Genesis block') {
		//index for the transaction
		this.index = index
		//the last block
		this.lastBlock = lastBlock
		//the data of this transaction
		this.data = data
		//the timestamp of this transaction
		this.timestamp = Date.now()
		//the difficulty - to be more difficulty to create a node
		this.difficulty = DIFFICULTY
		//the nonce
		this.nonce = 0
		//mine rate
		this.mine_rate = MINE_RATE
		//mine
		this.mine()
	}

	generateHash() {
		//genereate the hash with the data in the constructor
		const hash = (this.lastBlock == null)? null : this.lastBlock.actualHash
		return sha256(this.index + hash + JSON.stringify(this.data) + this.timestamp + this.nonce).toString()
	}

	mine() {
		//get the hash
		this.actualHash = this.generateHash()
		//mine to find a valid hash with the 0's before
		while (!(/^0*$/.test(this.actualHash.substring(0, this.difficulty)))) {
			this.nonce++
			this.difficulty = this.updateDifficulty(Date.now())
			this.actualHash = this.generateHash()
		}
	}

	updateDifficulty(nowTime){
		const difficulty = (this.lastBlock == null) ? DIFFICULTY : this.lastBlock.difficulty
		const lastBlockTimestamp = (this.lastBlock == null) ? null : this.lastBlock.timestamp
		const hard = lastBlockTimestamp + this.mine_rate > nowTime
		if (hard) {
			 return difficulty + 1
		}else{
			return difficulty - 1
		}
	}
}

module.exports = Block