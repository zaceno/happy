import { h } from 'hyperapp'
import * as map from './lib/map'

const nextFrame = (f => a => [f, { a }])((d, { a }) =>
    requestAnimationFrame(_ => d(a))
)

const navigation = (() => {
    const init = page => page
    const go = (state, to) => to
    const button = (state, { to, label, extra }) => (
        <button
            class="navButton"
            onmousedown={[go, to]}
            ontouchstart={[go, to]}
        >
            <p class="extraText">{extra}</p>
            <p class="mainText">{label}</p>
        </button>
    )

    const view = (state, props, content) => (
        <main class="navContainer">
            <section class="navPage">{content}</section>
        </main>
    )

    return { init, button, view }
})()

const counter = (() => {
    const init = 7
    const incr = x => x + 1
    const decr = y => y - 1
    const view = state => (
        <p>
            <button onclick={decr}>-</button>
            {state}
            <button onclick={incr}>+</button>
        </p>
    )
    return { init, view }
})()

const init = { nav: navigation.init('init'), counter: counter.init }

const navMap = map.make(
    state => state.counter,
    (state, nav) => ({ ...state, nav })
)

const counterMap = map.make(
    state => state.counter,
    (state, counter) => ({ ...state, counter })
)

const view = state =>
    state.nav === 'init'
        ? map.view(
              navMap,
              navigation.view(
                  state.nav,
                  {},
                  map.unmap([
                      <div class="message">
                          Happiness Index Calculator
                          {map.view(counterMap, counter.view(state.counter))}
                      </div>,

                      map.view(
                          navMap,
                          navigation.button(state.nav, {
                              to: 'start',
                              extra: 'Tap here to...',
                              label: 'Start',
                          })
                      ),
                  ])
              )
          )
        : state.nav === 'start'
        ? map.view(
              navMap,
              navigation.view(
                  state.nav,
                  {},
                  map.unmap([
                      <div class="message">
                          Please pass the phone to the first person
                      </div>,
                      map.view(
                          navMap,
                          navigation.button(state.nav, {
                              to: 'init',
                              extra: "When you're ready, tap here to...",
                              label: 'Vote',
                          })
                      ),
                  ])
              )
          )
        : null

export { init, view }
