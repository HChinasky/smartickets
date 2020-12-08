const path = require('path')
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = 'SmartTicket - Кабінет пасажира';
        return args;
      });
  },
  
  configureWebpack: {   
    plugins: [
      //new BundleAnalyzerPlugin(),      
      new MomentLocalesPlugin({
        localesToKeep: ["uk", "ru"],
      }),
      new CompressionPlugin, 
    ],
  },
  pluginOptions: {
    i18n: {
      locale: "uk",
      fallbackLocale: "uk",
      localeDir: "locales",
      enableInSFC: false,
    },
    compression:{     
      gzip: {
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        include: /\.(js|css|html|svg|json|docx)(\?.*)?$/i,
        minRatio: 0.8,
      }
    }
  },  
  publicPath: "/"
};
