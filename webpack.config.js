const path = require('path');
module.exports = {
    mode: 'development',
    entry: './dist/system.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
  };