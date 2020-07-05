import { app } from 'https://unpkg.com/hyperapp'
import html from 'https://unpkg.com/hyperlit?module'
import view from './view.js'
import * as screen from './screen.js'
import * as happiness from './happiness.js'

// MODEL
const init = {
    screen: screen.init('initial'),
    happiness: happiness.init(),
}

const map = {
    happiness: (t) => (state, data) => ({ ...state, happiness: t(state.happiness, data) }),
    screen: (t) => (state, data) => {
        if (t === screen.start) {
            if (state.screen.current === 'vote') state = map.happiness(happiness.commit)(state)
            if (data.next === 'clear') state = map.happiness(happiness.init)(state)
        }
        return { ...state, screen: t(state.screen, data) }
    }
}


// VIEW

const pages = {
    initial: (state) => [
        html` <p>Happiness Index Calculator</p>`,
        view(map.screen, screen.navbutton, state, {
            to: 'start',
            direction: 'right',
            extra: 'Tap here to...',
            label: 'Start',
        }),
    ],
    start: (state) => [
        html` <p>Please pass the phone to the first person</p>`,
        view(map.screen, screen.navbutton, state, {
            to: 'vote',
            direction: 'right',
            extra: "When you're ready, tap here to...",
            label: 'Vote',
        }),
    ],
    vote: (state) => [
        html` <p>How happy are you about your job?</p>`,
        view(map.happiness, happiness.selector, state),
        view(map.screen, screen.navbutton, state, {
            to: 'pass',
            direction: 'right',
            extra: 'Make your selection, then tap here to...',
            label: 'Cast Vote',
        }),
    ],
    pass: (state) => [
        view(map.screen, screen.navbutton, state, {
            to: 'result',
            direction: 'right',
            extra: 'Has everyone voted? Tap here to...',
            label: 'Check Results',
        }),
        html`<p>Thank you! Now, please hand the phone to the next person</p>`,
        view(map.screen, screen.navbutton, state, {
            to: 'vote',
            direction: 'left',
            extra: 'Are you the next person? Tap here to...',
            label: 'Vote',
        }),
    ],
    result: (state) => [
        html`<p>
            Happiness Index ${view(map.happiness, happiness.result, state)}
        </p>`,
        view(map.screen, screen.navbutton, state, {
            to: 'clear',
            direction: 'right',
            extra: 'Need to do it again? Tap here to...',
            label: 'Clear Votes',
        }),
    ],
    clear: (state) => [
        html` <p>
            Memory cleared! ${view(map.happiness, happiness.result, state)}
        </p>`,
        view(map.screen, screen.navbutton, state, {
            to: 'start',
            direction: 'left',
            extra: 'Tap here to...',
            label: 'Start Again',
        }),
    ],
}

// RUN

app({
    init,
    view: (state) => view(map.screen, screen.slides, state, { render: (page) => pages[page](state) }),
    node: document.body.querySelector('main'),
})
