import { app } from 'hyperapp'
import logger from './logger'
import html from './html'
import Immediate from './fx/immediate'
import InitPage from './pages/init'
import NavFrame from './navigation-container'
import { Init } from './main-actions'

app(
    {
        init: [{}, Immediate(Init, InitPage)],
        view: state => {
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
