import * as model from './model/slides'
import dispatch from './lib/dispatch'
import { getSlides, mapSlides } from './model/main'
import Slide from './view/slide'
import SlideContainer from './view/container'
import NavButton from './view/navbutton'

const define = contentFn =>
    function self(state) {
        return Slide(
            {
                transitionName: model.transitionName(getSlides(state)),
                isEntering: model.isEntering(getSlides(state), self),
                isExiting: model.isExiting(getSlides(state), self),
                isRunning: model.isRunning(getSlides(state)),
                ontransitionend: [mapSlides(model.finish), { view: self }],
            },
            contentFn(state)
        )
    }

const view = state =>
    SlideContainer({}, [
        model.getPrev(getSlides(state), state),
        model.getView(getSlides(state), state),
    ])

const navbutton = (state, { text, extra, direction, page, onnavigate }) =>
    NavButton({
        text,
        extra,
        direction,
        active: model.isEntering(getSlides(state), page),
        onnavigate: x => [
            x,
            dispatch([
                mapSlides(model.go),
                {
                    view: page,
                    transition:
                        direction === 'left'
                            ? 'slideLeft'
                            : direction === 'right'
                            ? 'slideRight'
                            : 'fade',
                },
            ]),
            dispatch(onnavigate),
        ],
    })

const { init, go } = model
export { init, go, view, define, navbutton }
