import { app } from 'hyperapp'
import logger from './util/logger'
import Body from './components/body'
import Immediate from './fx/immediate'
import InitPage from './pages/init'
import * as Nav from './navigation'
import * as Happiness from './happiness'
import * as Votes from './votes'

app(
    {
        init: [
            {},
            Immediate(Nav.Init, InitPage),
            Immediate(Happiness.Init),
            Immediate(Votes.Init),
        ],
        view: state => Body({}, Nav.Container(state)),
        node: document.body,
    },
    logger
)
