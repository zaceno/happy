const h = require('zx-app-utils/dom/h')
const transition = require('zx-app-utils/transition')
const {direction} = require('../model/navigation')
const NavButton = require('./navbutton')
const tx = transition.both(_ => ({name: 'slide-' + direction(), time: 350}))

module.exports = ({name, target, text, extra, onGo}, children) => tx(h(
    'div',
    {key: name, class: 'page'},
    [].concat(children, NavButton({target, text, extra, onGo}))
))