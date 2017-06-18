const {h} = require('zx-app-utils/dom')
const transition = require('zx-app-utils/transition')
const model = require('../model')
const NavButton = require('./navbutton')
const tx = transition.both(_ => ({name: 'slide-' + model.navigation.direction(), time: 350}))

module.exports = ({name, target, text, extra, onGo}, children) => tx(h(
    'div',
    {key: name, class: 'page'},
    [].concat(children, NavButton({target, text, extra, onGo}))
))