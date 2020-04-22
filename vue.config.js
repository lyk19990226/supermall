module.exports = {
    configureWebpack: {
        resolve: {
            alias: {//这里的@已经默认配置成src了
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        }
    }
}