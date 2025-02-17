/** @type {import('next').NextConfig} */

const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/path/:slug*',
          destination: 'https://example.com/path/:slug*',
        },
      ];
    },
    images: {
      domains: ['example.com', 'group.schindler.com', 'upload.wikimedia.org'],
    },
    /* other config options here */
  };
  
  export default nextConfig;
  
