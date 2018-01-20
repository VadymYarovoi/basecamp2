const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const PATHS = {
    app: path.join(__dirname, 'frontend'),
    build: path.join(__dirname, 'public')
};

module.exports = {
    entry: PATHS.app,
    output: {
        path: PATHS.build,
        filename: 'index.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env']
                    }
                }
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                minimize: true,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("index.css")
    ]
};