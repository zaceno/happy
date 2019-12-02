import nextFrame from '../lib/next-frame'

export const init = view => ({ view, transition: null, mode: 'idle' })
export const start = (state, { view, transition }) =>
    state.mode !== 'idle'
        ? state
        : [
              {
                  view: view,
                  prev: state.view,
                  running: false,
                  transition,
              },
              nextFrame(run),
          ]
const run = state => ({ ...state, running: true })
export const finish = state => ({
    view: state.view,
    prev: null,
    transition: null,
    running: false,
})

export const getRunning = ({ running }) => running
export const getTransition = ({ transition }) => transition
export const getView = ({ view }) => view
export const getPrev = ({ prev }) => prev
