const path = require('path');

module.exports = {
  entry: './src/login.js', // Replace with your entry file
  output: {
    filename: 'bundle.js', // Output file name
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use babel-loader to transpile ES6+ syntax
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
