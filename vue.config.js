const packageName = require("./package.json").name;
module.exports = {
  lintOnSave: false,
  outputDir: `../../dist/${packageName}`,
  publicPath: `./`,
  // publicPath: process.env.NODE_ENV === "production" ? `/${packageName}` : `/`,
  configureWebpack: {
    output: {
      library: `${packageName}`,
      libraryTarget: "umd",
      jsonpFunction: `webpackJsonp_${packageName}`,
    },
  },
  devServer: {
    port: process.env.VUE_APP_PORT,
    proxy: {
      "/monitor-app/api/": {
        target: "http://127.0.0.1:9000/",
        ws: true,
        changeOrigin: true,
        secure: false,
      },
    },
    headers: {
      "Access-Control-Allow-Origin": "*", // 主应用获取子应用时跨域响应头
    },
  },
};
