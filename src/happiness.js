import * as actions from './actions/select'
import Selector from './components/happiness-selector'

const Select = (state, x) => ({
    ...state,
    happiness: actions.select(state.happiness, x),
})
const Init = (state, x) => ({
    ...state,
    happiness: actions.reset(state.happiness),
})
const Value = state => state.happiness
const View = ({ state }) => Selector({ value: Value(state), set: Select })

export { Init, View, Value }
