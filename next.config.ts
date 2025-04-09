const path = require('path')

/** @type {import('next').NextConfig} */

// const cspHeader = `
// default-src 'self';
// script-src 'self' 'unsafe-eval' 'unsafe-inline';
// style-src 'self' 'unsafe-inline';
// img-src 'self' blob: data:;
// font-src 'self';
// object-src 'none';
// base-uri 'self';
// form-action 'self';
// frame-ancestors 'none';
// block-all-mixed-content;
// upgrade-insecure-requests;
// `
const cspHeader = `
    object-src 'none';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ]
  },
  reactStrictMode: false,
  compress: true,
  experimental: {
    webVitalsAttribution: ['CLS', 'LCP']
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  images: {
    domains: ['localhost', 'http://localhost:3000' , 'ct.appristine.in', 'ctd.appristine.in'], // Add your localhost or any other domains here
  },
  skipTrailingSlashRedirect: false,
  env: {
    API_URL: process.env.API_URL,
    REACT_APP_API_DOMAIN: process.env.REACT_APP_API_DOMAIN,
    REACT_APP_PUBLIC_LOGO: process.env.REACT_APP_PUBLIC_LOGO,
    REACT_APP_API: process.env.REACT_APP_API,
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    TOKEN_KEY: process.env.TOKEN_KEY,

  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig
