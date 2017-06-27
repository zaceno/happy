const hyperx = require('hyperx')
const {h} = require('hyperapp')
const html = hyperx(h, {attrToProp: false})
const Icon = require('./icon')

const options = [
    {
        value: 0,
        icon: 'noFace',
        label: 'No Vote',
        extra: 'I don\'t want to participate.'
    },
    {
        value: 5,
        icon: 'veryHappyFace',
        label: 'Very Happy',
        extra: 'It should always be this way!'
    },
    {
        value: 4,
        icon: 'happyFace',
        label: 'Happy',
        extra: 'It can always get better!'
    },
    {
        value: 3,
        icon: 'uncertainFace',
        label: 'Don\'t know',
        extra: 'Meh... / Mixed feelings'
    },
    {
        value: 2,
        icon: 'unhappyFace',
        label: 'Unhappy',
        extra: 'A lot needs to change!'
    },
    {
        value: 1,
        icon: 'veryUnhappyFace',
        label: 'Very Unhappy',
        extra: 'Why even bother...'
    }
]





module.exports = ({value:current, set}) => html`<ul class="option-selector">
    ${options.map(({value, icon, label, extra}) => html`
    <li
        onmousedown=${_ => set(value)}
        ontouchstart=${_ => set(value)}
        class=${(value === current ? 'active' : '')}
    >
        ${Icon({name:icon})}
        <p class="label">${label}</p>
        <p class="extra">${extra}</p>
    </li>
    `)}
</ul>`