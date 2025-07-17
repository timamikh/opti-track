// Central configuration file for Opti-Track
import { serverConfig } from './server';
import { apiConfig } from './api';
import { databaseConfig } from './database';
import { authConfig } from './auth';

// Export all configurations
export {
  serverConfig,
  apiConfig,
  databaseConfig,
  authConfig
};

// Export a default configuration object with all settings
export default {
  server: serverConfig,
  api: apiConfig,
  database: databaseConfig,
  auth: authConfig
}; 