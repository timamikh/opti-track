# Opti-Track KeystoneJS CMS

This directory contains the KeystoneJS CMS for the Opti-Track blog.

## Structure

- `keystone.ts` - Main KeystoneJS configuration file
- `schema.ts` - Data schema definition
- `auth.ts` - Authentication configuration
- `schema.graphql` - Generated GraphQL schema
- `schema.prisma` - Generated Prisma schema

## Quick Start

To run the KeystoneJS CMS:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The CMS will be available at:
- Admin panel: http://localhost:3000/admin
- GraphQL API: http://localhost:3000/api/graphql

## Configuration

The CMS uses configuration files from the parent project's `src/config` directory:

- `server.ts` - Server configuration (port, CORS settings)
- `database.ts` - Database connection settings
- `auth.ts` - Authentication settings

## Data Models

The CMS includes the following data models:

### User

- `name`: User's name
- `email`: User's email (unique, used for login)
- `password`: User's password (hashed)
- `role`: User's role (admin, editor, smm)
- `posts`: Relationship to posts authored by the user

### Post

- `title`: Post title
- `slug`: URL-friendly identifier (unique)
- `status`: Post status (published, draft)
- `content`: Post content (document format)
- `publishDate`: Date of publication
- `author`: Relationship to the post author
- `category`: Relationship to the post category
- `tags`: Relationship to post tags
- `imageUrl`: URL of the post image

### Category

- `name`: Category name
- `slug`: URL-friendly identifier (unique)
- `description`: Category description
- `posts`: Relationship to posts in this category

### Tag

- `name`: Tag name
- `slug`: URL-friendly identifier (unique)
- `posts`: Relationship to posts with this tag

## GraphQL API

The CMS provides a GraphQL API for interacting with the data models. Here are some example queries:

### Get all posts

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

### Get post by slug

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

## Authentication

The CMS uses stateless sessions with JWT for authentication. The session configuration can be customized in the `auth.ts` file. 