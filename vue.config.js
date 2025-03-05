const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      // 没有分号会报错
      sass: {
        // data: '@import "@/assets/css/vars.scss";' //旧版sass-loader写法(8.0以下)
        additionalData: `@import "@/styles/variable.scss";` //新版scss-loader(8.0及以上)
      }
    }
  },
  devServer: {
    client: {
      overlay: false
    }
  }
});
