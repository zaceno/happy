import { h as _h } from 'hyperapp'
import * as map from './lib/map'
const unmappableMap = map => action =>
    action._x ? action : map(((action._x = false), action))
const unMap = action => ((action._x = true), action)
const h = (tag, props, ...content) => {
    if (typeof tag !== 'function' || !props.map) return _h(tag, props, content)
    const ret = map.view(
        unmappableMap(props.map),
        _h(tag, props, map.view(unMap, content))
    )

    console.log('RET', ret)
    return ret
}

//given a map, can we make an unmappable, unmap pair?
//unmap takes actions and returns actions which

const nextFrame = (f => a => [f, { a }])((d, { a }) =>
    requestAnimationFrame(_ => d(a))
)

const navigation = (() => {
    const init = page => page
    const go = (state, to) => to
    const button = ({ to, label, extra }) => (
        <button
            class="navButton"
            onmousedown={[go, to]}
            ontouchstart={[go, to]}
        >
            <p class="extraText">{extra}</p>
            <p class="mainText">{label}</p>
        </button>
    )

    const view = ({ state }, content) => (
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
    const view = ({ state }) => (
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
    (state, counter) => ({ ...state, counter })
)
const counterMap = map.make(
    state => state.counter,
    (state, counter) => ({ ...state, counter })
)

const view = state =>
    state.nav === 'init' ? (
        <navigation.view state={state.nav} map={navMap}>
            <div class="message">Happiness Index Calculator</div>
            <counter.view state={state.counter} map={counterMap} />
            <navigation.button
                map={navMap}
                to="start"
                label="Start"
                extra="Tap here to..."
            />
        </navigation.view>
    ) : state.nav === 'start' ? (
        <navigation.view state={state.nav} map={navMap}>
            <div class="message">Please pass the phone to the first person</div>
            <navigation.button
                map={navMap}
                to="init"
                extra="When you're ready, tap here to..."
                label="Vote"
            />
        </navigation.view>
    ) : null

export { init, view }
