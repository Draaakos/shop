const path = require('path');

const createAppPath = (filename) =>
  path.join(__dirname, 'assets', 'js', 'apps', `${filename}.js`);

module.exports = (env = { mode: 'development' }) => {
  const config = {
    mode: env.mode,
    entry: {
      home: createAppPath('home'),
      plp: createAppPath('plp'),
      pdp: createAppPath('pdp'),
      basket: createAppPath('basket'),
      login: createAppPath('login'),
      register: createAppPath('register'),
      checkout: createAppPath('checkout'),
      profile: createAppPath('profile'),
      facebookLogin: createAppPath('facebookLogin'),
      success: createAppPath('success')
    },
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: '[name].bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)/,
          exclude: /node_modules/,
          use: [{ loader: 'babel-loader' }]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      enforceExtension: false,
      enforceModuleExtension: false,
      modules: [
        path.resolve(__dirname, 'assets', 'js'),
        path.resolve(__dirname, 'node_modules')
      ]
    }
  };

  if (env.mode == 'production') {
    config.optimization = {
      splitChunks: {
        chunks: 'all',
        name: 'vendor'
      }
    };
  }

  return config;
};
