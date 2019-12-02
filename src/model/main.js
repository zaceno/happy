import map from 'hyperapp-map'
import * as slides from './slides'
import * as poll from './poll'
import dispatch from '../lib/dispatch'

export const getPoll = state => state.poll
export const mapPoll = map(getPoll, (state, poll) => ({ ...state, poll }))
export const getSlides = state => state.slides
export const mapSlides = map(getSlides, (state, slides) => ({
    ...state,
    slides,
}))

const pages = {
    init: Symbol(),
    start: Symbol(),
    vote: Symbol(),
    pass: Symbol(),
    result: Symbol(),
    cleared: Symbol(),
}

export const init = initialSlide => ({
    slides: slides.init(initialSlide),
    poll: poll.init,
    page: pages.init,
})

const commitPoll = mapPoll(poll.commit)
const resetPoll = mapPoll(poll.reset)

const go = (state, page) => [
    { ...state, page },
    state.page === pages.vote && dispatch(commitPoll),
    page === pages.cleared && dispatch(resetPoll),
]
