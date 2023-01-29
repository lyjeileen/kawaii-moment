/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'lyjeileen.s3.ca-central-1.amazonaws.com'],
  },
};

module.exports = nextConfig;
