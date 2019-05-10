import AfterRender from './fx-after-render'
import $ from './dispatch-navigation'

const StartTransition = $((state, { page, direction }) =>
    state.mode !== 'idle'
        ? state
        : [
              { ...state, mode: 'start', page, direction, prev: state.page },
              AfterRender(RunTransition),
          ]
)

const RunTransition = $(state => ({ ...state, mode: 'run' }))
const EndTransition = $(state => ({ ...state, mode: 'idle' }))

const Navigate = (state, { onnavigate, page, direction }) =>
    StartTransition(onnavigate ? onnavigate(state) : state, { direction, page })

const Init = $((state, page) => ({ ...state, page, mode: 'idle' }))

export { Init, Navigate, EndTransition }
