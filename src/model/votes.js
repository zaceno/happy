const store = require('./store')

//init store vote data
const initialState = {votes: {
    current: 0,
    sum: 0,
    count: 0
}}

store.init(state => Object.assign(state, initialState))

module.exports = {

    get: store.getter(state => state.votes.current),

    set: store.setter((state, val) => {
        state.votes.current = val
        return state
    }),

    commit: store.setter((state, val) => {
        state.votes.sum = state.votes.sum + state.votes.current
        state.votes.count = state.votes.count + 1
        state.votes.current = 0
        return state
    }),

    result: store.getter(state => {
        if (state.votes.count === 0) return 0
        return Math.round(10 * state.votes.sum / state.votes.count ) / 10
    }),

    reset: store.setter(state => Object.assign(state, initialState))
}
