import { app } from 'hyperapp'
import logger from './logger'
import html from './html'
import Dispatch from './fx-dispatch'
import InitPage from './pages/init'
import NavFrame from './navigation-container'
import { Init } from './main-actions'

app(
    {
        init: [{}, Dispatch(Init, InitPage)],
        view: state => {
            console.log('VIEW', state)
            return html.body(
                {},
                NavFrame({
                    navigation: state.navigation,
                    happiness: state.happiness,
                    tally: state.tally,
                })
            )
        },
        node: document.body,
    },
    //*
    logger
    //*/
)
