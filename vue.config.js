var manifestJSON = require('./public/manifest.json')

module.exports = {
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      /* skipWaiting: 'false', */
      swSrc: './src/sw.js',
      swDest: 'service-worker.js'
    },
    themeColor: manifestJSON.theme_color,
    name: manifestJSON.short_name,
    msTileColor: manifestJSON.background_color
  },

  chainWebpack: config => {
    config.plugin('define').tap(args => {
      let v = JSON.stringify(require('./package.json').version)
      args[0]['process.env']['VERSION'] = v
      return args
    })
  }
}
