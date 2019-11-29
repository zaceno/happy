import slide_ from './view/slide'
import * as model from './model/slide'

const slide = (state, thisPage) =>
    slide_(
        {
            exiting: model.exiting(state, thisPage),
            entering: model.entering(state, thisPage),
            running: model.isRunning(state),
            left: model.goingLeft(state),
            right: model.goingRight(state),
            ontransitionend: model.finish,
        },
        content
    )
