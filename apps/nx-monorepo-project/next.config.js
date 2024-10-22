//@ts-check

const { composePlugins, withNx } = require('@nx/next');
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const getRemotes = ({ isServer = false }) => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const remotes = [
    {
      name: 'mf-create-record',
      remoteUrl: isDevelopment
        ? 'http://localhost:3001'
        : 'http://create-record.s3-website.us-east-2.amazonaws.com',
    },
    {
      name: 'mf-update-record',
      remoteUrl: isDevelopment
        ? 'http://localhost:3002'
        : 'http://update-record.s3-website.us-east-2.amazonaws.com',
    },
    {
      name: 'mf-records-list',
      remoteUrl: isDevelopment
        ? 'http://localhost:3003'
        : 'http://records-list.s3-website.us-east-2.amazonaws.com',
    },
  ];

  const getPathRemoteNext = () =>
    `/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`;

  // The name of the app must be the name of the remote to be consumed.
  return remotes.reduce(
    (prev, item) => ({
      ...prev,
      [item.name]: `${item.name}@${item.remoteUrl}${getPathRemoteNext()}`,
    }),
    {}
  );
};

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: true,
  },
  output: 'export',
  distDir: 'output',
  images: { unoptimized: true },
  webpack(config, options) {
    if (options.isServer && options.nextRuntime === 'nodejs')
      config.plugins.push(
        new options.webpack.IgnorePlugin({ resourceRegExp: /^aws-crt$/ })
      );

    config.plugins.push(
      new NextFederationPlugin({
        extraOptions: {},
        name: 'nx-monorepo-project',
        remotes: getRemotes(options),
        filename: 'static/chunks/remoteEntry.js',
        exposes: {},
        shared: {},
      })
    );
    return config;
  },
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);
