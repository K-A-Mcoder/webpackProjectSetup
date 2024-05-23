const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { type } = require("os");

let mode = "development";
let target = "web";

if (process.env.NODE_ENV === "production") {
    mode = 'production';
    target = "browserslist"
}

const config = {
    mode: mode,
    target: target,

    output: {
        assetModuleFilename: "images/[hash][ext][query]",
    },

    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)/i,
                type: "asset/resource",
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: "" }
                    }
                    , "css-loader", "postcss-loader", "sass-loader"]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
    ],

    devtool: "source-map",
    devServer: {
        static: {
            directory: path.resolve(__dirname, './dist'),
        },
        port: 8080,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
};

module.exports = config;

