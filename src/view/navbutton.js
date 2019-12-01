import { h } from 'hyperapp'

export default ({ direction, onnavigate, active, text, extra }) =>
    h(
        'button',
        {
            class: { navButton: true, active },
            onmousedown: onnavigate,
            ontouchstart: onnavigate,
        },
        [
            //Chevron({ direction }),
            h('p', { class: 'extraText' }, extra),
            h('p', { class: 'mainText' }, text),
        ]
    )
