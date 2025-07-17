// Authentication configuration settings

// Session configuration
export const sessionConfig = {
  // Session secret - in production should be set via environment variable
  secret: process.env.SESSION_SECRET || 'a-very-secure-secret-for-keystone-cms',
  // Session duration (30 days in seconds)
  maxAge: 60 * 60 * 24 * 30
};

// Authentication configuration
export const authConfig = {
  // KeystoneJS authentication settings
  keystone: {
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
      fields: ['name', 'email', 'password', 'role']
    }
  },
  session: sessionConfig
};

export default authConfig; 