const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
var webpack = require("webpack");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.
  if (env.mode === "production") {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        path: "web-report",
      })
    );
  }

  return config;
};
