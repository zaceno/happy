import { h, app } from 'hyperapp'
import * as map from './map'
import { init, navMap, navGet } from './model'
import * as nav from './nav'
import InitPage from './pages/init'
import StartPage from './pages/start'
import VotePage from './pages/vote'
import PassPage from './pages/pass'
import ResultPage from './pages/result'
import ClearedPage from './pages/cleared'

const PAGES = {
    init: InitPage,
    start: StartPage,
    vote: VotePage,
    pass: PassPage,
    result: ResultPage,
    cleared: ClearedPage,
}

app({
    init: init('init'),
    view: state =>
        map.view(
            navMap,
            <nav.view
                state={navGet(state)}
                render={p => map.pass(PAGES[p](state))}
            />
        ),
    node: document.querySelector('main'),
})
