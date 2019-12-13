import { h } from 'hyperapp'
import nextFrame from './lib/next-frame'

const init = page => ({
    current: page,
    prev: null,
    transition: null,
    running: false,
})

const go = (state, { to, direction }) => [
    {
        ...state,
        current: to,
        prev: state.current,
        transition: direction || 'fade',
    },
    nextFrame(run),
]
const run = state => ({ ...state, running: true })
const finish = state => ({
    current: state.current,
    running: false,
    transition: null,
    prev: null,
})

const getEntering = state => (state.prev ? state.current : null)

const getLeaving = state => state.prev

const button = (state, { to, direction, label, extra }) => (
    <button
        class={{
            navButton: true,
            active: state.current === to,
        }}
        onmousedown={[go, { to, direction }]}
        ontouchstart={[go, { to, direction }]}
    >
        <p class="extraText">{extra}</p>
        <p class="mainText">{label}</p>
    </button>
)

const page = ({ transition, running, entering, exiting }, content) => (
    <section
        class={{
            navPage: true,
            [transition + '-enter']: entering,
            [transition + '-exit']: exiting,
            [transition + '-run']: running,
        }}
        ontransitionend={entering ? finish : null}
    >
        {content}
    </section>
)

const view = ({ transition, running, prev, current }, lookup) => (
    <main class="navContainer">
        {transition &&
            page({ transition, running, exiting: true }, lookup(prev))}
        {transition &&
            page({ transition, running, entering: true }, lookup(current))}
        {!transition && page({}, lookup(current))}
    </main>
)

export { init, go, button, view, getEntering, getLeaving }
