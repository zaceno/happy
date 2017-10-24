import './style/main.less'
import {app} from 'hyperapp'

//modules
import votes from './votes'
import navigation from './navigation'

//components
import AppContainer from './components/app-container'
import Pages from './pages/index.js'


const getModule = (name, state, actions) => ({state: state[name], actions: actions[name]})

app({
    modules: {votes, navigation},
    view: (state, actions) => AppContainer({}, Pages({
        votes: getModule('votes', state, actions),
        navigation: getModule('navigation', state, actions)
    }))
})
