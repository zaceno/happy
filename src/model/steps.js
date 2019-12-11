import * as transitionModel from './transition'

// steps is an extension of transitions, with predetermined steps,
// and transitions between them.

const steps = {
    init: Symbol('init-step'),
    start: Symbol('start-step'),
    vote: Symbol('vote-step'),
    pass: Symbol('pass-step'),
    result: Symbol('result-step'),
    cleared: Symbol('cleared-step'),
}

const transitions = {
    left: Symbol('transition-left'),
    right: Symbol('transition-right'),
    fade: Symbol('transition-fade'),
}

const calculateTransitionType = (from, to) =>
    (from === steps.pass && to === steps.vote) ||
    (from === steps.cleared && to === steps.start)
        ? transitions.left
        : from === steps.result && to === steps.cleared
        ? transitions.fade
        : transitions.right

const init = transitionModel.init(steps.init)
const getCurrent = state => transitionModel.getValue(state)
const getTransition = state => transitionModel.getTransition(state)
const go = (state, step) =>
    transitionModel.set(state, {
        value: step,
        type: calculateTransitionType(getCurrent(state), step),
    })
export { init, steps, transitions, getCurrent, getTransition, go }
