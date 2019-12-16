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

const go = (state, { to: value, direction: transition }) =>
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

const button = ({ state, to, direction, extra, label }) => (
    <button
        class={{
            navButton: true,
            [direction]: true,
            active: state.current === to,
        }}
        onmousedown={[go, { to, direction }]}
        ontouchstart={[go, { to, direction }]}
    >
        <div class={{ icon: true, hflip: direction === 'left' }}>
            <svg width="100%" height="100%" viewBox="-10 -20 20 40">
                <path
                    d="M -7 -17 L 7 0 L -7 17"
                    stroke-linecap="butt"
                    stroke-width="3"
                />
            </svg>
        </div>
        <p class="extraText">{extra}</p>
        <p class="mainText">{label}</p>
    </button>
)

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

const view = ({ state, render }) => (
    <main class="navContainer">
        {state.transition &&
            page(
                {
                    state,
                    exiting: true,
                },
                render(state.prev)
            )}
        {state.transition &&
            page(
                {
                    state,
                    entering: true,
                },
                render(state.current)
            )}
        {!state.transition && page({ state }, render(state.current))}
    </main>
)

export { init, button, view, getEntering, getLeaving }
