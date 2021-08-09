const packageName = require("./package.json").name;
const baseUrl = process.env.VUE_APP_BASE_URL;
module.exports = {
  assetsDir: "./",
  outputDir: `../dist/child/${packageName}`,
  publicPath: process.env.NODE_ENV === "production" ? baseUrl : "/",
  configureWebpack: {
    output: {
      library: `${packageName}`,
      libraryTarget: "umd",
      jsonpFunction: `webpackJsonp_${packageName}`
    }
  },
  devServer: {
    // proxy: {
    //   '/wlh': {
    //     target: "http://127.0.0.1:3000",
    //     ws: true,
    //     changeOrigin: true,
    //     secure: false
    //   }
    // },
    port: process.env.VUE_APP_PORT,
    headers: {
      "Access-Control-Allow-Origin": "*" // 主应用获取子应用时跨域响应头
    }
  }
};
