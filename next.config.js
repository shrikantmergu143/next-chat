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
    TOKEN_KEY: process.env.TOKEN_KEY,

  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     // Optimize JavaScript
  //     config.optimization.minimize = true;
  //     config.optimization.minimizer = [new TerserPlugin()];

  //     // Optimize Images
  //     config.module.rules.push({
  //       test: /\.(png|jpe?g|gif|svg)$/i,
  //       use: [
  //         {
  //           loader: 'image-webpack-loader',
  //           options: {
  //             mozjpeg: {
  //               progressive: true,
  //             },
  //             optipng: {
  //               enabled: false,
  //             },
  //             pngquant: {
  //               quality: [0.65, 0.90],
  //               speed: 4,
  //             },
  //             gifsicle: {
  //               interlaced: false,
  //             },
  //             webp: {
  //               quality: 75,
  //             },
  //           },
  //         },
  //       ],
  //     });

  //     // Enable Web Fonts Optimization
  //     config.module.rules.push({
  //       test: /\.(woff|woff2|eot|ttf|otf)$/i,
  //       type: 'asset/resource',
  //     });
  //   }

  //   return config;
  // },
}

module.exports = nextConfig
