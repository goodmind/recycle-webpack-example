const { resolve, join } = require('path')
const webpack = require('webpack')
const source = resolve(process.cwd(), 'src')
const build = resolve(process.cwd(), 'build')

const BabiliPlugin = require('babili-webpack-plugin')

const plugins = [
  new webpack.DllPlugin({
    name: '[name]',
    path: join(build, '[name].json')
  })
]

if (process.env.NODE_ENV === 'production')
  plugins.push(new BabiliPlugin({
    comments: false
  }))

const config = {
  context: source,
  entry: {
    React: [
      'react',
      'react-dom'
    ]
  },

  output: {
    path: build,
    filename: '[name].dll.js',
    library: '[name]'
  },
  plugins
}

module.exports = config
