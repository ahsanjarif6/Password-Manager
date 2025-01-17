import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;


export const encrypt = (text) => {
  try {
    
    const encryptionKey = process.env.ENCRYPTION_KEY;
    if (!encryptionKey || encryptionKey.length !== 64) {
      throw new Error('Invalid ENCRYPTION_KEY length. It must be 64 hexadecimal characters (32 bytes).');
    }

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      'aes-256-ctr',
      Buffer.from(encryptionKey, 'hex'),
      iv
    );

    const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
    return {
      iv: iv.toString('hex'),
      encryptedData: encrypted.toString('hex'),
    };
  } catch (error) {
    console.error('Encryption Error:', error.message);
    throw error;
  }
};


export const decrypt = (encryptedData, iv) => {
  try {
    const encryptionKey = process.env.ENCRYPTION_KEY;
    if (!encryptionKey || encryptionKey.length !== 64) {
      throw new Error('Invalid ENCRYPTION_KEY length. It must be 64 hexadecimal characters (32 bytes).');
    }

    const decipher = crypto.createDecipheriv(
      'aes-256-ctr',
      Buffer.from(encryptionKey, 'hex'),
      Buffer.from(iv, 'hex') 
    );

    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encryptedData, 'hex')),
      decipher.final(),
    ]);
    return decrypted.toString('utf8');
  } catch (error) {
    console.error('Decryption Error:', error.message);
    throw error;
  }
};