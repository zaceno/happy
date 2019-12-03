import * as model from './model/transition'
import Slide from './view/Slide'
import Container from './view/Container'

const view = (state, { content, map }) => {
    const transitionName =
        state.type === model.types.left
            ? 'slideLeft'
            : state.type === model.types.right
            ? 'slideRight'
            : state.type === model.types.fade
            ? 'fade'
            : null

    return Container({}, [
        transitionName &&
            Slide(
                {
                    exiting: true,
                    running: state.running,
                    transition: transitionName,
                },
                content(state.prev)
            ),
        transitionName &&
            Slide(
                {
                    entering: true,
                    running: state.running,
                    transition: transitionName,
                    onend: map(model.finish),
                },
                content(state.current)
            ),
        !transitionName && Slide({}, content(state.current)),
    ])
}

export { view }
