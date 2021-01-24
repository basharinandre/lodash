const path = require('path')
const HTMLWebpack = require('html-webpack-plugin')

module.exports = {
    // Перегон скриптов
    entry: './src/index.js',
    output: {
        filename: 'bunble.js',
        path: path.resolve(__dirname, 'dist')
    },
    // Перегон HTML
    plugins: [
        new HTMLWebpack({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    //DevServer
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 3000
    },    
    //Style
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.s[ac]ss$/i,
            use: [ "style-loader", "css-loader", "sass-loader" ],
          },
        ],
      },
}
