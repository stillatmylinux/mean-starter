var webpack = require('webpack');
var helpers = require('./helpers');

module.exports = {
    entry: {
        'app': './assets/app/main.ts'
    },

    resolve: {
        extensions: ['.js', '.ts']
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: [{ loader: 'html-loader' }]
            },
            {
                test: /\.css$/,
                use: [{ loader: 'raw-loader' }]
            },
            {
                // Load component styles here. When loaded with styleUrls in component, string of styles expected.
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: ['css-to-string-loader','css-loader','sass-loader']
            }
        ],
        exprContextCritical: false
    }
};