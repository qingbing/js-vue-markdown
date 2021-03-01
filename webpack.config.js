// 引入 node 中的path模块，处理文件路径的小工具
const path = require('path');
// 引入 html 打包插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 1. 引入webpack, 热模块加载
const webpack = require('webpack');

// 导出一个webpack具有特殊属性配置的对象
module.exports = {
    /**
     * 指定环境，打包不会出现黄色警告
     *     - development 开发环境：只是整合，不会被压缩
     *     - production 生成环境：文件会被压缩
     *     - none 不匹配，不会被压缩
     */
    mode: 'development', // 'development' or 'production' or 'none'
    // 入口
    entry: './src/index.js',
    // 出口
    output: {
        // path : './dist/', // 路径最好不要用相对路径
        // 动态获取项目绝对路径
        path: path.join(__dirname, './dist/'),
        filename: 'main.js' // 文件名
    },
    // 实时重新加载
    devServer: {
        port: 8001, // 端口号，如果被占用，会自动提升1
        // 目标路径
        contentBase: './dist',
        // 开启热模块加载
        hot: true
    },
    // webpack --watch : 改动自助打包
    watchOptions: {
        poll: 1000,//监测修改的时间(ms)
        ignored: '/node_modules/',//不监测
    },
    plugins: [
        new HtmlWebpackPlugin({
            /**
             * 1. 指定要打包的模板页面
             * 2. 会将页面页面打包到和打包 js 的同级目录
             * 3. 同时，该打包页面会自动使用打包的 js 文件
             */
            template: './index.html'
        }),
        // 热加载模板插件
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        // 配置转换规则
        rules: [
            {
                // css 打包插件配置
                test: /\.css$/, // 正则表达式，匹配 .css 文件
                use: [
                    // 以下两个选项不能换
                    'style-loader', // js 识别css
                    'css-loader' // css 转换成 js
                ]
            },
            {
                // 图片资源（静态资源）打包配置
                test: /\.(png|jpg|jpeg|svg|gif)/,
                use: [
                    'file-loader', // 静态资源打包工具
                ]
            },
            // 解决浏览器兼容行问题
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/, // 排除的目录
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'] // babel 中内容的转换规则工具
                    }
                }
            },
            // 处理 .vue 单文件组件编译打包
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    }
};