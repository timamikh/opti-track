import { createAuth } from '@keystone-6/auth';
import { statelessSessions } from '@keystone-6/core/session';
import path from 'path';
import fs from 'fs';

// Load configuration from the src/config directory
// We need to use require here because this file is used during Keystone initialization
// before the TypeScript compilation
let authConfig;
const configPath = path.resolve(__dirname, '../src/config/auth.ts');

// Check if the config file exists
if (fs.existsSync(configPath)) {
  try {
    // Use dynamic import for ESM compatibility
    import('../src/config/auth.js').then(module => {
      authConfig = module.default;
    }).catch(err => {
      console.warn('Failed to import auth config, using defaults:', err);
      // Fallback to default config
      authConfig = {
        keystone: {
          listKey: 'User',
          identityField: 'email',
          secretField: 'password',
          initFirstItem: {
            fields: ['name', 'email', 'password', 'role'],
          },
        },
        session: {
          secret: process.env.SESSION_SECRET || 'a-very-secure-secret-for-keystone-cms',
          maxAge: 60 * 60 * 24 * 30, // 30 days
        }
      };
    });
  } catch (err) {
    console.warn('Failed to load auth config, using defaults:', err);
  }
} else {
  console.warn('Auth config file not found, using defaults');
}

// Fallback to default config if loading fails
if (!authConfig) {
  authConfig = {
    keystone: {
      listKey: 'User',
      identityField: 'email',
      secretField: 'password',
      initFirstItem: {
        fields: ['name', 'email', 'password', 'role'],
      },
    },
    session: {
      secret: process.env.SESSION_SECRET || 'a-very-secure-secret-for-keystone-cms',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    }
  };
}

// Create auth with config
const { withAuth } = createAuth({
  listKey: authConfig.keystone.listKey,
  identityField: authConfig.keystone.identityField,
  secretField: authConfig.keystone.secretField,
  initFirstItem: authConfig.keystone.initFirstItem,
});

// Create session with config
const session = statelessSessions({
  secret: authConfig.session.secret,
  maxAge: authConfig.session.maxAge,
});

export { withAuth, session }; 