const { resolve } = require('path');

module.exports = {
  distFolder: resolve(__dirname, '../dist/browser'),
  indexHtml: resolve(__dirname, '../dist/browser/index.html'),
  port: process.env.PORT || 4000,
  host: process.env.HOST || 'localhost'
};
