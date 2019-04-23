const path = require('path');
const webpack = require('webpack');

module.exports = (env = {}) => ({
    entry: './src/app.js',
    output: {
        path: path.join(__dirname,'public'),
        filename: 'bundle.js',
        publicPath: env.PUBLIC_PATH || '/',
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192'
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.API_URI': JSON.stringify(env.API_URI || '127.0.0.1:3000'),
        }),
    ],
});
