//@ts-check

const { composePlugins, withNx } = require('@nx/next');
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  output: 'export',
  distDir: 'output',
  nx: {
    svgr: false,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'updateRecordApp', // Nombre de la app remota
          filename: 'static/chunks/remoteEntry.js', // Nombre del archivo remoteEntry.js
          exposes: {
            './app': './src/components/testComponents.tsx', // Módulo o componente que expone la app
          },
          extraOptions: {},
          shared: {
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
