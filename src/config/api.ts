// API configuration settings
import { serverConfig } from './server';

// Base URLs for different environments
const baseUrls = {
  development: {
    keystone: `http://localhost:${serverConfig.keystoneCms.port}`
  },
  production: {
    keystone: `http://localhost:${serverConfig.keystoneCms.port}`
  }
};

// Environment-specific base URL
const baseUrl = process.env.NODE_ENV === 'production'
  ? baseUrls.production
  : baseUrls.development;

// API endpoints
export const apiConfig = {
  baseUrl,
  endpoints: {
    keystone: {
      graphql: `${baseUrl.keystone}/api/graphql`,
      admin: `${baseUrl.keystone}/admin`
    }
  },
  // Request configuration
  request: {
    timeout: 30000, // 30 seconds
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  }
};

export default apiConfig; 