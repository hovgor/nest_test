import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { readFileSync } from 'fs';
import { resolve } from 'path';

@Injectable()
export class JWTConfigService implements JwtOptionsFactory {
  public createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    return {
      publicKey: 'gcbvcbz@%j',
      privateKey: 'gfhfdhf#%hvj',
      signOptions: {
        algorithm: 'HS256',
        expiresIn: 600000,
      },
    };
  }
  public get(key: 'public' | 'private'): string {
    try {
      return readFileSync(
        resolve(process.cwd(), 'keys', `${key}.pem`),
        'utf-8',
      );
    } catch (error) {
      console.log(error);
      return '';
    }
  }
}
