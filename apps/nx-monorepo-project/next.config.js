//@ts-check

const { composePlugins, withNx } = require('@nx/next');
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  output: 'export',
  nx: {
    svgr: false,
  },
  webpack: (config, { isServer }) => {
    // Integrar Module Federation en el lado del cliente
    if (!isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'nxMonorepoProject', // Nombre de tu app principal
          remotes: {
            createRecordApp:
              'create-record@http://localhost:3001/_next/static/chunks/remoteEntry.js', // URL del microfrontend
            updateRecordApp:
              'update-record@http://localhost:3002/_next/static/chunks/remoteEntry.js',
            recordsListApp:
              'records-list@http://localhost:3003/_next/static/chunks/remoteEntry.js',
          },
          extraOptions: {},
          shared: {
            // Dependencias compartidas (react, react-dom)
            react: {
              singleton: true,
              requiredVersion: false,
            },
            'react-dom': {
              singleton: true,
              requiredVersion: false,
            },
          },
        })
      );
    }

    return config;
  },
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);
