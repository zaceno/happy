import * as main from './model/main'
import * as slides from './model/slides'

import Container from './view/container'

import ClearedPage from './pages/cleared'
import InitPage from './pages/initial'
import PassPage from './pages/pass'
import ResultPage from './pages/result'
import StartPage from './pages/start'
import VotePage from './pages/vote'

const init = model.init

const getTransitionName = (
    slideState,
    transition = slides.getTransition(slideState)
) =>
    transition === main.transitions.left
        ? 'slideLeft'
        : main.transitions.right
        ? 'slideRight'
        : main.transitions.fade
        ? 'fade'
        : null

const getPage = step =>
    ({
        [main.steps.init]: InitPage,
        [main.steps.start]: StartPage,
        [main.steps.vote]: VotePage,
        [main.steps.pass]: PassPage,
        [main.steps.result]: ResultPage,
        [main.steps.cleared]: ClearedPage,
    }[step])

const getPrev = (slideState, x = slides.getPrev(slideState)) => x && getPage(x)
const getCurrent = (slideState, x = slides.getView(slideState)) =>
    x && getPage(x)

const view = state => {
    const slideState = main.getSlides(state)
    const Prev = getPrev(slideState)
    const Current = getCurrent(slideState)
    const running = slides.getRunning(slideState)
    const transition = getTransitionName(slideState)
    return Container(
        {},
        transition
            ? [
                  Prev(state, { exiting: true, running, transition }),
                  Current(state, { entering: true, running, transition }),
              ]
            : Current(state, {})
    )
}

export { init, view }
