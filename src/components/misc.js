const {h} = require('zx-app-utils/dom')
const hyperx = require('hyperx')
const html = hyperx(h, {attrToProp: false})
const Icon = require('./icon')

const AppContainer = ({page}) => html`<div class="app-container">${page}</div>`

const Panel = (props, children) => html`<div class="panel">${children}</div>`

const Button = ({cls, active, activate}, children) => html`
    <button
        class="${cls} ${active ? 'active' : ''}"
        ontouchstart=${activate}
        onmousedown=${activate}
    >
        ${children}
    </button>`

const Chevron = ({direction}) => Icon({
    name: 'chevron',
    effect: ((direction === 'back') ? 'hflip' : '')
})

module.exports = {
    AppContainer,
    Panel,
    Button,
    Chevron
}