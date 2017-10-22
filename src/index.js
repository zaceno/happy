import './style/main.less'
import {app as core} from 'hyperapp'
import events from 'hyperapp-events'
const app = events(core)

//modules
import votes from './votes'
import navigation from './navigation'

//components
import AppContainer from './components/app-container'
import pages from './pages/index.js'


app({
    modules: {votes, navigation},
    events: {
        'navigation:reset': (state, actions) => actions.votes.reset(),
        'navigation:pass': (state, actions) => actions.votes.commit(),
    },
    view: (state, actions) => AppContainer({}, [
        pages[state.navigation.current]({
            direction: state.navigation.direction,
            goTo: actions.navigation.goTo,
            votes: {state: state.votes, actions: actions.votes}
        })
    ])
})
