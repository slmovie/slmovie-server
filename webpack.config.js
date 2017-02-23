var path = require('path');

module.exports = {
    entry: {
        index: path.resolve(__dirname, 'web/app/reactjs/index/index.js'),
        detail: path.resolve(__dirname, 'web/app/reactjs/detail/detail.js'),
        searchresult: path.resolve(__dirname, 'web/app/reactjs/searchresult/searchresult.js'),
    },
    output: {
        path: path.resolve(__dirname, "web/build"),
        filename: "[name].bundle.js"
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
        ]
    }
};