import $ from './dispatch-main'

export default f =>
    $((state, payload) => {
        return { ...state, tally: f(state.tally, payload) }
    })
