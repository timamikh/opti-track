#!/usr/bin/env node

/**
 * Setup script for Opti-Track project
 * Usage: node scripts/setup.js
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const ENV_EXAMPLE_PATH = path.resolve(__dirname, '../.github/env.example');
const ENV_PATH = path.resolve(__dirname, '../.env');

// Function to copy .env.example to .env if it doesn't exist
function setupEnvFile() {
  console.log('Setting up environment variables...');
  
  if (!fs.existsSync(ENV_PATH)) {
    try {
      fs.copyFileSync(ENV_EXAMPLE_PATH, ENV_PATH);
      console.log('Created .env file from example');
    } catch (err) {
      console.error('Error creating .env file:', err.message);
    }
  } else {
    console.log('.env file already exists, skipping');
  }
}

// Function to install dependencies
function installDependencies() {
  console.log('\nInstalling dependencies...');
  
  try {
    console.log('Installing root project dependencies...');
    execSync('npm install', { stdio: 'inherit' });
    
    console.log('\nInstalling KeystoneJS dependencies...');
    execSync('cd keystone-cms && npm install', { stdio: 'inherit' });
    
    console.log('\nDependencies installed successfully!');
  } catch (err) {
    console.error('Error installing dependencies:', err.message);
  }
}

// Main function
function main() {
  console.log('Setting up Opti-Track project...\n');
  
  // Setup steps
  setupEnvFile();
  installDependencies();
  
  console.log('\nSetup complete! You can now run the project with:');
  console.log('  npm run start:dev    # For development');
  console.log('  npm run start:prod   # For production');
}

main(); 