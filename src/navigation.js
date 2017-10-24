export default {
    state: {
        current: 'initial',
        direction: null,
    },
    actions: {
        goTo: (state, actions, [current, direction]) => ({current, direction})
    }
}
