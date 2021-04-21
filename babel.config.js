module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["module-resolver", {
      "alias": {
        "@assets": "./src/assets",
        "@common": "./src/common",
        "@components": "./src/components"
      }
    }],
    ["@babel/plugin-proposal-decorators", { "legacy": true }]
  ]
};
