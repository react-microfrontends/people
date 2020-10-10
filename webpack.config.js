const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

class StandalonePlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap("StandalonePlugin", (compilation) => {
      HTMLWebpackPlugin.getHooks(compilation).alterAssetTags.tap(
        "StandalonePlugin",
        (data) => {
          const appName = "@react-mf/people";
          const mainSrc = "./" + data.assetTags.scripts[0].attributes.src;
          const activeWhen = "/people";

          const importMap = {
            imports: {
              [appName]: mainSrc,
            },
          };

          const pluginRuntime = `
          System.import('single-spa').then(singleSpa => {
            singleSpa.registerApplication({
              name: '${appName}',
              app: () => System.import('${mainSrc}'),
              activeWhen: '${activeWhen}'
            });

            if (!window.location.pathname.startsWith('${activeWhen}')) {
              singleSpa.navigateToUrl('${activeWhen}');
            }

            singleSpa.start();
          });
        `;

          data.assetTags.scripts.splice(0, 1);
          data.assetTags.scripts.push({
            tagName: "script",
            voidTag: false,
            attributes: {
              type: "systemjs-importmap",
              src: "https://react.microfrontends.app/importmap.json",
            },
          });
          data.assetTags.scripts.push({
            tagName: "script",
            voidTag: false,
            attributes: { type: "systemjs-importmap" },
            innerHTML: JSON.stringify(importMap, null, 2),
          });
          data.assetTags.scripts.push({
            tagName: "script",
            voidTag: false,
            attributes: {
              defer: false,
              src: "https://cdn.jsdelivr.net/npm/systemjs/dist/system.js",
            },
          });
          data.assetTags.scripts.push({
            tagName: "script",
            voidTag: false,
            attributes: {
              defer: false,
              src: "https://cdn.jsdelivr.net/npm/systemjs/dist/extras/amd.js",
            },
          });
          data.assetTags.scripts.push({
            tagName: "script",
            voidTag: false,
            attributes: {
              defer: false,
              src:
                "https://cdn.jsdelivr.net/npm/systemjs/dist/extras/named-exports.js",
            },
          });
          data.assetTags.scripts.push({
            tagName: "script",
            voidTag: false,
            innerHTML: pluginRuntime,
          });
        }
      );
    });
  }
}

module.exports = (webpackConfigEnv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "react-mf",
    projectName: "people",
    webpackConfigEnv,
  });

  const config = webpackMerge.smart(defaultConfig, {
    // customizations go here
    devServer: {
      historyApiFallback: true,
    },
    plugins: [new HTMLWebpackPlugin(), new StandalonePlugin()],
    externals: [/^rxjs\/?.*$/],
  });

  return config;
};
