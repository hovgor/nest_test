import { Injectable } from '@nestjs/common';
import { parse } from 'dotenv';
import { readFileSync } from 'fs';
import { IConfig } from './interface/config.interface';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Joi = require('joi');
export type EnvConfig = Record<string, string | number>;

@Injectable()
export class ConfigService {
  private readonly envConfig: IConfig;
  constructor(filePath: string) {
    if (process.env.NODE_ENV === 'dev') {
      const config = parse(readFileSync(filePath));
      this.envConfig = this.validateInput(config);
    } else {
      this.envConfig = this.validateInput(process.env);
    }
  }

  public get<K extends keyof IConfig>(key: K): IConfig[K] {
    return this.envConfig[key];
  }

  private validateInput(envConfig: EnvConfig): IConfig {
    const envVarsSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'demo', 'production')
        .default('development'),
      HOST: Joi.string().default('127.0.0.1'),
      PORT: Joi.number().default(3000),
      GLOBAL_PREFIX: Joi.string().default('api'),
      ALLOWED_ORIGINS: Joi.string().default('ggmp'),
      SECRET: Joi.string(),
      FRONT_URL: Joi.string(),

      DATABASE_HOST: Joi.string().default('localhost'),
      DATABASE_PORT: Joi.number().default(5432),
      DATABASE_USERNAME: Joi.string().default('nest_test'),
      DATABASE_PASSWORD: Joi.string().allow('').default('password'),
      DATABASE_NAME: Joi.string().default('nest_test'),
      DATABASE_SCHEMA: Joi.string().default('default'),

      JWT_SIGN_ALGORITHM: Joi.string().valid('RS256', 'HS256').default('HS256'),
      JWT_EXPIRE: Joi.string().default(315569260000),
      JWT_REFRESH_EXPIRE: Joi.string().default(315569260000),
      JWT_PUBLIC: Joi.string().default('ahdkgKJKjdhkjshkjhKG#@kjks'),
      JWT_PRIVATE: Joi.string(),
    });
    const { value: validateEnvConfig } = envVarsSchema.validate(envConfig, {
      allowUnknown: true,
    });

    return validateEnvConfig as IConfig;
  }
}
