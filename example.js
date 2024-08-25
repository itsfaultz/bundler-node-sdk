require('dotenv').config();
const PredatorSDK = require('./src/predator-sdk');

const sdk = new PredatorSDK();

async function buyTokens() {
  try {
    console.log('Buying tokens...');
    const buyResult = await sdk.buy({
      privateKeys: process.env.PRIVATE_KEYS,
      tokenAddress: process.env.TOKEN_ADDRESS,
      amount: process.env.BUY_AMOUNT,
    });
    console.log('Buy successful:', buyResult);
  } catch (error) {
    console.error('Buy operation failed:', error.message);
  }
}

async function sellTokens() {
  try {
    console.log('Selling tokens...');
    const sellResult = await sdk.sell({
      privateKeys: process.env.PRIVATE_KEYS,
      tokenAddress: process.env.TOKEN_ADDRESS,
      amount: process.env.SELL_PERCENTAGE,
    });
    console.log('Sell successful:', sellResult);
  } catch (error) {
    console.error('Sell operation failed:', error.message);
  }
}

async function createToken() {
  try {
    console.log('Creating a new token...');
    const createResult = await sdk.create({
      privateKeys: process.env.PRIVATE_KEYS,
      devPrivateKey: process.env.DEV_PRIVATE_KEY,
      amount: process.env.CREATE_AMOUNT,
      name: process.env.TOKEN_NAME,
      symbol: process.env.TOKEN_SYMBOL,
      description: process.env.TOKEN_DESCRIPTION,
      telegram: process.env.TOKEN_TELEGRAM,
      twitter: process.env.TOKEN_TWITTER,
      website: process.env.TOKEN_WEBSITE,
      file: process.env.TOKEN_LOGO_URL,
    });
    console.log('Token creation successful:', createResult);
  } catch (error) {
    console.error('Token creation failed:', error.message);
  }
}

// Uncomment the function you want to run
// buyTokens();
// sellTokens();
// createToken();

// Or run multiples
// async function runAllExamples() {
//   await createToken();
//   await buyTokens();
//   await sellTokens();
// }
// runAllExamples();