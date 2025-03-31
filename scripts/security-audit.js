#!/usr/bin/env node

/**
 * Security Audit Script for Training Fox Application
 * 
 * This script performs security checks on:
 * 1. Frontend dependencies
 * 2. Backend dependencies
 * 3. Environment file presence
 * 4. Security headers configuration
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🦊 Training Fox Security Audit 🦊');
console.log('================================\n');

// Helper to run commands with error handling
function runCommand(command, label) {
  try {
    console.log(`\n📋 ${label}:`);
    console.log('--------------------------------');
    const output = execSync(command, { encoding: 'utf8' });
    console.log(output);
    return { success: true, output };
  } catch (error) {
    console.error(`❌ Error in ${label}:`);
    console.error(error.message);
    return { success: false, error: error.message };
  }
}

// Check frontend dependencies
runCommand('npm audit --json', 'Frontend Dependencies Audit');

// Check backend dependencies
runCommand('cd server && npm audit --json', 'Backend Dependencies Audit');

// Check if environment files exist
console.log('\n📋 Environment Files Check:');
console.log('--------------------------------');
const envFiles = [
  '.env',
  '.env.development',
  '.env.local',
  '.env.development.local',
  'server/.env'
];

envFiles.forEach(file => {
  if (fs.existsSync(path.join(process.cwd(), file))) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} is missing`);
  }
});

// Check security headers
console.log('\n📋 Security Headers Check:');
console.log('--------------------------------');
try {
  const serverFile = fs.readFileSync(path.join(process.cwd(), 'server', 'server.js'), 'utf8');
  
  // Check for helmet
  if (serverFile.includes('helmet(')) {
    console.log('✅ Helmet is configured');
  } else {
    console.log('❌ Helmet is missing');
  }
  
  // Check for CORS
  if (serverFile.includes('cors(')) {
    console.log('✅ CORS is configured');
  } else {
    console.log('❌ CORS is missing');
  }
  
  // Check for rate limiting
  if (serverFile.includes('rateLimit(')) {
    console.log('✅ Rate limiting is configured');
  } else {
    console.log('❌ Rate limiting is missing');
  }
  
  // Check for proper error handling
  if (serverFile.includes('app.use((err, req, res, next)')) {
    console.log('✅ Global error handling is configured');
  } else {
    console.log('❌ Global error handling is missing');
  }
} catch (error) {
  console.error('❌ Error checking server file:', error.message);
}

console.log('\n🦊 Security Audit Completed 🦊'); 