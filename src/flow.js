import { h } from 'hyperapp'
import * as map from './map'
import * as slides from './slides'

const init = slides.init('init')

const getSlides = state => state.slides

const slideMap = map.make(getSlides, (state, slideState) => [
    { ...state, slides: slideState },
    slides.getLeaving(slideState) === 'vote' && dispatch(pollMap(poll.commit)),
    slides.getEntering(slideState) === 'cleared' &&
        dispatch(pollMap(poll.reset)),
])

const goto = slideMap(slides.show)

const page = ({}, content) => map.pass(content)

const button = ({ state, to, direction, extra, label }) => (
    <button
        class={{
            navButton: true,
            [direction]: true,
            active: slides.getEntering(getSlides(state)) === to,
        }}
        onmousedown={[goto, { value: to, transition: direction }]}
        ontouchstart={[goto, { value: to, transition: direction }]}
    >
        <div class={{ icon: true, hflip: direction === 'left' }}>
            <svg width="100%" height="100%" viewBox="-10 -20 20 40">
                <path
                    d="M -7 -17 L 7 0 L -7 17"
                    stroke-linecap="butt"
                    stroke-width="3"
                />
            </svg>
        </div>
        <p class="extraText">{extra}</p>
        <p class="mainText">{label}</p>
    </button>
)
