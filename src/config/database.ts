// Database configuration settings

// KeystoneJS database configuration
export const keystoneDbConfig = {
  development: {
    provider: 'sqlite',
    url: 'file:./keystone.db',
  },
  production: {
    provider: 'sqlite',
    url: 'file:./keystone.db',
    // In a real production environment, you might want to use a different database
    // provider: 'postgresql',
    // url: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/opti-track',
  }
};

// Export configuration based on environment
export const databaseConfig = {
  keystone: process.env.NODE_ENV === 'production'
    ? keystoneDbConfig.production
    : keystoneDbConfig.development
};

export default databaseConfig; 