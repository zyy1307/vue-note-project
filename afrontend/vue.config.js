const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir) //path.join(__dirname)设置绝对路径
}
module.exports = {
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [path.resolve(__dirname, './src/assets/css/variable.scss')],
        },
    },
    chainWebpack: (config) => {
        config.resolve.alias.set('@', resolve('src'))
    },
}