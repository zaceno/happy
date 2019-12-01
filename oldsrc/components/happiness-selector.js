import Icon from './icon'
import html from '../util/html'
const { ul, li, p } = html

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

export default ({ value, set }) =>
    ul(
        { class: 'happinessSelector' },
        options.map(opt =>
            li(
                {
                    ontouchstart: [set, opt.value],
                    onmousedown: [set, opt.value],
                    class: { selected: value === opt.value },
                },
                [
                    Icon({ name: opt.icon }),
                    p({ class: 'mainText' }, opt.label),
                    p({ class: 'extraText' }, opt.extra),
                ]
            )
        )
    )
