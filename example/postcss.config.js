const postcssThemeColor = require('../lib/bundle.cjs.min.js')
const config = {
  groups: {
    G01: ['C01', 'C02'],
    G02: ['C03', 'C04'],
  },
  colors: {
    C01: 'red',
    C02: 'blue',
    C03: '#ff9501',
    C04: '#fff501',
  },
}
module.exports = {
  plugins: [postcssThemeColor(config), require('postcss-nested')],
}
