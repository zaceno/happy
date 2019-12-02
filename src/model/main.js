import map from 'hyperapp-map'
import * as poll from './poll'
import * as slides from './slides'
import dispatch from '../lib/dispatch'

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

const init = {
    slides: slides.init(steps.init),
    poll: poll.init,
}

const getPoll = state => state.poll
const mapPoll = map(getPoll, (state, poll) => ({ ...state, poll }))
const getSlides = state => state.slides
const mapSlides = map(getSlides, (state, slides) => ({ ...state, slides }))

const calculateTransition = (from, to) =>
    (from === steps.pass && to === steps.vote) ||
    (from === steps.cleared && to === steps.start)
        ? transitions.left
        : from === steps.result && to === steps.cleared
        ? transitions.fade
        : transitions.right

const go = (state, step) => [
    state,
    dispatch([
        mapSlides(slides.enter),
        {
            view: step,
            transition: calculateTransition(
                slides.getView(getSlides(state)),
                step
            ),
        },
    ]),
    state.step === steps.vote && dispatch(mapPoll(poll.commit)),
    step === steps.cleared && dispatch(mapPoll(poll.reset)),
]

export { steps, transitions, init, go, mapPoll, getPoll, mapSlides, getSlides }
