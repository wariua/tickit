module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  devServer: {
    proxy: 'http://ticket.interpark.com'
  },

  pluginOptions: {
    i18n: {
      locale: undefined,
      fallbackLocale: undefined,
      localeDir: undefined,
      enableInSFC: undefined
    }
  }
}
