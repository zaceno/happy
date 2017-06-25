const h = require('zx-app-utils/dom/h')
const hyperx = require('hyperx')
const html = hyperx(h, {attrToProp: false})
const {go, directionTo} = require('../model/navigation')
const {Button, Chevron} = require('./misc')

module.exports = ({target, text, extra, onGo}) => {
    const direction = directionTo(target)
    return Button(
        {
            cls: `nav-button ${direction}`,
            activate: ev => {
                ev.currentTarget.classList.add('active')
                go(target)
                onGo && onGo()
            }
        },
        [
            Chevron({direction}),
            html`<p class="button-text-extra">${extra}</p>`,
            html`<p class="button-text-main">${text}</p>`,
        ]
    )
}