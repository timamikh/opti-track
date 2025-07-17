import axios from 'axios';
import { apiConfig } from '../config/api';

// Create an axios instance with the base URL from config
const api = axios.create({
  baseURL: apiConfig.endpoints.keystone.graphql,
  withCredentials: apiConfig.request.withCredentials,
  headers: apiConfig.request.headers,
  timeout: apiConfig.request.timeout
});

// Add error handler
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error('API Response Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('API Request Error:', error.request);
    } else {
      console.error('API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Function to execute GraphQL queries
export const executeQuery = async (query: string, variables = {}) => {
  try {
    const response = await api.post('', {
      query,
      variables,
    });
    
    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }
    
    return response.data.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Blog API functions
export const blogApi = {
  // Get all posts
  getPosts: async () => {
    const query = `
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
    `;
    
    try {
      const data = await executeQuery(query);
      return data.posts;
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  },
  
  // Get post by slug
  getPostBySlug: async (slug: string) => {
    const query = `
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
    `;
    
    try {
      const data = await executeQuery(query, { slug });
      return data.posts[0];
    } catch (error) {
      console.error('Error fetching post:', error);
      return null;
    }
  },
  
  // Get posts by category
  getPostsByCategory: async (categorySlug: string) => {
    const query = `
      query GetPostsByCategory($categorySlug: String!) {
        posts(where: { category: { slug: { equals: $categorySlug } } }) {
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
    `;
    
    try {
      const data = await executeQuery(query, { categorySlug });
      return data.posts;
    } catch (error) {
      console.error('Error fetching posts by category:', error);
      return [];
    }
  },
  
  // Get all categories
  getCategories: async () => {
    const query = `
      query GetCategories {
        categories {
          id
          name
          slug
          description
        }
      }
    `;
    
    try {
      const data = await executeQuery(query);
      return data.categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },
  
  // Get all tags
  getTags: async () => {
    const query = `
      query GetTags {
        tags {
          id
          name
          slug
        }
      }
    `;
    
    try {
      const data = await executeQuery(query);
      return data.tags;
    } catch (error) {
      console.error('Error fetching tags:', error);
      return [];
    }
  },
};

// Authentication API functions
export const authApi = {
  // User login
  login: async (email: string, password: string) => {
    const query = `
      mutation Login($email: String!, $password: String!) {
        authenticateUserWithPassword(email: $email, password: $password) {
          ... on UserAuthenticationWithPasswordSuccess {
            sessionToken
            item {
              id
              name
              email
              role
            }
          }
          ... on UserAuthenticationWithPasswordFailure {
            message
          }
        }
      }
    `;
    
    try {
      const data = await executeQuery(query, { email, password });
      return data.authenticateUserWithPassword;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },
  
  // User logout
  logout: async () => {
    const query = `
      mutation Logout {
        endSession
      }
    `;
    
    try {
      const data = await executeQuery(query);
      return data.endSession;
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  },
  
  // Get current user
  getCurrentUser: async () => {
    const query = `
      query GetCurrentUser {
        authenticatedItem {
          ... on User {
            id
            name
            email
            role
          }
        }
      }
    `;
    
    try {
      const data = await executeQuery(query);
      return data.authenticatedItem;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },
};

export default {
  blog: blogApi,
  auth: authApi,
}; 