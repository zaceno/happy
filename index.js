import { app } from 'https://unpkg.com/hyperapp'
import html from 'https://unpkg.com/hyperlit?module'
import * as screen from './screen.js'
import * as happiness from './happiness.js'

// MODEL
const init = {
    screen: screen.init('initial'),
    happiness: happiness.init(),
}

const transf = {
    happiness: t => (state, data) => ({...state, happiness: t(state.happiness, data)}),
    screen: t => (state, data) => {
        if (t === screen.start) {
            if (state.screen.current === 'vote') state = transf.happiness(happiness.commit)(state)
            if (data.next === 'clear') state = transf.happiness(happiness.init)(state)
        }
        return {...state, screen: t(state.screen, data)}
    }
}


// VIEW

const pages = {
    initial: ({state, transf}) => html` <p>Happiness Index Calculator</p>
        <${screen.navbutton}
            state=${state.screen}
            transf=${transf.screen}
            to="start"
            direction="right"
            extra="Tap here to..."
            label="Start"
        />`,
    start: ({state, transf}) => html` <p>Please pass the phone to the first person</p>
        <${screen.navbutton}
            state=${state.screen}
            transf=${transf.screen}
            to="vote"
            direction="right"
            extra="When you're ready, tap here to..."
            label="Vote"
        />`,
    vote: ({state, transf}) => html` <p>How happy are you about your job?</p>
        <${happiness.selector} state=${state.happiness} transf=${transf.happiness} />
        <${screen.navbutton}
            state=${state.screen}
            transf=${transf.screen}
            to="pass"
            direction="right"
            extra="Make your selection, then tap here to..."
            label="Cast Vote"
        />`,
    pass: ({state, transf}) => html` <${screen.navbutton}
            state=${state.screen}
            transf=${transf.screen}
            to="result"
            direction="right"
            extra="Has everyone voted? Tap here to..."
            label="Check Results"
        />
        <p>Thank you! Now, please hand the phone to the next person</p>
        <${screen.navbutton}
            state=${state.screen}
            transf=${transf.screen}
            to="vote"
            direction="left"
            extra="Are you the next person? Tap here to..."
            label="Vote"
        />`,
    result: ({state, transf}) => html` <p>
            Happiness Index
            <${happiness.result} state=${state.happiness} transf=${transf.happiness} />
        </p>
        <${screen.navbutton}
            state=${state.screen}
            transf=${transf.screen}
            to="clear"
            direction="right"
            extra="Need to do it again? Tap here to..."
            label="Clear Votes"
        />`,
    clear: ({state, transf}) => html` <p>
            Memory cleared!
            <${happiness.result} state=${state.happiness} transf=${transf.happiness} />
        </p>
        <${screen.navbutton}
            state=${state.screen}
            transf=${transf.screen}
            to="start"
            direction="left"
            extra="Tap here to..."
            label="Start Again"
        />`,
}

// RUN

app({
    init,
    view: (state) =>
        screen.slides({
            state: state.screen,
            transf: transf.screen,
            render: page => pages[page]({state, transf}),
        }),
    node: document.body.querySelector('main'),
})
