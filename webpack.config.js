const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); 
const ExtractTextPlugin = require("extract-text-webpack-plugin"); 
const CptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); 
const ImageminPlugin = require("imagemin-webpack-plugin").default; 
const ManifestPlugin = require("webpack-manifest-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const { host, devPort,mockHost,mockPort } = require("./config");

module.exports = env => {
  //env 是npm script 运行webpack时传进来的  判断是否是开发环境
  const mode = (env && env.mode) || "development";
  const isDev = mode === "development";

  const options = {
    mode,
    target: "web",

    //开发服务器
    devServer: {
      //静态资源根目录
      contentBase: [
        path.resolve(__dirname, "dist"),
        path.resolve(__dirname, "rest-mock")
      ],
      port: devPort, //端口
      hot: true, //热更新
      inline: true, //iframe 模式
      historyApiFallback: true, //浏览器 history
      stats: {
        //统计
        colors: true, //输出有颜色的信息
        errors: true, //显示错误信息
        version: true, //显示版本号
        warnings: true, //显示警告
        progress: true, //显示进度,
        timings: true //显示时间
      },
      open: true, //打开浏览器 替代open-plugin 插件
      openPage: "",
      proxy: {
        '/api/*': {
          target: `${mockHost}:${mockPort}`,
          changeOrigin: true,
        },
        logLevel: 'debug',
      }
    
    },

    //入口
    entry: isDev
      ? [
          "react-hot-loader/patch", //热更新
          `webpack-dev-server/client?${host}:${devPort}`,
          "webpack/hot/only-dev-server",
          path.resolve(__dirname, "src/index.js")
        ]
      : {
          app: path.resolve(__dirname, "src/index.js")
        },

    //打包输出
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isDev ? "js/[name].js" : "js/[name].[chunkhash:8].js",
      chunkFilename: isDev ? "js/[name].js" : "js/[name].[chunkhash:8].js",
      publicPath: isDev ? `${host}:${devPort}/` : "/"
    },

    //模块加载器
    module: {
      rules: [
        {
          test: /\.js[x]?$/,
          use: [
            {
              loader: "babel-loader"
            }
          ],
          exclude: "/node_modules/",
          include: [path.resolve("src")] //只遍历src目录下的
        },
        {
          test: /\.less$/,
          use:
            mode === "development" //开发环境 css打包到js中
              ? [
                  { loader: "style-loader" }, //loader 倒序执行  先执行 less-loader
                  {
                    loader: "css-loader",
                    options: {
                      javascriptEnabled: true,
                      minimize: false,
                      sourceMap: true
                    }
                  },
                  {
                    loader: "postcss-loader",
                    options: { javascriptEnabled: true, sourceMap: true }
                  }, //自动加前缀
                  {
                    loader: "less-loader",
                    options: { javascriptEnabled: true, sourceMap: true }
                  }
                ]
              : ExtractTextPlugin.extract({
                  //生产环境 把css单独分离出来
                  fallback: "style-loader",
                  use: [
                    "css-loader",
                    { loader: "postcss-loader", options: { sourceMap: false } },
                    {
                      loader: "less-loader",
                      options: {
                        sourceMap: false
                      }
                    }
                  ]
                })
        },
        {
          test: /\.css$/,
          use: isDev
            ? [
                { loader: "style-loader" }, //loader 倒序执行  先执行 less-laoder
                {
                  loader: "css-loader",
                  options: {
                    javascriptEnabled: true,
                    minimize: false,
                    sourceMap: true
                  }
                },
                {
                  loader: "postcss-loader",
                  options: { javascriptEnabled: true, sourceMap: true }
                }
              ]
            : ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                  "css-loader",
                  {
                    loader: "postcss-loader",
                    options: { sourceMap: false }
                  },
                  {
                    loader: "less-loader",
                    options: {
                      sourceMap: false
                    }
                  }
                ]
              })
        },
        {
          test: /\.(jpg|jpeg|png|gif|cur|ico)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "images/[name][hash:8].[ext]" //遇到图片  生成一个images文件夹  名字.后缀的图片
              }
            }
          ]
        },
        {
          test: /\.(eot|ttf|svg|woff|woff2)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "fonts/[name][hash:8].[ext]"
              }
            }
          ]
        },
        {
          test: /\.json$/,
          use: "json-loader"
        }
      ]
    },

    //自动补全后缀
    resolve: {
      enforceExtension: false, //2.0 后 不能写 extensions :[""]
      extensions: [".js", ".jsx", ".json", ".less", ".css"], //比如 test.js   可以写成 require('test')
      modules: [
        path.resolve("src"), //比如 src/app/components/xx  可以写成 app/components/xx
        path.resolve("."),
        path.resolve("src/shared"),
        "node_modules"
      ]
    },

    //webpack4 相关升级配置
    optimization: {
      //代码分割
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all"
          },
          commons: {
            name: "commons",
            minChunks: 2,
            chunks: "initial"
          },
          styles: {
            name: "styles",
            test: /\.css$/,
            chunks: "all",
            minChunks: 2,
            enforce: true
          }
        }
      },
      runtimeChunk: {
        name: "runtime"
      },
      minimizer: isDev
        ? []
        : [
            new UglifyJsPlugin({
              cache: true,
              parallel: true,
              uglifyOptions: {
                compress: {
                  warnings: false,
                  drop_debugger: true,
                  drop_console: false
                }
              }
            }),
            new CptimizeCssAssetsPlugin({
              //压缩css  与 ExtractTextPlugin 配合使用
              cssProcessor: require("cssnano"),
              cssProcessorOptions: { discardComments: { removeAll: true } }, //移除所有注释
              canPrint: true //是否向控制台打印消息
            })
          ]
    },

    //插件
    plugins: []
  };
  //根据开发环境不同  concat 不同的插件
  if (isDev) {
    options.plugins = options.plugins.concat([
      new webpack.HotModuleReplacementPlugin() //热加载插件
    ]);
  } else {
    options.plugins = options.plugins.concat([
      new webpack.HashedModuleIdsPlugin(), //生成稳定的hashId 没有改变的chunk文件这样hash不会变
      new ExtractTextPlugin({
        // 将打包文件中的css分离成一个单独的css文件
        filename: "css/[name].[chunkhash:8].css",
        allChunks: true
      }),
      new webpack.LoaderOptionsPlugin({
        //laoder最小化
        minimize: true
      }),
      //图片压缩
      new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,
        pngquant: {
          quality: "90-100"
        }
      }),
      new ManifestPlugin()
    ]);
  }
  options.plugins.push(
    new HtmlWebpackPlugin({
      title: "react-project-template",
      filename: "index.html", //自动把打包的js文件引入进去
      template: path.resolve(__dirname, "src/index.html"), //模板文件
      hash: true, //添加hash码
    })
  );
  return options;
};
