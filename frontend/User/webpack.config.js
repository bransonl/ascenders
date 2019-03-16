const path = require('path');

module.exports = {
    entry: './src/app.js',
//    entry: './src/admin-ticket.js',
    output: {
        path: path.join(__dirname,'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        },
     {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192' }]
    },
    devtool: 'cheap-module-eval-source-map'
};