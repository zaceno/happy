import map from 'hyperapp-map'
import * as transition from './transition'
import * as poll from './poll'
import dispatch from '../lib/dispatch'

const steps = {
    init: Symbol('init-step'),
    start: Symbol('start-step'),
    vote: Symbol('vote-step'),
    pass: Symbol('pass-step'),
    result: Symbol('result-step'),
    cleared: Symbol('cleared-step'),
}

const calculateTransitionType = (from, to) =>
    (from === steps.pass && to === steps.vote) ||
    (from === steps.cleared && to === steps.start)
        ? transition.types.left
        : from === steps.result && to === steps.cleared
        ? transition.types.fade
        : transition.types.right

const getPoll = state => state.poll
const mapPoll = map(getPoll, (state, poll) => ({ ...state, poll }))
const getTransition = state => state.transition
const mapTransition = map(getTransition, (state, transition) => ({
    ...state,
    transition,
}))

const getCurrent = state => getTransition(state).current

const go = (state, step) => [
    state,
    dispatch([
        mapTransition(transition.start),
        {
            next: step,
            type: calculateTransitionType(getCurrent(state), step),
        },
    ]),
    getCurrent(state) === steps.vote && dispatch(mapPoll(poll.commit)),
    step === steps.cleared && dispatch(mapPoll(poll.reset)),
]

const init = {
    poll: poll.init,
    transition: transition.init(steps.init),
}

export {
    steps,
    init,
    go,
    getCurrent,
    mapPoll,
    getPoll,
    getTransition,
    mapTransition,
}
