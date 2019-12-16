import { h } from 'hyperapp'

//effect to dispatch an action after the view has rendered once
const nextFrame = (f => a => [f, { a }])((d, { a }) =>
    requestAnimationFrame(_ => d(a))
)

const init = current => ({
    current,
    prev: null,
    transition: null,
    running: false,
})

const show = (state, { value, transition }) =>
    state.prev || !value
        ? state
        : !transition
        ? init(value)
        : [
              {
                  ...state,
                  current: value,
                  prev: state.current,
                  transition,
              },
              nextFrame(run),
          ]
const run = state => ({ ...state, running: true })

const finish = state => ({
    current: state.current,
    running: false,
    transition: null,
    prev: null,
})

const getEntering = state => (state.prev ? state.current : null)

const getLeaving = state => state.prev

const page = ({ state, entering, exiting }, content) => (
    <section
        class={{
            navPage: true,
            [state.transition + '-enter']: entering,
            [state.transition + '-exit']: exiting,
            [state.transition + '-run']: state.running,
        }}
        ontransitionend={entering ? finish : null}
    >
        {content}
    </section>
)

const view = ({ state, content }) => (
    <main class="navContainer">
        {state.transition &&
            page(
                {
                    state,
                    exiting: true,
                },
                content(state.prev)
            )}
        {state.transition &&
            page(
                {
                    state,
                    entering: true,
                },
                content(state.current)
            )}
        {!state.transition && page({ state }, content(state.current))}
    </main>
)

export { init, show, view, getEntering, getLeaving }
