#!/usr/bin/env node
'use strict';

/**
 * Strapi server startup file for cPanel
 * This file starts the Strapi application
 */

const strapi = require('@strapi/strapi');
const fs = require('fs');
const path = require('path');

// Log file path
const logFile = path.join(__dirname, 'server.log');

// Logger function
function log(level, message, data = null) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level}] ${message}${data ? ' ' + JSON.stringify(data) : ''}\n`;

  // Write to file
  fs.appendFileSync(logFile, logMessage);

  // Also write to console
  console.log(logMessage.trim());
}

// Clear old log on startup
fs.writeFileSync(logFile, `=== Strapi server starting at ${new Date().toISOString()} ===\n`);

log('INFO', 'Environment variables:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  DATABASE_CLIENT: process.env.DATABASE_CLIENT,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_NAME: process.env.DATABASE_NAME,
  APP_KEYS: process.env.APP_KEYS ? 'SET' : 'NOT SET',
  API_TOKEN_SALT: process.env.API_TOKEN_SALT ? 'SET' : 'NOT SET',
  ADMIN_JWT_SECRET: process.env.ADMIN_JWT_SECRET ? 'SET' : 'NOT SET',
  JWT_SECRET: process.env.JWT_SECRET ? 'SET' : 'NOT SET',
});

log('INFO', 'Starting Strapi...');

strapi({ distDir: './dist' })
  .start()
  .then(() => {
    log('INFO', 'Strapi started successfully');
  })
  .catch((err) => {
    log('ERROR', 'Failed to start Strapi', { error: err.message, stack: err.stack });
    process.exit(1);
  });

