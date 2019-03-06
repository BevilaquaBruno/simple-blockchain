# Simple Blochchain

#### to change the diffuculty, alter the `difficulty` variable inside `constructor` method in blockchain.js

```javascript
class Blockchain {
	constructor(difficulty = *YOUR DIFFICULTY HERE*) {
		this.blocks = [new Block()]
		this.index = 1
		this.difficulty = difficulty
	}
}
```

#### If do you want to help me send a pull request :relaxed: :wink:

#### To run the example.js:
`> npm run example`