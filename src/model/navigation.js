const store = require('./store')

function directionFromTo (from, to) {
    if (from === 'reset' && to === 'start') return 'back'
    if (from === 'pass' && to === 'vote') return 'back'
    return 'forward'
}

//init navigation state
store.init(state => Object.assign(state, {navigation: {
    current: 'initial',
    previous: null
}}))

module.exports = {
    direction:   store.getter(state => directionFromTo(state.navigation.previous, state.navigation.current)),

    directionTo: store.getter((state, page) => directionFromTo(state.navigation.current, page)),

    page: store.getter(state => state.navigation.current),

    go: store.setter((state, page) => {
        state.navigation.previous = state.navigation.current
        state.navigation.current = page
        return state
    }),
}
