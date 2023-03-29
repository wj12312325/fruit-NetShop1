const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    lintOnSave: false,
    transpileDependencies: true,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8888'
            }
        },
        client: {
            webSocketURL: 'ws://0.0.0.0:8080/ws'
        }
    }
})