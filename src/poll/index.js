import Selector from './selector'
import Result from './result'
import * as model from './model'

export const selector = ({ current }) =>
    Selector({ select: model.select, value: current })

export const result = state => Result({ value: model.result(state) })

export const { commit, reset, init } = model
