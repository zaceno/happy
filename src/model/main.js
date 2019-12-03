import map from 'hyperapp-map'
import * as poll from './poll'
import dispatch from '../lib/dispatch'
import nextFrame from '../lib/next-frame'

const steps = {
    init: Symbol('init-step'),
    start: Symbol('start-step'),
    vote: Symbol('vote-step'),
    pass: Symbol('pass-step'),
    result: Symbol('result-step'),
    cleared: Symbol('cleared-step'),
}

const transitions = {
    left: Symbol('left-transition'),
    right: Symbol('right-transition'),
    fade: Symbol('no-transition'),
}

const calculateTransitionType = (from, to) =>
    (from === steps.pass && to === steps.vote) ||
    (from === steps.cleared && to === steps.start)
        ? transitions.left
        : from === steps.result && to === steps.cleared
        ? transitions.fade
        : transitions.right

const getPoll = state => state.poll
const mapPoll = map(getPoll, (state, poll) => ({ ...state, poll }))

const go = (state, step) => [
    {
        ...state,
        step,
        transition: {
            prev: state.step,
            type: calculateTransitionType(state.step, step),
            running: false,
        },
    },
    nextFrame(runTransition),
    state.step === steps.vote && dispatch(mapPoll(poll.commit)),
    step === steps.cleared && dispatch(mapPoll(poll.reset)),
]

const runTransition = state => ({
    ...state,
    transition: { ...state.transition, running: true },
})

const endTransition = state => ({ ...state, transition: null })
const getTransition = state => state.transition
const getCurrent = state => state.step

const init = {
    step: steps.init,
    poll: poll.init,
}

export {
    steps,
    transitions,
    getTransition,
    endTransition,
    init,
    go,
    mapPoll,
    getPoll,
    getCurrent,
}
