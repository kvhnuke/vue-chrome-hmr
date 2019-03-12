/* eslint-disable key-spacing */

module.exports = {
  // paths
  outputDir: 'dist',
  productionSourceMap: false,

  devServer: {
  },

  // webpack
  configureWebpack: (config) => {
    // entry
    config.entry = './src/content/main.js'

    // remove hashes from filenames
    config.output.filename = 'scripts/app/[name].js'
    config.output.chunkFilename = 'scripts/app/[name].js'
  },

  chainWebpack: config => {
    // don't prefetch
    config.plugins.delete('prefetch')

    // ensure quotes in HTML
    // @see https://github.com/vuejs/vue-cli/issues/1108#issuecomment-405410896
    if (process.env.NODE_ENV === 'production') {
      config.plugin('html').init((Plugin, args) => {
        const newArgs = {
          ...args[0],
        }
        newArgs.minify.removeAttributeQuotes = false
        return new Plugin(newArgs)
      })
    }

    // remove hashes from filenames
    // @see https://github.com/vuejs/vue-cli/issues/1649#issuecomment-399136133
    if (config.plugins.has('extract-css')) {
      const extractCSSPlugin = config.plugin('extract-css')
      extractCSSPlugin && extractCSSPlugin.tap(() => [{
        filename: 'assets/css/[name].css',
        chunkFilename: 'assets/css/[name].css'
      }])
    }
  },
}
