const packageName = require("./package.json").name;

module.exports = {
  assetsDir: "./",
  outputDir: `../../dist/${packageName}`,
  publicPath: process.env.NODE_ENV === "production" ? `/${packageName}` : `/`,
  configureWebpack: {
    output: {
      library: `${packageName}`,
      libraryTarget: "umd",
      jsonpFunction: `webpackJsonp_${packageName}`,
    },
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
      "Access-Control-Allow-Origin": "*", // 主应用获取子应用时跨域响应头
    },
  },
};
