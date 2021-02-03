module.exports = {
   publicPath: '',
   outputDir: '../static/',
   assetsDir: 'assets',
   indexPath: '../template/index.html',
   pwa: {
      //manifestPath: '../template/manifest.json',
      workboxPluginMode: 'InjectManifest',
      workboxOptions: {
            importWorkboxFrom: 'local',
            swSrc: './src/service-worker.js',
            //swDest: '../template/service-worker.js'
      }
   },
   chainWebpack: config => {
      config.plugins.delete('preload')
      config.plugins.delete('prefetch')
   },
   configureWebpack: {
      optimization: {
         splitChunks: {
            chunks: 'all'
         }
      }
   },
}
