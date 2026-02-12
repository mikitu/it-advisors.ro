#!/usr/bin/env node
'use strict';

/**
 * Strapi server startup file for cPanel
 * This file starts the Strapi application
 */

const strapi = require('@strapi/strapi');

strapi({ distDir: './dist' }).start();

