const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DotenvPlugin = require('webpack-dotenv-plugin');

// App files location
const PATHS = {
  root: path.resolve(__dirname, '../app'),
  app: path.resolve(__dirname, '../app/js'),
  styles: path.resolve(__dirname, '../app/styles'),
  build: path.resolve(__dirname, '../build'),
};

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'js/vendor.bundle.js'
  }),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false')),
  }),
  new ExtractTextPlugin('assets/styles-dev.css'),
  new DotenvPlugin({
    sample: path.resolve(__dirname, '../../.env.default'),
    path: path.resolve(__dirname, '../../.env'),
  }),
];

const sassLoaders = [
  'style-loader',
  'css-loader?sourceMap',
  'postcss-loader',
  'sass-loader?outputStyle=expanded',
];

module.exports = {
  devtool: 'eval',
  entry: {
    app: ['babel-polyfill', path.resolve(PATHS.app, 'main')],
    vendor: ['react']
  },
  output: {
    path: PATHS.build,
    filename: 'js/[name].js',
    publicPath: '/'
  },
  plugins: plugins,
  resolve: {
    enforceExtension: false,
    extensions: ['*', '.js', '.jsx', '.scss'],
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/i,
        exclude: [/node_modules/],
        loaders: ['babel-loader'],
        include: PATHS.app
      },
      {
        test: /\.scss$/,
        loader: sassLoaders.join('!'),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.json$/i,
        loader: 'json-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        use: [{
          loader: 'url-loader?limit=8192',
        }],
      },
    ],
  },
  stats: {
    colors: true,
    reasons: true,
  },
  devServer: {
    contentBase: PATHS.root,
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },
};
