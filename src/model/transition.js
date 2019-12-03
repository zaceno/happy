import nextFrame from '../lib/next-frame'

const init = current => ({ current, prev: null, running: false, type: null })

const types = {
    left: Symbol('left-transition'),
    right: Symbol('right-transition'),
    fade: Symbol('no-transition'),
}

const start = (state, { next, type }) => [
    { prev: state.current, current: next, type, running: false },
    nextFrame(run),
]
const run = state => ({ ...state, running: true })
const finish = state => ({
    current: state.current,
    prev: null,
    running: false,
    type: null,
})

export { init, types, start, finish }
