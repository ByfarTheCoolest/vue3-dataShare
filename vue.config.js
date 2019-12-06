module.exports = {
    baseUrl: './',
    productionSourceMap: false,
    configureWebpack: {
        externals: {
            "BMap": "BMap"
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://jsonplaceholder.typicode.com',
                changeOrigin: true,
                pathRewrite: {
                    '/api': ''
                }
            },
            '/weather': {
                target: 'https://www.tianqiapi.com/api/',
                changeOrigin: true,
                pathRewrite: {
                    '^/weather': ''
                }
            },
            '/nodes': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/nodes': ''
                }
            }
        },
        // host: '192.168.42.20',
        host: '0.0.0.0',
        port: 8080, // 设置端口号
        https: false, // https:{type:Boolean}
        open: false, //配置自动启动浏览器
        disableHostCheck: true
    },

}