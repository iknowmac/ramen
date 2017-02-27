const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DotenvPlugin = require('webpack-dotenv-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

// App files location
const PATHS = {
  root: path.resolve(__dirname, '../app'),
  app: path.resolve(__dirname, '../app/js'),
  styles: path.resolve(__dirname, '../app/styles'),
  build: path.resolve(__dirname, '../build'),
};

const GLOBALS = {
  'process.env': {
    'NODE_ENV': JSON.stringify('development')
  },
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'true'))
};

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'js/vendor.bundle.js'
  }),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.DefinePlugin(GLOBALS),
  new webpack.HotModuleReplacementPlugin(),
  new ExtractTextPlugin('assets/styles-dev.css'),
  new DotenvPlugin({
    sample: path.resolve(__dirname, '../../.env.default'),
    path: path.resolve(__dirname, '../../.env'),
  }),
  new DashboardPlugin(),
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
    modules: [PATHS.app, 'node_modules'],
    descriptionFiles: ['package.json'],
    enforceExtension: false,
    extensions: ['*', '.js', '.jsx', '.scss'],
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        include: PATHS.styles,
        use: [
          'style-loader',
          'css-loader?sourceMap',
          'postcss-loader',
          'sass-loader?outputStyle=expanded',
        ],
      },
      {
        test: /\.css$/,
        include: PATHS.styles,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!postcss-loader'
        })
      },
      {
        test: /\.json$/i,
        use: ['json-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        use: ['url-loader?limit=8192'],
      },
    ],
  },
  devServer: {
    contentBase: PATHS.root,
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true,
    },
    port: 3000,
  },
};
