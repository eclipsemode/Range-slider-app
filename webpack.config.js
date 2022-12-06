const PugPlugin = require("pug-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = (env, argv) => {
  const isDev = argv.mode !== "production";

  return {
    mode: isDev ? "development" : "production",
    context: path.resolve(__dirname, "src"),
    entry: {
      // using pug-plugin the entry-point is Pug file
      // all assets (images, scss, ts, ...) must be loaded directly in Pug via require()
      index: "index.pug", // => dist/index.html
    },
    output: {
      filename: "assets/js/[name].bundle.[contenthash:8].js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    devtool: "inline-source-map",
    plugins: [
      new PugPlugin({
        pretty: isDev, // formatting of HTML for dev mode
        extractCss: {
          // output filename of CSS
          filename: "assets/css/[name].[contenthash:8].css",
        },
      }),
      new ESLintPlugin(),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.pug$/,
          loader: PugPlugin.loader, // the @webdiscus/pug-loader is already included in pug-plugin
          options: {
            basedir: path.resolve(__dirname, "src"),
            // pretty: true, // DEPRECATED, not works here
          },
        },
        {
          test: /\.s[ac]ss|css$/i,
          use: ["css-loader", "sass-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/images/[hash][ext][query]",
          },
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },

    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      compress: true,
      open: true, // open in default browser
      // enable HMR for Pug, scss, ts, etc..
      watchFiles: {
        paths: ["src/**/*.*"],
        options: {
          usePolling: true,
        },
      },
    },
  };
};
