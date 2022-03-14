/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  presets: [
    [
      'next/babel',
      {
        'preset-react': {
          runtime: 'automatic',
          importSource: '@emotion/react',
        },
      },
    ],
  ],
  plugins: ['@emotion/babel-plugin'],
};

module.exports = nextConfig;
