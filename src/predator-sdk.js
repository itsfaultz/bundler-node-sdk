const axios = require('axios');
const crypto = require('crypto');

/**
 * PredatorSDK
 */
class PredatorSDK {
  /**
   * Create a new instance of PredatorSDK
   * @param {Object} [config={}] - Configuration options
   * @param {string} [config.baseURL='https://api.predator.bot/'] - Base URL for the API
   */
  constructor(config = {}) {
    this.baseURL = config.baseURL || 'https://api.predator.bot/';
    this.encryptionKey = null;
    this.axios = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Initialize the SDK
   * @returns {Promise<void>}
   * @throws {Error}
   */
  async initialize() {
    if (!this.encryptionKey) {
      try {
        const response = await this.axios.get('/encryption-key');
        this.encryptionKey = Buffer.from(response.data.encryptionKey, 'hex');
      } catch (error) {
        throw new Error('An error occurred.');
      }
    }
  }

  /**
   * Buy tokens
   * @param {Object} options - The options for the buy operation
   * @param {string} options.privateKeys - The private keys of the wallet initiating the buy
   * @param {string} options.tokenAddress - The address of the token to be bought
   * @param {string} options.amount - The amount of SOL to spend on tokens
   * @returns {Promise<Object>} A promise that resolves to the result of the buy operation
   * @throws {Error} If the buy operation fails
   * 
   * @example
   * const buyResult = await sdk.buy({
   *   privateKeys: 'your-private-key',
   *   tokenAddress: 'token-address',
   *   amount: '0.001', // SOL amount to buy on each wallet
   * });
   */
  async buy(options) {
    return this._executeOperation('buy', options);
  }

  /**
   * Sell a specified percentage of tokens
   * @param {Object} options - The options for the sell operation
   * @param {string} options.privateKeys - The private keys of the wallet initiating the sell
   * @param {string} options.tokenAddress - The address of the token to be sold
   * @param {string} options.percentage - The percentage of tokens to sell (e.g., '10' for 10%)
   * @returns {Promise<Object>} A promise that resolves to the result of the sell operation
   * @throws {Error} If the sell operation fails or if the percentage is invalid
   * 
   * @example
   * const sellResult = await sdk.sell({
   *   privateKeys: 'your-private-key',
   *   tokenAddress: 'token-address',
   *   percentage: '10', // Sell 10% of tokens
   * });
   */
  async sell(options) {
    const percentageNum = parseFloat(options.percentage);
    if (isNaN(percentageNum) || percentageNum <= 0 || percentageNum > 100) {
      throw new Error('Invalid percentage. Must be a number between 0 and 100.');
    }
    
    const sellOptions = {
      ...options,
      amount: percentageNum
    };
    
    return this._executeOperation('sell', sellOptions);
  }

  /**
   * Create a new token
   * @param {Object} options - The options for token creation
   * @param {string} options.privateKeys - The private keys of the wallet creating the token
   * @param {string} options.amount - The total supply of tokens to create
   * @param {string} options.name - The name of the token
   * @param {string} options.symbol - The symbol of the token
   * @param {string} options.description - A description of the token
   * @param {string} options.telegram - Telegram link for the token community
   * @param {string} options.twitter - Twitter link for the token
   * @param {string} options.website - Website link for the token
   * @param {string} options.file - URL to the token's logo or image
   * @returns {Promise<Object>} A promise that resolves to the result of the token creation
   * @throws {Error} If the token creation fails
   * 
   * @example
   * const createResult = await sdk.create({
   *   privateKeys: 'your-private-key',
   *   amount: '0.001', // SOL amount to buy on each wallet
   *   name: 'Example Token',
   *   symbol: 'EXT',
   *   description: 'An example token created using PredatorSDK',
   *   telegram: 'https://t.me/exampletoken',
   *   twitter: 'https://twitter.com/exampletoken',
   *   website: 'https://www.exampletoken.com',
   *   file: 'https://example.com/logo.png',
   * });
   */
  async create(options) {
    return this._executeOperation('create', options);
  }

  /**
   * Execute an operation (internal method)
   * @private
   * @param {string} operation - The operation to execute ('buy', 'sell', or 'create')
   * @param {Object} options - The options for the operation
   * @returns {Promise<Object>} A promise that resolves to the result of the operation
   * @throws {Error} If the operation fails
   */
  async _executeOperation(operation, options) {
    await this.initialize();
    
    const endpoint = `/${operation}`;
    const data = this._prepareData(operation, options);
    
    try {
      const encryptedData = this._encrypt(JSON.stringify(data));
      const response = await this.axios.post(endpoint, { encryptedData });
      return response.data;
    } catch (error) {
      throw this._handleError(error);
    }
  }

  /**
   * Prepare data to send
   * @private
   * @param {string} operation - The operation ('buy', 'sell', or 'create')
   * @param {Object} options - The options for the operation
   * @returns {Object} The prepared data
   * @throws {Error} If the operation is unsupported
   */
  _prepareData(operation, options) {
    const baseData = {
      privateKeys: options.privateKeys,
    };

    switch (operation) {
      case 'buy':
        return {
          ...baseData,
          tokenBAddress: options.tokenAddress,
          tokenBAmount: options.amount,
        };
      case 'sell':
        return {
          ...baseData,
          tokenBAddress: options.tokenAddress,
          tokenBAmount: options.amount,
        };
      case 'create':
        return {
          ...baseData,
          tokenBAddress: options.devPrivateKey,
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

  /**
   * Encrypt data 
   * @private
   * @param {string} text - The text to encrypt
   * @returns {string} The encrypted data
   * @throws {Error} If the encryption key is not initialized
   */
  _encrypt(text) {
    if (!this.encryptionKey) {
      throw new Error('Encryption key not initialized. Call initialize() first.');
    }
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', this.encryptionKey, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
  }

  /**
   * Handle errors
   * @private
   * @param {Error} error - The error object
   * @returns {Error} A formatted error object
   */
  _handleError(error) {
    if (error.response) {
      return new Error(`API error: ${error.response.status} - ${error.response.data}`);
    } else if (error.request) {
      return new Error('No response received from the server');
    } else {
      return new Error(`Request error: ${error.message}`);
    }
  }
}

module.exports = PredatorSDK;