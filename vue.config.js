module.exports = {
  devServer: {
    port: 8888,
    proxy: {
      '/api': {
        target: 'http://10.207.198.5:8888',
        changeOrigin: true,
      },
    },
  },
}