const crypto = require('crypto');

function encrypt(text, encryptionKey) {
  if (!encryptionKey) {
    throw new Error('Encryption key not initialized. Call initialize() first.');
  }
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

module.exports = { encrypt };