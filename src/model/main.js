import map from 'hyperapp-map'
import * as slides from './slides'
import * as poll from './poll'

export const init = initialSlide => ({
    slides: slides.init(initialSlide),
    poll: poll.init,
})

export const getPoll = state => state.poll
export const mapPoll = map(getPoll, (state, poll) => ({ ...state, poll }))
export const getSlides = state => state.slides
export const mapSlides = map(getSlides, (state, slides) => ({
    ...state,
    slides,
}))
