const Store = require('zx-app-utils/store')

function directionFromTo (from, to) {
    if (from === 'reset' && to === 'start') return 'back'
    if (from === 'pass' && to === 'vote') return 'back'
    return 'forward'
}

const store = new Store ({
    navigation: {
        current: 'initial',
        previous: null
    },
    votes: {
        vote: 0,
        sum: 0,
        count:0
    }
})

module.exports = {
    store,
    votes: {
        get: store.getter(state => state.votes.vote),
        set: store.setter((state, value) => {
            state.votes.vote = value
            return state
        }),
        commit: store.setter(state => {
            state.votes.sum += state.votes.vote
            state.votes.count += 1
            state.votes.vote = 0
            return state
        }),
        result: store.getter(state => {
            if (state.votes.count === 0) return 0
            return Math.round(10 * state.votes.sum / state.votes.count) / 10
        }),
        reset: store.setter(state => {
            state.votes = {
                vote:0,
                sum: 0,
                count: 0
            }
            return state
        })
    },
    navigation: {
        page: store.getter(state => state.navigation.current),
        go: store.setter((state, target) => {
            state.navigation.previous = state.navigation.current
            state.navigation.current = target
            return state
        }),
        direction: store.getter(state =>
            directionFromTo(
                state.navigation.previous,
                state.navigation.current
            )
        ),
        directionTo: store.getter((state, target) =>
            directionFromTo(
                state.navigation.current,
                target
            )
        )
    }
}
