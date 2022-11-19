export interface IConfig {
  NODE_ENV: string;
  HOST: string;
  PORT: number;
  GLOBAL_PREFIX: string;
  ALLOWED_ORIGINS: string[];
  SECRET: string;
  FRONT_URL: string;

  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
  DATABASE_SCHEMA: string;

  JWT_SIGN_ALGORITHM: string;
  JWT_EXPIRE: string | number;
  JWT_REFRESH_EXPIRE: string | number;
  JWT_PUBLIC: string;
  JWT_PRIVATE: string;
}
