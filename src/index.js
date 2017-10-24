import './style/main.less'
import {app} from 'hyperapp'

//modules
import votes from './votes'
import navigation from './navigation'

//components
import AppContainer from './components/app-container'
import pages from './pages/index.js'


app({
    modules: {votes, navigation},
    view: (state, actions) => AppContainer({}, [
        pages[state.navigation.current]({
            goTo: ([page, direction]) => {
                if (page === 'reset') actions.votes.reset()
                if (page === 'pass') actions.votes.commit()
                actions.navigation.goTo([page, direction])
            },
            direction: state.navigation.direction,
            votes: {state: state.votes, actions: actions.votes},
        })
    ])
})
