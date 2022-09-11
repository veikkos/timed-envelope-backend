const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: {
    'dist/private': path.resolve(__dirname, 'dist/src/private.js'),
    'dist/public': path.resolve(__dirname, 'dist/src/public.js'),
  },
  output: {
    path: __dirname,
    filename: '[name]/index.js',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.FRONTEND_URI': JSON.stringify(process.env.FRONTEND_URI),
      'process.env.ALTERNATIVE_URI': JSON.stringify(process.env.ALTERNATIVE_URI),
    }),
  ],
};
