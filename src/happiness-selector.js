import html from '../html'
const { ul, li } = html
export default ({ value, set }) =>
    ul({ class: 'voter' }, [
        li({ onclick: [set, 0], class: { selected: value === 0 } }, 'Non vote'),
        li(
            { onclick: [set, 5], class: { selected: value === 5 } },
            'Very Happy'
        ),
        li({ onclick: [set, 4], class: { selected: value === 4 } }, 'Happy'),
        li(
            { onclick: [set, 3], class: { selected: value === 3 } },
            "Don't know"
        ),
        li({ onclick: [set, 2], class: { selected: value === 2 } }, 'Unhappy'),
        li(
            { onclick: [set, 1], class: { selected: value === 1 } },
            'Very Unhappy'
        ),
    ])
