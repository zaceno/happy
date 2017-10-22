export default {
    state: {
        current: 'initial',
        direction: null,
    },
    actions: {
        goTo: (state, actions, [current, direction], emit) => {
            emit('navigation:' + current)
            return ({current, direction})
        }
    }
}
