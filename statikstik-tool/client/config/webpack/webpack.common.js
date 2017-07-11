const webpack = require('webpack');
const helpers = require('./../helpers');

/**
 * Webpack Plugins
 */
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
        /**
         * Entry file for client libs
         */
        'vendor': helpers.root(webpackEnvironment.vendor),
        /**
         * Entry file for client
         */
        'app'   : helpers.root(webpackEnvironment.main),
        /**
         * Entry file for polyfills
         */
        'shims' : helpers.root(webpackEnvironment.shims),
    },

    resolve: {
        /**
         * Automatically resolve certain extensions.
         *
         * Important for imports of js and ts files
         */
        extensions: ['.js', '.ts'],
        /**
         * Tells webpack what directories should be searched when resolving modules.
         */
        modules   : [
            helpers.root(src),
            helpers.root(nodeModules),
        ],
    },

    module: {
        rules: [
            /**
             * Compiles typescript files with angular 2 ahead-of-time tools
             */
            {
                test   : /\.ts$/,
                use    : [{
                    loader: '@ngtools/webpack',
                }],
                exclude: webpackEnvironment.exclude.map(exclude => helpers.root(exclude)),
            },
            /**
             * Loads html via html loader to minify it and to resolve external resources like images.
             */
            {
                test   : /\.html$/,
                use    : [
                    {
                        loader : 'html-loader',
                        options: {
                            minimize: true,
                            removeComments: true,
                            collapseWhitespace: true,

                            // angular 2 templates break if these are omitted
                            removeAttributeQuotes: false,
                            keepClosingSlash: true,
                            caseSensitive: true,
                            conservativeCollapse: true,
                        },
                    },
                ],
                exclude: [],
            },
            /**
             * Loads css files for angular 2 components as raw files without processing.
             * There is an issue with extract-text-webpack and aot preventing us from creating a css bundle
             * https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/278
             * Because of that external resources are not resolved.
             */
            {
                test: /\.css$/,
                use : [
                    {
                        loader: 'raw-loader',
                    },
                ],
            },
            /**
             * Loads images as external resource for html-loader. Adds hash to filename for cache busting.
             */
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use : {
                    loader : 'file-loader',
                    options: {
                        name      : '[name].[hash].[ext]',
                        // changes paths for resources to assets/ in html
                        publicPath: 'assets/',
                        // copies the files to dist/client/assets
                        outputPath: 'assets/'
                    },
                },
            },
            /**
             * Creates a production ready html file based on the supplied index.hbs
             */
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
            /**
             * Build tsconfig includes configuration needed for tree shaking like:
             * "module": "es2015",
             * "moduleResolution": "node",
             */
            tsConfigPath: helpers.root(`./client/tsconfig.build.json`),
            /**
             * Entry module of angular 2 app. Its always AppModule
             */
            entryModule : helpers.root(aotConfigs.entryModule),
        }),
        /**
         * Names for the common chunks
         */
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'shims', 'manifest'],
        }),
        /**
         * md5 hash is needed for cache busting
         */
        new WebpackMd5Hash(),
        /**
         * Generates a production ready html file from hbs
         */
        new HtmlWebpackPlugin({
            // Is needed for hbs template to generate imports for production
            isBuild       : environmentUtils.isBuild(),
            filename      : `${webpackEnvironment.index}.html`,
            template      : helpers.root(`${src}app/${webpackEnvironment.index}.hbs`),
            inject        : false,
            // sorts bundles by dependency for generating html out of hbs
            chunksSortMode: 'dependency',
        }),
        /**
         * A plugin for a more aggressive chunk merging strategy.
         * Even similar chunks are merged if the total size is reduced enough.
         */
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
                // if global libraries with specific variable names are used they need to be put here
                except: ['$super', '$', 'exports', 'require'],
            },
            beautify : false,
            comments : false,
        }),
    ],
};
