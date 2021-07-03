const path = require("path")

module.exports = {
  transpileDependencies: [ "vuex-persist" ],

  pwa: {
    name: "Messenger",
    workboxOptions: {
      runtimeCaching: [{
        urlPattern: new RegExp(process.env.VUE_APP_API_URL),
        handler: "networkFirst",
        options: {
          networkTimeoutSeconds: 20,
          cacheName: "api-cache",
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      }]
    },
    msTileColor: "#ffffff"
  },

  chainWebpack: config => {
    const types = ["vue-modules", "vue", "normal-modules", "normal"]
    types.forEach(type => addStyleResource(config.module.rule("stylus").oneOf(type)))

    config.plugins.delete("prefetch")
  },

  devServer: {
    host: "0.0.0.0"
  }
}

function addStyleResource (rule) {
  rule.use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [
        path.resolve(__dirname, "./src/assets/styles/main.styl"),
      ]
    })
}
