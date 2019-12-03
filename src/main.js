import * as model from './model/main'

import Container from './view/container'
import ClearedPage from './pages/cleared'
import InitPage from './pages/initial'
import PassPage from './pages/pass'
import ResultPage from './pages/result'
import StartPage from './pages/start'
import VotePage from './pages/vote'

const init = model.init

const getPage = step =>
    ({
        [model.steps.init]: InitPage,
        [model.steps.start]: StartPage,
        [model.steps.vote]: VotePage,
        [model.steps.pass]: PassPage,
        [model.steps.result]: ResultPage,
        [model.steps.cleared]: ClearedPage,
    }[step])

const view = state => {
    const transition = model.getTransition(state)
    const type = transition && transition.type
    const transitionName =
        type && type === model.transitions.left
            ? 'slideLeft'
            : type === model.transitions.right
            ? 'slideRight'
            : 'fade'

    return Container({}, [
        transition &&
            getPage(transition.prev)(state, {
                exiting: true,
                running: transition.running,
                transition: transitionName,
            }),
        transition &&
            getPage(model.getCurrent(state))(state, {
                entering: true,
                running: transition.running,
                transition: transitionName,
                onend: model.endTransition,
            }),
        !transition && getPage(model.getCurrent(state))(state, {}),
    ])
}

export { init, view }
