const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
module.exports = {
  entry: {
    bundle: "./src/index.ts",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
      },
      {
        test: /.scss$/,
        use: [
          "raw-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, "node_modules")],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/assets",
          to: "assets",
        },
        {
          from: "src/articles",
          to: "articles",
        },
      ],
    }),
  ],
  // plugins: [
  //     new webpack.optimize.UglifyJsPlugin({
  //       sourceMap: true,
  //       comments: saveLicense
  //     })
  //   ],
  //   devtool: '#source-map'
};
