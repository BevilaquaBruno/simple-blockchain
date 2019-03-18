const Blockchain = require('./blockchain');
const blockchain = new Blockchain();

blockchain.addBlock({ amount: 1 });
blockchain.addBlock({ amount: 2 });

describe('Blockchain', () => {
  test('Blockchain is valid', () => {
    expect(blockchain.isValid()).toBeTruthy();
  });

  test('Blockchain is not valid', () => {
    blockchain.addBlock({ amount: 3 });
    blockchain.blocks[1].data.amount = 4
    expect(blockchain.isValid()).not.toBeTruthy();
  });
});
