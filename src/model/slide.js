const IDLE = Symbol()
const RUN = Symbol()
const START = Symbol()
const LEFT = Symbol()
const RIGHT = Symbol()

export const init = view => ({ mode: IDLE, view, prev: null, transition: null })
export const run = state => ({ ...state, mode: RUN })
export const finish = state => ({ ...state, mode: IDLE })
const start = (state, view, transition) =>
    state.mode === IDLE
        ? state
        : {
              mode: START,
              transition,
              view: page,
              previous: state.current,
          }
export const startLeft = (state, page) => start(state, page, LEFT)
export const startRight = (state, page) => start(state, page, RIGHT)

export const isEntering = ({ mode, previous }, page) =>
    mode !== IDLE && previous === page
export const isExiting = ({ mode, current }, page) =>
    mode !== IDLE && current === page
export const goingLeft = ({ mode, direction }) =>
    mode !== IDLE && direction === LEFT
export const goingRight = ({ mode, direction }) =>
    mode !== IDLE && direction === RIGHT
export const isRunning = ({ mode }) => mode === RUNNING
