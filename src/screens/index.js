import html from 'hyperlit'
import css from './style.css'

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

const Screen = ({ state, entering, exiting }, content) => html`
    <section
        class=${[
            css.navPage,
            {
                [css[state.transition + '-enter']]: entering,
                [css[state.transition + '-exit']]: exiting,
                [css[state.transition + '-run']]: state.running,
            },
        ]}
        ontransitionend=${entering ? finish : null}
    >
        ${content}
    </section>`


const view = (state, render) => html`
    <main class=${css.navContainer}>
        ${state.transition && html`
            <${Screen} state=${state} exiting=${true}>
                ${render(state.prev)}
            </${Screen}>`
        }
        ${state.transition && html`
            <${Screen} state=${state} entering=${true}>
                ${render(state.current)}
            <//>`
        }
        ${!state.transition && html`
            <${Screen} state=${state}>${render(state.current)}<//>`
        }
    </main>`

export { init, show, view, getEntering, getLeaving }
