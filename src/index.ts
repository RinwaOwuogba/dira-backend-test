import 'reflect-metadata';
import { createConnection } from 'typeorm';
import app from './app';
import config from './config';

const startApp = async () => {
  try {
    await createConnection(config.typeorm.connectionConfig);

    app
      .listen(config.port, () => {
        console.info(`
      ################################################
      🛡️  API server listening on port: ${config.port} 🛡️
      ################################################
    `);
      })
      .on('error', (err) => {
        console.error(err);
        process.exit(1);
      });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startApp();
