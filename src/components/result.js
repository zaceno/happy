const h = require('zx-app-utils/dom/h')
const {result} = require('../model/votes')
module.exports = _ => h('p', {class: 'result-display'}, [result() || ''])
