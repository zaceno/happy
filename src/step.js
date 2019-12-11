import * as model from './model/steps'
import ClearedPage from './pages/cleared'
import InitPage from './pages/initial'
import PassPage from './pages/pass'
import ResultPage from './pages/result'
import StartPage from './pages/start'
import VotePage from './pages/vote'

import Slide from './view/Slide'
import Container from './view/Container'

const getPage = step =>
    ({
        [model.steps.init]: InitPage,
        [model.steps.start]: StartPage,
        [model.steps.vote]: VotePage,
        [model.steps.pass]: PassPage,
        [model.steps.result]: ResultPage,
        [model.steps.cleared]: ClearedPage,
    }[step])

const view = (state, { data, map }) => {
    const current = model.getCurrent(state)
    const transition = model.getTransition(state)
    const transitionName =
        transition &&
        (transition.type === model.transitions.left
            ? 'slideLeft'
            : transition.type === model.types.right
            ? 'slideRight'
            : 'fade')

    return Container({}, [
        transition &&
            Slide(
                {
                    exiting: true,
                    running: transition.running,
                    transition: transitionName,
                },
                getPage(transition.prev)(data)
            ),
        transition &&
            Slide(
                {
                    entering: true,
                    running: transition.running,
                    transition: transitionName,
                    onend: map(model.finish),
                },
                getPage(current)(data)
            ),
        !transitionName && Slide({}, getPage(current)(data)),
    ])
}

export { view }
