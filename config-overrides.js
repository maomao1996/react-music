const {
  override,
  addPostcssPlugins,
  addWebpackAlias
} = require('customize-cra')
const path = require('path')

module.exports = override(
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src')
  }),
  addPostcssPlugins([
    require('postcss-px-to-viewport')({
      viewportWidth: 1080,
      unitPrecision: 5,
      viewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      exclude: /node_modules/i
    })
  ])
)
