const webpack = require('webpack');
const helpers = require('./../helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');

const environmentUtils = require('./../environment-utils');
const environment = environmentUtils.getEnvironment();

/**
 * Webpack configuration
 *
 */
module.exports = webpackMerge(commonConfig, {

    /**
     * Developer tool to enhance debugging
     *
     */
    devtool: 'cheap-module-source-map',

    /**
     * Options affecting the output of the compilation.
     *
     */
    output: {

        /**
         * The output directory as absolute path (required).
         *
         */
        path: helpers.root(environment.dist),

        /**
         * Specifies the name of each output file on disk.
         * IMPORTANT: You must not specify an absolute path here!
         *
         */
        filename: '[name].[chunkhash].bundle.js',

        /**
         * The filename of the SourceMaps for the JavaScript files.
         * They are inside the output.path directory.
         *
         */
        sourceMapFilename: '[name].map',

        /** The filename of non-entry chunks as relative path
         * inside the output.path directory.
         *
         */
        chunkFilename: '[id].[chunkhash].chunk.js',

        library      : 'ac_[name]',
        libraryTarget: 'var'
    },

    plugins: [
        /**
         * Plugin: NamedModulesPlugin (experimental)
         * Description: Uses file names as module name.
         *
         */
        new NamedModulesPlugin(),
    ]

});
