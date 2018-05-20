const assert = require('assert');
const {abi, bytecode} = require('../ChuckETHCheese.json');
const owner = '0x1c145df5dbfa1277257623213286777dbdbab4fe';
const player = '0xbcbaec8ca960494287c19175099d1766a82a9850';
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

let contract;
let value = 5;
describe('ChuckETHCheese', function() {
  beforeEach(async () => {
    const deployment = await new web3.eth.Contract(abi, {
      from: owner,
      data: bytecode,
    }).deploy({ arguments: [value] });
    const gas = await deployment.estimateGas();
    contract = await deployment.send({ gas });
  })

  describe('deployment', function() {
    it('should have an address', function() {
      assert(contract.options.address);
    });
  });

  describe('pizzas getter', function() {
    it('should let us have pizzas', async () => {
      const actual = await contract.methods.pizzas().call();
      assert.equal(value, actual);
    });
  });

  describe('isPizzaHot boolean', function() {
    it('better be hot', async () => {
      await contract.methods.setIsPizzaHot(true).send();
      const hotness = await contract.methods.isPizzaHot().call();
      assert(hotness);
    });
  });

  describe('Purchasing Tokens', function() {
    it('should let us buy some tokens', async () => {
      const wei = 100;
      await contract.methods.purchaseTokens().send({ value: wei, from: player });
      const tokens = await contract.methods.tokenBalances(player).call();
      assert.equal(+tokens, wei);
    });

    describe('with tokens', async () => {
      beforeEach(async () => {
        const wei = 100;
        await contract.methods.purchaseTokens().send({ value: wei, from: player });
      });

      it('should let us play a game', async () => {
        await contract.methods.playGame().send({ from: player });
        const isPlaying = await contract.methods.playingStatus(player).call();
        assert(isPlaying);
      })
    });

    describe('without tokens', async () => {
      it('should not let us play a game', async () => {
        await expectThrow(contract.methods.playGame().send());
      })
    })
  });

  describe('award winner', async () => {
    beforeEach(async () => {
      const wei = 100;
      await contract.methods.purchaseTokens().send({ value: wei, from: player });
    });
    it('should let the owner award a winner', async () => {
      const balanceBefore = await web3.eth.getBalance(player);
      await contract.methods.awardWinner(player).send({ from: owner });
      const balanceAfter = await web3.eth.getBalance(player);
      assert(balanceAfter > balanceBefore);
    });
    it('should not let the player award a winner', async () => {
      await expectThrow(contract.methods.awardWinner(player).send({ from: player }));
    });
  })
});

async function expectThrow(promise) {
    const errMsg = 'Expected throw not received';
    try {
        await promise;
    } catch (err) {
        assert(err.toString().includes('revert'), errMsg);
        return;
    }
    assert.fail(errMsg);
}
