const packageName = require("./package.json").name;
const path = require("path");
const { ContextReplacementPlugin } = require("webpack");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  assetsDir: "./",
  outputDir: `../../dist/${packageName}`,
  publicPath: process.env.NODE_ENV === "production" ? `/${packageName}` : `/`,
  configureWebpack: {
    output: {
      library: `${packageName}`,
      libraryTarget: "umd",
      jsonpFunction: `webpackJsonp_${packageName}`
    },
    //webpack 配置
    plugins: [
      //解决moment打包的时候把所有的语言都打包进去的问题
      // eslint-disable-next-line prettier/prettier
      new ContextReplacementPlugin(
        // eslint-disable-next-line no-useless-escape
        /moment[\\\/]locale$/,
        /^\.\/(zh-cn)$/
      )
    ]
  },
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .use("babel-loader")
      .loader("babel-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader");
    config.optimization.splitChunks({
      chunks: "all",
      cacheGroups: {
        "ant-design-vue": {
          name: "chunk-ant-design-vue", // split elementUI into a single package
          priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/ // in order to adapt to cnpm
        },
        lodash: {
          name: "chunk-lodash", // split elementUI into a single package
          priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]_?lodash(.*)/ // in order to adapt to cnpm
        },
        moment: {
          name: "chunk-moment", // split elementUI into a single package
          priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]_?moment(.*)/ // in order to adapt to cnpm
        },
        three: {
          name: "chunk-three", // split elementUI into a single package
          priority: 25, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]_?three(.*)/ // in order to adapt to cnpm
        },
        commons: {
          name: "chunk-commons",
          test: resolve("src/components"), // can customize your rules
          minChunks: 3, //  minimum common number
          priority: 5,
          reuseExistingChunk: true
        }
      }
    });
    config.optimization.runtimeChunk("single");
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
