import Selector from './components/happiness-selector'

const Select = (state, x) => ({
    ...state,
    happiness: x,
})
const Init = (state, x) => ({
    ...state,
    happiness: 0,
})
const Value = state => state.happiness
const View = state => Selector({ value: state.happiness, set: Select })

export { Init, View, Value }
