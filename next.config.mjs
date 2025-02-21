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
      domains: ['example.com', 'group.schindler.com', 'upload.wikimedia.org', 'cdn-icons-png.flaticon.com'],
    },
    typescript: {
      ignoreBuildErrors: true,
    },
  };
  
  export default nextConfig;
  
