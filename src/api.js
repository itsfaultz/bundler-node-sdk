const { encrypt } = require('./utils');
const { handleError } = require('./errors');

async function executeOperation(sdk, operation, options) {
  await sdk.initialize();
  
  const endpoint = `/${operation}`;
  const data = prepareData(operation, options);
  
  try {
    const encryptedData = encrypt(JSON.stringify(data), sdk.encryptionKey);
    const response = await sdk.axios.post(endpoint, { encryptedData });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}

function prepareData(operation, options) {
  const baseData = {
    privateKeys: options.privateKeys,
  };

  switch (operation) {
    case 'buy':
    case 'sell':
      return {
        ...baseData,
        tokenBAddress: options.tokenAddress,
        tokenBAmount: options.amount,
      };
    case 'create':
      return {
        ...baseData,
        tokenBAmount: options.amount,
        tokenName: options.name,
        tokenSymbol: options.symbol,
        tokenDescription: options.description,
        telegramLink: options.telegram,
        twitterLink: options.twitter,
        websiteLink: options.website,
        fileUrl: options.file,
      };
    default:
      throw new Error(`Unsupported operation: ${operation}`);
  }
}

module.exports = { executeOperation };