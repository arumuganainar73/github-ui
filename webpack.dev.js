const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    devServer: {
        port: 8080,
        contentBase: path.join(__dirname, "dist")
    },
    node: {
        fs: "empty"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                targets: {
                                    browsers: ["last 2 chrome versions"]
                                },
                                corejs: "3.0.0",
                                useBuiltIns: "entry"
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        // creates style nodes from JS strings
                        loader: "style-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        // translates CSS into CommonJS
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        // compiles Sass to CSS
                        loader: "sass-loader",
                        options: {
                            outputStyle: "expanded",
                            sourceMap: true,
                            sourceMapContents: true
                        }
                    }
                    // Please note we are not running postcss here
                ]
            },
            {
                // Load all images as base64 encoding if they are smaller than 8192 bytes
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            // On development we want to see where the file is coming from, hence we preserve the [path]
                            name: "[path][name].[ext]?hash=[hash:20]",
                            limit: 8192
                        }
                    }
                ]
            },
            {
                // Load all icons
                test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                use: [
                    {
                        loader: "file-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            inject: true
        })
    ]
});
