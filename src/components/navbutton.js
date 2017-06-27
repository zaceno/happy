const {h} = require('hyperapp')
const hyperx = require('hyperx')
const html = hyperx(h, {attrToProp: false})
const Button = require('./button')
const Chevron = require('./chevron')

module.exports = ({goTo, target, direction, text, extra}) => {
    return Button(
        {
            cls: `nav-button ${direction}`,
            action: _ => goTo([target, direction]),
        },
        [
            Chevron({direction}),
            html`<p class="button-text-extra">${extra}</p>`,
            html`<p class="button-text-main">${text}</p>`,
        ]
    )
}