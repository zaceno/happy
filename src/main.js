import { h as _h } from 'hyperapp'
const h = (tag, props, children, vnode = _h(tag, props, children)) => props.map ? props.map(vnode) : vnode

const navigation = (() => {

    const init = x => x

    const current = x => x
    const set = x => x

    const button = ({page, text, extra }) => (
        <button
            class="navButton"
            onmousedown={[set, page]}
            ontouchstart={[set, page]}
        >
            <p class="extraText">{extra}</p>
            <p class="mainText">{text}</p>
        </button>
    )

    const 

    return { button, current }
})()


const init = {

}

const view = state => (
    <main class="navContainer">
        <section class="navPage">
            <div class="message">Happiness Index Calculator</div>
            <button
                class="navButton"
                onmousedown={goToStart}
                ontouchstart={goToStart}
            >
                <p class="extraText">Tap here to ...</p>
                <p class="mainText">Start</p>
            </button>
        </section>
    </main>
)

export { init, view }
