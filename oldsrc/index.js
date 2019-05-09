import './style/main.less'
import {app} from 'hyperapp'

//modules
import * as votes from './votes'
import * as navigation from './navigation'

//components
import AppContainer from './components/app-container'
import Pages from './pages/index.js'



app(
    //STATE
    {
        votes: votes.state,
        navigation: navigation.state
    },

    //ACTIONS
    {
        votes: votes.actions,
        navigation: navigation.actions
    },

    //VIEW
    (state, actions) => AppContainer({}, Pages({
        votes: {state: state.votes, actions: actions.votes},
        navigation: {state: state.navigation, actions: actions.navigation}
    })),

    //CONTAINER
    document.body
)
