import { h, app } from 'hyperapp'
import { init, NavView } from './main'

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
    view: state => <NavView state={state} render={p => PAGES[p](state)} />,
    node: document.querySelector('main'),
})
