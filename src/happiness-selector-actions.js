import $ from './dispatch-happiness-selector'

const Select = $((_, value) => value)
const Reset = $(_ => 0)
const Init = Reset

export { Init, Select, Reset }
