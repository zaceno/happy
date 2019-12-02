import { h } from 'hyperapp'

export default ({ onclick, text, extra }) =>
    h(
        'button',
        {
            class: 'navButton',
            onmousedown: onclick,
            ontouchstart: onclick,
        },
        [
            //Chevron({ direction }),
            h('p', { class: 'extraText' }, extra),
            h('p', { class: 'mainText' }, text),
        ]
    )
