# Opti-Track

## Project Structure

The project is organized as follows:

- `src/` - React application source code
  - `components/` - React components
  - `pages/` - Page components
  - `config/` - Configuration files
  - `utils/` - Utility functions
  - `types/` - TypeScript type definitions
  - `styles/` - CSS files
- `keystone-cms/` - KeystoneJS CMS for the blog
  - `keystone.ts` - Main KeystoneJS configuration file
  - `schema.ts` - Data schema definition
  - `auth.ts` - Authentication configuration
  - `schema.graphql` - Generated GraphQL schema
  - `schema.prisma` - Generated Prisma schema
- `public/` - Static assets
- `assets/` - Source assets (images, etc.)
- `scripts/` - Utility scripts

## Configuration

The project uses a centralized configuration system located in `src/config/`:

- `server.ts` - Server configuration (ports, hosts, CORS settings)
- `api.ts` - API endpoints and request settings
- `database.ts` - Database connection settings
- `auth.ts` - Authentication settings

## Quick Start

To set up the project quickly:

```bash
# Clone the repository
git clone https://github.com/timamikh/opti-track.git
cd opti-track

# Run the setup script
npm run setup

# Start the development server
npm run start:dev
```

## Available Scripts

- `npm run dev` - Start the React development server
- `npm run build` - Build the React application for production
- `npm run keystone` - Start the KeystoneJS CMS
- `npm run start:dev` - Start all services using Docker Compose (development)
- `npm run start:prod` - Start all services using Docker Compose (production)
- `npm run check-duplicates` - Check for code duplication
- `npm run setup` - Set up the project (create .env file, install dependencies)

## Deployment Instructions

### Development Environment

To run the application in development mode:

```bash
npm run start:dev
```

This will start:
- React development server at http://localhost:8000
- KeystoneJS CMS at http://localhost:3000

### Blog CMS (KeystoneJS)

The project includes a blog powered by KeystoneJS. To run the CMS separately:

1. Install dependencies for the KeystoneJS CMS:
```bash
cd keystone-cms
npm install
```

2. Start the KeystoneJS development server:
```bash
npm run dev
```

Or you can use the shortcut command from the root directory:
```bash
npm run keystone
```

The CMS will be available at:
- Admin panel: http://localhost:3000/admin
- GraphQL API: http://localhost:3000/api/graphql

#### KeystoneJS Data Models

The CMS includes the following data models:

##### User

- `name`: User's name
- `email`: User's email (unique, used for login)
- `password`: User's password (hashed)
- `role`: User's role (admin, editor, smm)
- `posts`: Relationship to posts authored by the user

##### Post

- `title`: Post title
- `slug`: URL-friendly identifier (unique)
- `status`: Post status (published, draft)
- `content`: Post content (document format)
- `publishDate`: Date of publication
- `author`: Relationship to the post author
- `category`: Relationship to the post category
- `tags`: Relationship to post tags
- `imageUrl`: URL of the post image

##### Category

- `name`: Category name
- `slug`: URL-friendly identifier (unique)
- `description`: Category description
- `posts`: Relationship to posts in this category

##### Tag

- `name`: Tag name
- `slug`: URL-friendly identifier (unique)
- `posts`: Relationship to posts with this tag

#### GraphQL API

The CMS provides a GraphQL API for interacting with the data models. Here are some example queries:

##### Get all posts

```graphql
query GetPosts {
  posts {
    id
    title
    slug
    status
    publishDate
    imageUrl
    author {
      name
    }
    category {
      name
      slug
    }
  }
}
```

##### Get post by slug

```graphql
query GetPostBySlug($slug: String!) {
  posts(where: { slug: { equals: $slug } }) {
    id
    title
    slug
    status
    content {
      document
    }
    publishDate
    imageUrl
    author {
      name
    }
    category {
      name
      slug
    }
    tags {
      name
      slug
    }
  }
}
```

### Production Deployment

To deploy the application in production:

1. Build and start the containers:
```bash
npm run start:prod
```

2. The application will be available at:
   - Frontend: http://localhost:80
   - CMS: http://localhost:3000

### Environment Variables

The following environment variables can be set:

- `NODE_ENV` - Environment mode (`development` or `production`)
- `SESSION_SECRET` - Secret for session encryption (defaults to a secure value)

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
- Stateless sessions with JWT for authentication in the CMS

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
npm run start:prod
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