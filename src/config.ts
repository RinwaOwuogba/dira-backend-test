import { ConnectionOptions } from 'typeorm';
import User from './entity/User';

const dbConfig = {
  type: 'postgres',
  entities: [User],
};

const baseConfig = {
  port: process.env.PORT || 8080,
  isProduction: process.env.NODE_ENV === 'production',
};

const devConfig = {
  ...baseConfig,
  typeorm: {
    connectionConfig: {
      ...dbConfig,
      host: 'localhost',
      port: 5432,
      username: 'bolarinwa',
      password: '0030335',
      database: 'test',
      synchronize: true,
      logging: false,
    } as ConnectionOptions,
  },
};

const prodConfig = {
  ...baseConfig,
  typeorm: {
    connectionConfig: {
      ...dbConfig,
      url: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    } as ConnectionOptions,
  },
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
