module.exports = {
  entry: './src/main.js',
  output: {
    library: 'statdists',
    libraryTarget: 'umd',
    filename: 'dist/statdists.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        exclude: '/node_modules/',
        loader: 'babel-loader',
        query: {
          presets: ['env'],
        },
      },
    ],
  },
};