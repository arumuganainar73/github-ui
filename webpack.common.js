const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const buildPath = path.resolve(__dirname, "dist");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "[name].[hash:20].js",
        path: buildPath
    },
    node: {
        fs: "empty"
    }
};
