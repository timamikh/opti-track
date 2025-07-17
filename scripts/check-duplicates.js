#!/usr/bin/env node

/**
 * Simple script to check for potential code duplication
 * Usage: node scripts/check-duplicates.js
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const MIN_LINES = 5;  // Minimum number of lines to consider duplication
const MIN_CHARS = 100;  // Minimum number of characters to consider duplication
const IGNORE_DIRS = [
  'node_modules', 
  'dist', 
  '.git', 
  'build',
  'public/fonts',
  'public/images'
];
const EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.css'];

// Store file contents for comparison
const fileContents = new Map();
const filePaths = new Map();

// Function to hash content for comparison
function hashContent(content) {
  return crypto.createHash('md5').update(content).digest('hex');
}

// Function to normalize content for comparison (remove whitespace, comments, etc.)
function normalizeContent(content) {
  return content
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
    .replace(/\/\/.*/g, '')          // Remove single-line comments
    .replace(/\s+/g, ' ')            // Normalize whitespace
    .trim();
}

// Function to extract code blocks from a file
function extractCodeBlocks(content) {
  const lines = content.split('\n');
  const blocks = [];
  
  for (let i = 0; i < lines.length - MIN_LINES; i++) {
    for (let j = i + MIN_LINES; j <= Math.min(lines.length, i + 50); j++) {
      const block = lines.slice(i, j).join('\n');
      const normalized = normalizeContent(block);
      
      if (normalized.length >= MIN_CHARS) {
        blocks.push({
          content: normalized,
          hash: hashContent(normalized),
          startLine: i + 1,
          endLine: j,
          length: j - i
        });
      }
    }
  }
  
  return blocks;
}

// Function to walk directory and process files
function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !IGNORE_DIRS.includes(file)) {
      walkDir(filePath);
    } else if (stat.isFile() && EXTENSIONS.includes(path.extname(file))) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        fileContents.set(filePath, content);
        
        // Extract and store code blocks
        const blocks = extractCodeBlocks(content);
        for (const block of blocks) {
          if (!filePaths.has(block.hash)) {
            filePaths.set(block.hash, []);
          }
          filePaths.get(block.hash).push({
            path: filePath,
            startLine: block.startLine,
            endLine: block.endLine,
            length: block.length
          });
        }
      } catch (err) {
        console.error(`Error processing ${filePath}:`, err.message);
      }
    }
  }
}

// Main function
function main() {
  console.log('Checking for code duplication...');
  
  // Start from the current directory
  walkDir(path.resolve('.'));
  
  // Find duplicates
  const duplicates = [];
  
  for (const [hash, locations] of filePaths.entries()) {
    if (locations.length > 1) {
      // Filter out duplicates in the same file
      const uniqueFiles = new Set(locations.map(loc => loc.path));
      
      if (uniqueFiles.size > 1) {
        duplicates.push({
          hash,
          locations: locations.sort((a, b) => a.path.localeCompare(b.path))
        });
      }
    }
  }
  
  // Sort duplicates by number of occurrences
  duplicates.sort((a, b) => b.locations.length - a.locations.length);
  
  // Print results
  if (duplicates.length === 0) {
    console.log('No significant code duplication found!');
  } else {
    console.log(`Found ${duplicates.length} potential code duplications:`);
    
    for (let i = 0; i < Math.min(duplicates.length, 10); i++) {
      const dup = duplicates[i];
      console.log(`\nDuplicate #${i + 1} (${dup.locations.length} occurrences):`);
      
      for (const loc of dup.locations) {
        console.log(`  ${loc.path}:${loc.startLine}-${loc.endLine} (${loc.length} lines)`);
      }
    }
    
    if (duplicates.length > 10) {
      console.log(`\n... and ${duplicates.length - 10} more duplications.`);
    }
    
    console.log('\nConsider refactoring these duplicated code blocks into reusable functions or components.');
  }
}

main(); 