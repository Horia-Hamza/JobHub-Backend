import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { Buffer } from 'buffer';

const scryptAsync = promisify(scrypt);

class Authentication {
  async pwdToHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString('hex')}.${salt}`;
  }

  async pwdCompare(storedPassword: string, suppliedPassword: string) {
    const parts = storedPassword.split('.');
    
    if (parts.length !== 2) {
      return false; // Invalid format
    }

    const [hashedPassword, salt] = parts;
    if (!salt) {
      return false; // Salt is missing
    }

    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    return `${buf.toString('hex')}` === hashedPassword;
  }
}

export const authService = new Authentication();
