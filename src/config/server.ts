// Server configuration settings

// Development server configuration
const development = {
  // React application server
  reactApp: {
    port: 8000,
    strictPort: true,
    host: true,
    open: true
  },
  // KeystoneJS CMS server
  keystoneCms: {
    port: 3000,
    cors: {
      origin: true,
      credentials: true
    }
  }
};

// Production server configuration
const production = {
  // React application server (served by Nginx)
  reactApp: {
    port: 80
  },
  // KeystoneJS CMS server
  keystoneCms: {
    port: 3000,
    cors: {
      origin: true,
      credentials: true
    }
  }
};

// Export configuration based on environment
export const serverConfig = process.env.NODE_ENV === 'production' 
  ? production 
  : development;

export default serverConfig; 