import html from 'https://unpkg.com/hyperlit?module'
import nextFrame from './next-frame.js'

// MODEL


const init = (current) => ({ current, mode: 'idle', next: null, type: null })
const start = (state, {next, type}) => state.mode !== 'idle' ? state : { ...state, next, type, mode: 'started' }
const run = state => state.mode !== 'started' ? state : { ...state, mode: 'running' }
const finish = state => state.mode !== 'running' ? state : { mode: 'idle', current: state.next, next: null, type: null }



// ACTIONS

const GoTo = (state, { transf, to, direction }) => [
    transf(start)(state, { next: to, type: direction }),
    nextFrame([RunTransition, {transf}]),
]
const RunTransition = (state, {transf}) => transf(run)(state)
const TransitionEnd = (state, {transf}) => transf(finish)(state)


//VIEWS

const slides = ({ state, transf, render }) =>
    state.mode !== 'idle'
        ? html`<main>
              <section
                  class="${state.type}-exit"
                  ontransitionend=${[TransitionEnd, {transf}]}
              >
                  ${render(state.current)}
              </section>
              <section
                  class=${{
                      [state.type + '-enter']: true,
                      [state.type + '-run']: state.mode === 'running',
                  }}
              >
                  ${render(state.next)}
              </section>
          </main>`
        : html`<main>
              <section>
                  ${render(state.current)}
              </section>
          </main>`

const navbutton = ({
    state,
    transf,
    to,
    direction,
    extra,
    label,
}) => html` <button
    class=${{
        navbutton: true,
        'navbutton-active': state.next === to,
    }}
    onmousedown=${[GoTo, { transf, direction, to }]}
    ontouchstart=${[GoTo, { transf, direction, to }]}
>
    <svg
        class=${{
            chevron: true,
            'chevron-left': direction === 'left',
            'chevron-right': direction === 'right',
        }}
        viewBox="-10 -20 20 40"
    >
        <path d="M -7 -17 L 7 0 L -7 17" />
    </svg>
    <p class="navbutton-extra">${extra}</p>
    <p class="navbutton-label">${label}</p>
</button>`


export {init, start, navbutton, slides}