import { h } from 'hyperapp'

export default ({ onclick, text, extra, active }) =>
    h(
        'button',
        {
            class: { navButton: true, active },
            onmousedown: onclick,
            ontouchstart: onclick,
        },
        [
            //Chevron({ direction }),
            h('p', { class: 'extraText' }, extra),
            h('p', { class: 'mainText' }, text),
        ]
    )
