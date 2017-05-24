const { resolve, join } = require('path')
const webpack = require('webpack')
const source = resolve(process.cwd(), 'src')
const build = resolve(process.cwd(), 'build')

const reactDll = require(join(build, 'React.json'))
const vendorDll = require(join(build, 'Vendor.json'))

const config = {
  devtool: 'source-map',
  cache: true,
  devServer: {
    hot: true,
    historyApiFallback: true,
    contentBase: build,
    publicPath: '/',
    port: 8875
  },
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://localhost:8889',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './client.tsx',
  ],

  plugins: [
    new webpack.DllReferencePlugin({
      context: source,
      manifest: reactDll
    }),
    new webpack.DllReferencePlugin({
      context: source,
      manifest: vendorDll
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = config
