const PATH = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',
    // 入口
    entry: {
        main: ['./src/javascripts/app'],
    },
    // 出口
    output: {
        filename: '[name].js',
        // 路径以配置文件为基准的
        path: PATH.resolve(__dirname, '../dev')
    },
    devServer: {
        // 让服务器从这两个目录中响应资源
        contentBase: [PATH.join(__dirname, "../dev")],
        compress: true,
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new CopyWebpackPlugin([{
            from: PATH.resolve(__dirname, '../static'),
            to:  PATH.resolve(__dirname, '../dev/static')
        }])
    ],
    module: {
        rules: [ 
            {
                test: /\.(css|scss)$/,
                use: [ // loader从后向前使用
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },                    
                    { loader: 'sass-loader' }                    
                ]
            },
            {
                test: /\.html$/,
                use: [ // loader从后向前使用
                    { loader: 'string-loader' }                
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192
                    }
                  }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-runtime']
                  }
                }
            }
        ]
    }
}
