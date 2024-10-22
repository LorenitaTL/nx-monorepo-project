//@ts-check

const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: true,
  },
  output: 'export',
  distDir: 'output',
  images: { unoptimized: true },
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'mf-update-record',
        exposes: {
          './app': './src/pages/index.tsx',
        },
        extraOptions: {},
        filename: 'static/chunks/remoteEntry.js',
        remotes: {},
        shared: {},
      })
    );

    return config;
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
