import { config } from '@keystone-6/core';
import { lists } from './schema';
import { withAuth, session } from './auth';
import path from 'path';
import fs from 'fs';

// Load server configuration from the src/config directory
let serverConfig;
const serverConfigPath = path.resolve(__dirname, '../src/config/server.ts');

// Check if the config file exists
if (fs.existsSync(serverConfigPath)) {
  try {
    // Use dynamic import for ESM compatibility
    import('../src/config/server.js').then(module => {
      serverConfig = module.default;
    }).catch(err => {
      console.warn('Failed to import server config, using defaults:', err);
      // Fallback to default config
      serverConfig = {
        keystoneCms: {
          port: 3000,
          cors: { 
            origin: true, 
            credentials: true 
          }
        }
      };
    });
  } catch (err) {
    console.warn('Failed to load server config, using defaults:', err);
  }
} else {
  console.warn('Server config file not found, using defaults');
}

// Load database configuration
let dbConfig;
const dbConfigPath = path.resolve(__dirname, '../src/config/database.ts');

// Check if the config file exists
if (fs.existsSync(dbConfigPath)) {
  try {
    // Use dynamic import for ESM compatibility
    import('../src/config/database.js').then(module => {
      dbConfig = module.default.keystone;
    }).catch(err => {
      console.warn('Failed to import database config, using defaults:', err);
      // Fallback to default config
      dbConfig = {
        provider: 'sqlite',
        url: 'file:./keystone.db',
      };
    });
  } catch (err) {
    console.warn('Failed to load database config, using defaults:', err);
  }
} else {
  console.warn('Database config file not found, using defaults');
}

// Fallback to default config if loading fails
if (!serverConfig) {
  serverConfig = {
    keystoneCms: {
      port: 3000,
      cors: { 
        origin: true, 
        credentials: true 
      }
    }
  };
}

if (!dbConfig) {
  dbConfig = {
    provider: 'sqlite',
    url: 'file:./keystone.db',
  };
}

export default withAuth(
  config({
    db: dbConfig,
    lists,
    session,
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    server: {
      port: serverConfig.keystoneCms.port,
      cors: serverConfig.keystoneCms.cors
    },
  })
); 