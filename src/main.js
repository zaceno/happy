import { h } from 'hyperapp'
import * as map from './lib/map'

const nextFrame = (f => a => [f, { a }])((d, { a }) =>
    requestAnimationFrame(_ => d(a))
)

const transition = (() => {
    const init = x => ({ current: x, running: false, previous: null })
    const start = (state, { next, name }) => [
        { current: next, previous: state.current, running: false, name },
        nextFrame(run),
    ]
    const run = state => ({ ...state, running: true })
    const finish = state => ({ ...state, running: false, previous: null })
    const current = ({ state, tag, className }, content) =>
        h(tag, {
            class: [
                className,
                {
                    entering: !!state.previous,
                    runnign,
                },
            ],
        })
    const previous = {}
})()

const navigation = (() => {
    const init = page => ({
        transition: transition.init(page),
    })

    //when go is called with page and direction,
    //we want to

    const button = ({ to, label, extra }) => (
        <button
            class="navButton"
            onmousedown={[go, to]}
            ontouchstart={[go, to]}
        >
            <p class="extraText">{extra}</p>
            <p class="mainText">{label}</p>
        </button>
    )

    const view = content => (
        <main class="navContainer">
            <section class="navPage">{content}</section>
        </main>
    )

    return { init, button, view }
})()

const init = { nav: navigation.init('init') }

const navMap = map.make(
    state => state.counter,
    (state, nav) => ({ ...state, nav })
)

const view = state =>
    map.view(
        navMap,
        navigation.view(
            map.pass(
                state.nav === 'init'
                    ? [
                          <div class="message">Happiness Index Calculator</div>,

                          map.view(
                              navMap,
                              navigation.button({
                                  to: 'start',
                                  extra: 'Tap here to...',
                                  label: 'Start',
                              })
                          ),
                      ]
                    : state.nav === 'start'
                    ? [
                          <div class="message">
                              Please pass the phone to the first person
                          </div>,

                          map.view(
                              navMap,
                              navigation.button({
                                  to: 'init',
                                  extra: "When you're ready, tap here to...",
                                  label: 'Vote',
                              })
                          ),
                      ]
                    : null
            )
        )
    )

export { init, view }
