# PredatorSDK Documentation

## Introduction

PredatorSDK is a JavaScript library designed to interact with the Predator Bundler API. It provides functionality for buying, selling, and creating tokens on Raydium, pump.fun and Moonshot.

## Installation

Start downloading this repo with git.

```
git clone https://github.com/predatordotbot/bundler-node-sdk
```

Install required node modules.

```
npm i
```
## Usage

You can start editing ```example.js``` for your needs and start code using: ```node example.js```.
Be sure to rename ```example.env``` to ```.env``` after updating it with your data.

### Initializing the SDK

```javascript
const PredatorSDK = require('predator-sdk');
const sdk = new PredatorSDK();
```

### Buying Tokens

To buy tokens:

```javascript
async function buyTokens() {
  try {
    const buyResult = await sdk.buy({
      privateKeys: 'privatekey1,privatekey2',
      tokenAddress: 'token-address',
      amount: '0.001', // Amount in SOL to buy on each wallet
    });
    console.log('Buy successful:', buyResult);
  } catch (error) {
    console.error('Buy operation failed:', error.message);
  }
}
```

### Selling Tokens

To sell tokens:

```javascript
async function sellTokens() {
  try {
    const sellResult = await sdk.sell({
      privateKeys: 'privatekey1,privatekey2',
      tokenAddress: 'token-address',
      amount: '100', // Amount of tokens to sell
    });
    console.log('Sell successful:', sellResult);
  } catch (error) {
    console.error('Sell operation failed:', error.message);
  }
}
```

### Creating Tokens

To create a new token:

```javascript
async function createToken() {
  try {
    const createResult = await sdk.create({
      privateKeys: 'privatekey1,privatekey2',
      devPrivateKey: 'privatekey',
      amount: '0.01', // Amount in SOL to buy on each wallet
      name: 'My Token',
      symbol: 'MTK',
      description: 'A sample token',
      telegram: 'https://t.me/mytoken',
      twitter: 'https://twitter.com/mytoken',
      website: 'https://mytoken.com',
      file: 'https://example.com/token-logo.png',
    });
    console.log('Token creation successful:', createResult);
  } catch (error) {
    console.error('Token creation failed:', error.message);
  }
}
```

## Security Considerations

- Never share your private keys or store them in plain text.
- Use environment variables or secure key management solutions to store sensitive information.
- Be cautious when interacting with smart contracts and always verify the addresses you're interacting with.

## Error Handling

The SDK uses a custom error handling mechanism. Always wrap your calls in try-catch blocks to handle potential errors gracefully.
