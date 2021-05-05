const path = require("path")

module.exports = {
  transpileDependencies: [ "vuex-persist" ],

  chainWebpack: config => {
    const types = ["vue-modules", "vue", "normal-modules", "normal"]
    types.forEach(type => addStyleResource(config.module.rule("stylus").oneOf(type)))
  },

  devServer: {
    // host: "0.0.0.0"
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
