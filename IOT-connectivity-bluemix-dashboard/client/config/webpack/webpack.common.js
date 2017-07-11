const webpack = require('webpack');
const helpers = require('./../helpers');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const AotPlugin = require('@ngtools/webpack').AotPlugin;

const environmentUtils = require('./../environment-utils');
const environment = environmentUtils.getEnvironment();
const webpackEnvironment = environmentUtils.getWebpack();

const nodeModules = environment.nodeModules;
const aotConfigs = webpackEnvironment.aot;
const src = environment.src;

module.exports = {
  entry: {
    'vendor': helpers.root(webpackEnvironment.vendor),
    'app'   : helpers.root(webpackEnvironment.main),
    'shims' : helpers.root(webpackEnvironment.shims),
  },

  resolve: {
    extensions: ['.js', '.ts'],
    modules   : [
      helpers.root(src),
      helpers.root(nodeModules),
    ],
  },

  module: {
    rules: [
      {
        test   : /\.ts$/,
        use    : [{
          loader: '@ngtools/webpack',
        }],
        exclude: webpackEnvironment.excludes,
      },
      {
        test   : /\.html$/,
        use    : [
          {
            loader: 'raw-loader',
          },
        ],
        exclude: [],
      },
      {
        test: /\.css$/,
        use : [
          {
            loader: 'raw-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use : {
          loader: 'file?name=assets/[name].[hash].[ext]',
        },
      },
      {
        test: /\.hbs$/,
        use : [
          {
            loader: 'handlebars-loader',
          },
        ],
      },
    ],
  },

  plugins: [
    new AotPlugin({
      tsConfigPath: helpers.root(`./client/tsconfig.build.json`),
      entryModule : helpers.root(aotConfigs.entryModule),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'shims', 'manifest'],
    }),
    new WebpackMd5Hash(),
    new HtmlWebpackPlugin({
      isBuild       : environmentUtils.isBuild(),
      filename      : `${webpackEnvironment.index}.html`,
      template      : helpers.root(`${src}app/index.hbs`),
      inject        : false,
      chunksSortMode: 'dependency',
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress : {
        sequences   : true,
        dead_code   : true,
        conditionals: true,
        booleans    : true,
        unused      : true,
        if_return   : true,
        join_vars   : true,
        drop_console: true,
      },
      mangle   : {
        except: ['$super', '$', 'exports', 'require'],
      },
      beautify : false,
      comments : false,
    }),
  ],
};
