import * as poll from './poll'
import * as slides from './slides'
import { h } from 'hyperapp'
import * as map from './lib/map'
import dispatch from './lib/dispatch'

const init = { slides: slides.init('init'), poll: poll.init }

const pollMap = map.make(
    state => state.poll,
    (state, poll) => ({ ...state, poll })
)

const slideMap = map.make(
    state => state.slides,
    (state, slideState) => [
        { ...state, slides: slideState },
        slides.getLeaving(slideState) === 'vote' &&
            dispatch(pollMap(poll.commit)),
        slides.getEntering(slideState) === 'cleared' &&
            dispatch(pollMap(poll.reset)),
    ]
)

const NavButton = (
    state,
    { to, direction, extra, label },
    go = slideMap([slides.go, { to, direction }]),
    active = slides.getEntering(state.slides) === to
) =>
    h(
        'button',
        {
            class: {
                navButton: true,
                active,
            },
            onmousedown: go,
            ontouchstart: go,
        },
        [
            h('p', { class: 'extraText' }, extra),
            h('p', { class: 'mainText' }, label),
        ]
    )

const pages = {
    init: state => [
        <div class="message">Happiness Index Calculator</div>,

        NavButton(state, {
            to: 'start',
            direction: 'right',
            extra: 'Tap here to...',
            label: 'Start',
        }),
    ],

    start: state => [
        <div class="message">Please pass the phone to the first person</div>,

        NavButton(state, {
            direction: 'right',
            to: 'vote',
            extra: "When you're ready, tap here to...",
            label: 'Vote',
        }),
    ],

    vote: state => [
        h('div', { class: 'message' }, ['How happy are you about your job?']),
        map.view(pollMap, poll.selector(state.poll)),
        NavButton(state, {
            direction: 'right',
            to: 'pass',
            extra: 'Make your selection, then tap here to...',
            label: 'Cast Vote',
        }),
    ],

    pass: state => [
        NavButton(state, {
            direction: 'right',
            to: 'result',
            extra: 'Has everyone voted? Tap here to...',
            label: 'Check Result',
        }),
        h(
            'div',
            { class: 'message' },
            'Thank you! Now, please hand the phone to the next person.'
        ),
        NavButton(state, {
            direction: 'left',
            to: 'vote',
            extra: 'Are you the next person? Tap here to...',
            label: 'Vote',
        }),
    ],

    result: state => [
        h('div', { class: 'message' }, [
            'Happiness Index:',
            map.view(pollMap, poll.result(state.poll)),
        ]),
        NavButton(state, {
            direction: 'right',
            to: 'cleared',
            extra: 'Need to do it again? Tap here to...',
            label: 'Reset Votes',
        }),
    ],

    cleared: state => [
        h('div', { class: 'message' }, [
            'All votes cleared from memory!',
            map.view(pollMap, poll.result(state.poll)),
        ]),
        NavButton(state, {
            to: 'start',
            direction: 'left',
            extra: 'Tap here to...',
            label: 'Start Again',
        }),
    ],
}

const view = state =>
    map.view(
        slideMap,
        slides.view(state.slides, page => map.pass(pages[page](state)))
    )

export { init, view }
