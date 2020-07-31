import html from "https://unpkg.com/hyperlit"
import nextFrame from "./next-frame.js"

// MODEL

const init = (current) => ({ current, mode: "idle", next: null, type: null })
const start = (state, { next, type }) =>
    state.mode !== "idle" ? state : { ...state, next, type, mode: "started" }
const run = (state) =>
    state.mode !== "started" ? state : { ...state, mode: "running" }
const finish = (state) =>
    state.mode !== "running"
        ? state
        : { mode: "idle", current: state.next, next: null, type: null }

const wire = ({ getter, setter, onenter, onexit }) => {
    const map = (f) => (x, y) => setter(x, f(getter(x), y))
    const GoTo = (state, { to, direction }) => [
        onexit(
            onenter(map(start)(state, { next: to, type: direction }), to),
            getter(state).current,
        ),
        nextFrame(RunTransition),
    ]
    const RunTransition = map(run)
    const TransitionEnd = map(finish)
    const model = (state) => ({ ...getter(state), GoTo, TransitionEnd })
    return { model }
}
const slides = ({ mode, type, current, next, TransitionEnd, render }) =>
    mode !== "idle"
        ? html`<main>
              <section class="${type}-exit" ontransitionend=${TransitionEnd}>
                  ${render(current)}
              </section>
              <section
                  class=${{
                      [type + "-enter"]: true,
                      [type + "-run"]: mode === "running",
                  }}
              >
                  ${render(next)}
              </section>
          </main>`
        : html`<main>
              <section>
                  ${render(current)}
              </section>
          </main>`

const navbutton = ({ GoTo, next, to, direction, extra, label }) => html` <button
    class=${{
        navbutton: true,
        "navbutton-active": next === to,
    }}
    onmousedown=${[GoTo, { to, direction }]}
    ontouchstart=${[GoTo, { to, direction }]}
>
    <svg
        class=${{
            chevron: true,
            "chevron-left": direction === "left",
            "chevron-right": direction === "right",
        }}
        viewBox="-10 -20 20 40"
    >
        <path d="M -7 -17 L 7 0 L -7 17" />
    </svg>
    <p class="navbutton-extra">${extra}</p>
    <p class="navbutton-label">${label}</p>
</button>`

export { init, wire, navbutton, slides }
