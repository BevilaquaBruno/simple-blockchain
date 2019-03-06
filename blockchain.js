const Block = require('./block')

class Blockchain {
	constructor() {
		this.blocks = [new Block()]
		this.index = 1
	}

	getLastBlock() {
		return this.blocks[this.blocks.length - 1]
	}

	addBlock(data) {
		//uncomment this if/else to only add a new block if the blockchain is valid
		/*if(this.isValid()){*/
			const index = this.index

			const lastBlock = this.getLastBlock()

			const block = new Block(index, lastBlock, data)

			this.index++
			this.blocks.push(block)
		/*}else{
			console.log('Is not valid anymore.');
		}*/
	}

	isValid() {
		for (let i = 1; i < this.blocks.length; i++) {
			const currentBlock = this.blocks[i]
			const previousBlock = this.blocks[i - 1]

			if (currentBlock.actualHash !== currentBlock.generateHash()) {
				return false
			}

			if (currentBlock.index !== previousBlock.index + 1) {
				return false
			}

			if (currentBlock.previousHash !== previousBlock.actualHash) {
				return false
			}
		}
		return true
	}
}

module.exports = Blockchain