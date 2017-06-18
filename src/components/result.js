const {h} = require('zx-app-utils/dom')
const model = require('../model')
module.exports = _ => h('p', {class: 'result-display'}, [model.votes.result() || ''])
