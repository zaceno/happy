import { current, select, average } from './model/poll'
import Result from './view/result'
import Poll from './view/poll'

const poll = state => Poll({ value: current(state), set: select })

const result = state => Result(average(state))

export { result, poll }
