const {app} = require('hyperapp')
const AppContainer = require('./components/app-container')
const pages = require('./pages')

app({
    state: {
        votes: {
            current: 0,
            sum: 0,
            count: 0,
        },
        page: {
            current: 'initial',
            direction: null,
        }
    },
    actions: {
        goTo (state, actions, [current, direction], emit) {
            emit('goTo:' + current)
            state.page = {current, direction}
            return state
        },
        votes: {
            set (state, actions, vote) {
                state.votes.current = vote
                return state
            },
            commit (state) {
                if (state.votes.current === 0) return state
                state.votes.sum = state.votes.sum + state.votes.current
                state.votes.count = state.votes.count + 1
                state.votes.current = 0
                return state
            },
            reset (state) {
                state.votes.sum = 0
                state.votes.count = 0
                state.votes.current = 0
                return state
            }
        }
    },
    events: {
        'goTo:reset': (state, actions) => setTimeout(actions.votes.reset,0),
        'goTo:pass': (state, actions) => setTimeout(actions.votes.commit, 0)
    },
    view: (state, actions) => AppContainer({}, [pages[state.page.current](state, actions)])
})
