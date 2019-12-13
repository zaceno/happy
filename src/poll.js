import { h } from 'hyperapp'

const options = [
    {
        value: 0,
        icon: 'noFace',
        label: 'No Vote',
        extra: "I don't want to participate.",
    },
    {
        value: 5,
        icon: 'veryHappyFace',
        label: 'Very Happy',
        extra: 'It should always be this way!',
    },
    {
        value: 4,
        icon: 'happyFace',
        label: 'Happy',
        extra: 'It can always get better!',
    },
    {
        value: 3,
        icon: 'uncertainFace',
        label: "Don't know",
        extra: 'Meh... / Mixed feelings',
    },
    {
        value: 2,
        icon: 'unhappyFace',
        label: 'Unhappy',
        extra: 'A lot needs to change!',
    },
    {
        value: 1,
        icon: 'veryUnhappyFace',
        label: 'Very Unhappy',
        extra: 'Why even bother...',
    },
]
export const init = { votes: 0, total: 0, current: 0 }

const select = ({ votes, total }, current) => ({ votes, total, current })

export const commit = ({ votes, total, current }) => ({
    votes: current > 0 ? votes + 1 : votes,
    total: current > 0 ? total + current : total,
    current: 0,
})
export const reset = _ => ({ ...init })

const option = ({ value, label, extra, icon }, selected) =>
    h(
        'li',
        {
            ontouchstart: [select, value],
            onmousedown: [select, value],
            class: { selected: selected === value },
        },
        [
            //Icon({ name: icon }),
            h('p', { class: 'mainText' }, label),
            h('p', { class: 'extraText' }, extra),
        ]
    )

export const selector = ({ current }) =>
    h(
        'ul',
        { class: 'happinessSelector' },
        options.map(o => option(o, current))
    )

export const result = ({ votes, total }) =>
    h(
        'p',
        { class: 'happinessResult' },
        votes ? Math.round((10 * total) / votes) / 10 : ''
    )
