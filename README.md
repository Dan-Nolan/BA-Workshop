# Intro to Solidity: An ETH Buenos Aires Workshop

Hey all! This repo was used in a presentation as a quick introduction to Solidity and Smart Contracts. 
This is intended to be a basic tutorial, as such it doesn't use an Ethereum development framework like Truffle.

Instead it makes use of [gulpjs](https://gulpjs.com/) as a simple build system as well as 
[solc-js](https://github.com/ethereum/solc-js), [mochajs](https://mochajs.org/) and 
[web3-js](https://github.com/ethereum/web3.js/) to run tests in (...you guessed it!) JavaScript. 

## Interactive Codecast

If you're looking for an interactive walkthrough of this material, check out this Codecast:
https://www.codecast.app/interaction/5b1027bf4026dd001f48974b

## Running this Code Locally

Otherwise, if you're looking to run this code locally follow these instructions:

### Installing the dependencies 

Install all the dependencies using [NPM](https://www.npmjs.com/) by running `npm install` at the root level of this repo.

### Watching your contract

Run `gulp watch` to watch anytime your contract changes and automatically update your `ChuckETHCheese.json` file with the
updated ABI and bytecode.

### Ganache-cli

Install ganache-cli globally by using `npm install -g ganache-cli` if you haven't done so already. Then use `ganache-cli`
to run it locally.

You should see a list of accounts in the ganache-cli output. Select any two and replace the addresses in the `test/tests.js`.

### Mocha

Now you can use `mocha` from the root directory to test your Solidity Contract. 

Feel free to start from scratch and try to pass all the test cases or write your own!

## ChainShot

Looking to start your next dApp? Check out ChainShot (www.chainshot.com) for an in-browser walkthrough 
that sets you up with your own working dApp at the end!
