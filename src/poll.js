import * as model from './model/poll'
import { mapPoll, getPoll } from './model/main'
import Result from './view/result'
import Poll from './view/poll'

const poll = state =>
    mapPoll(Poll({ value: model.current(getPoll(state)), set: model.select }))
const result = state => mapPoll(Result(model.average(getPoll(state))))

export { result, poll }
