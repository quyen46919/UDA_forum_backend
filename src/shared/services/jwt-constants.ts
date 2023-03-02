import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
const algorithm = 'aes-256-cbc'; //Using AES encryption
const key = randomBytes(32);
const iv = randomBytes(16);

@Injectable()
export class JwtConstants {
  get secret(): string {
    return process.env.JWT_SECRET || '12d1sd2adsaewr';
  }

  get expiresIn(): string {
    return process.env.JWT_EXPIRESIN || '1d';
  }

  getRefreshExpireTime(): string {
    return process.env.REFRESH_JWT_EXPIREIN || '7d';
  }

  encrypt(text: any) {
    const cipher = createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return {
      iv: iv.toString('hex'),
      encryptedData: encrypted.toString('hex'),
    };
  }

  decrypt(text: any) {
    const iv = Buffer.from(text.iv, 'hex');
    const encryptedText = Buffer.from(text.encryptedData, 'hex');
    const decipher = createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}
