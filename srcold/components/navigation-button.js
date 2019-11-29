import html from '../util/html'
import Chevron from './chevron'
export default ({ direction, onnavigate, active, text, extra }, children) =>
    html.button(
        {
            class: { navButton: true, active, [direction]: true },
            onmousedown: onnavigate,
            ontouchstart: onnavigate,
        },
        [
            Chevron({ direction }),
            html.p({ class: 'extraText' }, extra),
            html.p({ class: 'mainText' }, text),
        ]
    )
