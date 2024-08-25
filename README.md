# PredatorSDK Documentation

## Introduction

PredatorSDK is a JavaScript library designed to interact with the Predator bot API. It provides functionality for buying, selling, and creating tokens on various blockchain networks.

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

Look at ```example.js``` for a better understanding of the sdk.

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
      privateKeys: 'your-private-key',
      tokenAddress: 'token-address',
      amount: '0.001', // Amount in SOL
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
      privateKeys: 'your-private-key',
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
      privateKeys: 'your-private-key',
      amount: '1000000', // Total supply
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

## Contributing

Contributions to PredatorSDK are welcome! Please submit pull requests or open issues on the GitHub repository.

## License

[Insert appropriate license information here]
