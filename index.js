import { app } from "https://unpkg.com/hyperapp"
import html from "https://unpkg.com/hyperlit"
import view from "./view.js"
import * as screen from "./screen.js"
import * as happiness from "./happiness.js"

// MODEL
const init = () => ({
    screen: screen.init("initial"),
    happiness: happiness.init(),
})

const _happiness = happiness.wire({
    getter: (x) => x.happiness,
    setter: (x, y) => ({ ...x, happiness: y }),
})

const _screen = screen.wire({
    getter: (x) => x.screen,
    setter: (x, y) => ({ ...x, screen: y }),
    onenter: (state, page) =>
        page === "clear" ? _happiness.clear(state) : state,
    onexit: (state, page) =>
        page === "vote" ? _happiness.commit(state) : state,
})

const pages = {
    initial: (state) => html` <p>Happiness Index Calculator</p>
        <${screen.navbutton}
            ${_screen.model(state)}
            to="start"
            direction="right"
            extra="Tap here to..."
            label="Start"
        />`,
    start: (state) => html` <p>Please pass the phone to the first person</p>
        <${screen.navbutton}
            ${_screen.model(state)}
            to="vote"
            direction="right"
            extra="When you're ready, tap here to..."
            label="Vote"
        />`,
    vote: (state) => html` <p>How happy are you about your job?</p>
        <${happiness.selector} ${_happiness.model(state)} />
        <${screen.navbutton}
            ${_screen.model(state)}
            to="pass"
            direction="right"
            extra="Make your selection, then tap here to..."
            label="Cast Vote"
        />`,
    pass: (state) => html` <${screen.navbutton}
            ${_screen.model(state)}
            to="result"
            direction="right"
            extra="Has everyone voted? Tap here to..."
            label="Check Results"
        />
        <p>Thank you! Now, please hand the phone to the next person</p>
        <${screen.navbutton}
            ${_screen.model(state)}
            to="vote"
            direction="left"
            extra="Are you the next person? Tap here to..."
            label="Vote"
        />`,
    result: (state) => html` <p>
            Happiness Index
            <${happiness.result} ${_happiness.model(state)} />
        </p>
        <${screen.navbutton}
            ${_screen.model(state)}
            to="clear"
            direction="right"
            extra="Need to do it again? Tap here to..."
            label="Clear Votes"
        />`,
    clear: (state) => html` <p>
            Memory cleared!
            <${happiness.result} ${_happiness.model(state)} />
        </p>
        <${screen.navbutton}
            ${_screen.model(state)}
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
            ..._screen.model(state),
            render: (page) => pages[page](state),
        }),
    node: document.body.querySelector("main"),
})
