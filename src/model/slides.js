import nextFrame from '../lib/next-frame'

export const init = view => ({ view, transition: null, mode: 'idle' })
export const go = (state, { view, transition }) =>
    state.mode !== 'idle'
        ? state
        : [
              {
                  view: view,
                  mode: 'start',
                  prev: state.view,
                  transition,
              },
              nextFrame(run),
          ]
const run = state => ({ ...state, mode: 'run' })
export const finish = (state, { view }) =>
    state.view !== view ? state : { ...state, mode: 'idle', prev: null }

export const isExiting = (state, view) =>
    state.prev === view && state.mode !== 'idle'
export const isEntering = (state, view) =>
    state.view === view && state.mode !== 'idle'
export const isRunning = state => state.mode === 'run'
export const transitionName = state => state.transition
export const getView = (state, data) => state.view && state.view(data)
export const getPrev = (state, data) => state.prev && state.prev(data)
