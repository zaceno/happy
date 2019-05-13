import AfterRender from './fx/after-render'
import Immediate from './fx/immediate'
import $ from './dispatch-navigation'
import * as calc from './calcs/navigate'

const Navigate = $((state, props) => {
    if (state.mode !== 'idle') return state
    return [
        calc.start(state, props),
        AfterRender(RunTransition),
        props.onnavigate && Immediate(props.onnavigate),
    ]
})
const RunTransition = $(calc.run)
const EndTransition = $(calc.finish)
const Init = $(calc.reset)

export { Init, Navigate, EndTransition }
