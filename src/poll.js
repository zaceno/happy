import { current, select, average, commit, init, reset } from './model/poll'
import _result from './view/result'
import _poll from './view/poll'

const poll = state => _poll({ value: current(state), set: select })

const result = state => _result(average(state))

export { init, reset, commit, poll, result }
