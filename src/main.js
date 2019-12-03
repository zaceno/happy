import * as model from './model/main'
import ClearedPage from './pages/cleared'
import InitPage from './pages/initial'
import PassPage from './pages/pass'
import ResultPage from './pages/result'
import StartPage from './pages/start'
import VotePage from './pages/vote'
import * as transition from './transition'
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

const view = state =>
    transition.view(model.getTransition(state), {
        map: model.mapTransition,
        content: step => getPage(step)(state),
    })

export { init, view }
