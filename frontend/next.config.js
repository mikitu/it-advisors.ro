/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable Turbopack for build (cPanel symlink compatibility)
  experimental: {
    turbo: false,
  },
};

module.exports = nextConfig;

