# Opti-Track

## Deployment Instructions

### Development Environment

To run the application in development mode:

```bash
docker-compose up
```

This will start the development server with hot-reload at http://localhost:3000

### Production Deployment

To deploy the application in production:

1. Build and start the containers:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

2. The application will be available at http://localhost:80

### Security Features

The production deployment includes several security measures:

- Non-root user in Docker containers
- Secure Nginx configuration with:
  - HTTP security headers
  - XSS protection
  - Content Security Policy
  - Resource limits
  - Health checks
- Static asset caching
- Gzip compression
- Protection against common web vulnerabilities

### Monitoring

- Health checks are configured to run every 30 seconds
- Container will automatically restart on failure
- Resource limits are set to prevent DoS attacks

### Maintenance

To update the application:

1. Pull the latest changes:
```bash
git pull origin master
```

2. Rebuild and restart the containers:
```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

### Troubleshooting

If you encounter issues:

1. Check container logs:
```bash
docker-compose -f docker-compose.prod.yml logs
```

2. Check container health:
```bash
docker ps
```

3. Restart the containers:
```bash
docker-compose -f docker-compose.prod.yml restart
``` 