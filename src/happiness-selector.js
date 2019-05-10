import { Select } from './happiness-selector-actions'
import html from './html'
const { ul, li } = html
export default ({ value }) =>
    ul({ class: 'voter' }, [
        li(
            { onclick: [Select, 0], class: { selected: value === 0 } },
            'Non vote'
        ),
        li(
            { onclick: [Select, 5], class: { selected: value === 5 } },
            'Very Happy'
        ),
        li({ onclick: [Select, 4], class: { selected: value === 4 } }, 'Happy'),
        li(
            { onclick: [Select, 3], class: { selected: value === 3 } },
            "Don't know"
        ),
        li(
            { onclick: [Select, 2], class: { selected: value === 2 } },
            'Unhappy'
        ),
        li(
            { onclick: [Select, 1], class: { selected: value === 1 } },
            'Very Unhappy'
        ),
    ])
