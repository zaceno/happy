import $ from './dispatch-main'
export default f =>
    $((state, payload) => ({
        ...state,
        happiness: f(state.happiness, payload),
    }))
