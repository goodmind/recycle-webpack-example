const { resolve, join } = require('path')

const source = resolve(process.cwd(), 'src')
const app = resolve(source, 'app')
const build = resolve(process.cwd(), 'build')

const reactDll = require(join(build, 'React.json'))
const vendorDll = require(join(build, 'Vendor.json'))

const isProd = process.env.NODE_ENV === 'production'

const rules = [
  {
    test: /\.tsx?$/,
    enforce: 'pre',
    loader: 'tslint-loader',
    options: {
      failOnHint: true
    }
  }, {
    enforce: 'pre',
    test: /\.js$/,
    loader: 'source-map-loader'
  }, {
    enforce: 'pre',
    test: /\.tsx?$/,
    loader: 'source-map-loader'
  }, {
    test: /\.tsx?$/,
    // loader: 'react-hot-loader!ts'
    exclude: /node_modules/,
    use: [
      'babel-loader',
      'ts-loader'
    ]
  }
]

const unifiedConfig = {
  node: {
    fs: 'empty',
    net: 'empty'
  },
  context: source,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [
      source,
      'app',
      'node_modules',
    ]
  },

  output: {
    path: build,
    publicPath: '/',
    filename: 'bundle.js',
    pathinfo: true
  },

  module: {
    rules
  }
}

const getConfig = () => isProd ? require('./prod') : require('./dev')

module.exports = Object.assign(unifiedConfig, getConfig())
