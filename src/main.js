import { h } from 'hyperapp'
import * as poll from './poll'
import * as slides from './slides'
import * as map from './map'

//effect which dispatches another action immediately
const dispatch = (f => a => [f, { a }])((d, { a }) => a && d(a))

const init = { slides: slides.init('init'), poll: poll.init }

const getPoll = state => state.poll
const pollMap = map.make(getPoll, (state, poll) => ({ ...state, poll }))

const getSlides = state => state.slides
const slideMap = map.make(getSlides, (state, slideState) => [
    { ...state, slides: slideState },
    slides.getLeaving(slideState) === 'vote' && dispatch(pollMap(poll.commit)),
    slides.getEntering(slideState) === 'cleared' &&
        dispatch(pollMap(poll.reset)),
])

const Navigate = slideMap(slides.show)
const NavButton = ({ state, to, direction, extra, label }) => (
    <button
        class={{
            navButton: true,
            [direction]: true,
            active: slides.getEntering(getSlides(state)) === to,
        }}
        onmousedown={[Navigate, { to, direction }]}
        ontouchstart={[Navigate, { to, direction }]}
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

const Page = (_, content) => map.pass(content)

const pages = {
    init: state => (
        <Page>
            <div class="message">Happiness Index Calculator</div>
            <NavButton
                state={state}
                to="start"
                direction="right"
                extra="Tap here to..."
                label="Start"
            />
        </Page>
    ),

    start: state => (
        <Page>
            <div class="message">Please pass the phone to the first person</div>
            ,
            <NavButton
                state={state}
                to="vote"
                direction="right"
                extra="When you're ready, tap here to..."
                label="Vote"
            />
        </Page>
    ),

    vote: state => (
        <Page>
            <div class="message">How happy are you about your job?</div>
            {map.view(pollMap, poll.selector(getPoll(state)))}
            <NavButton
                state={state}
                direction="right"
                to="pass"
                extra="Make your selection, then tap here to..."
                label="Cast Vote"
            />
        </Page>
    ),

    pass: state => (
        <Page>
            <NavButton
                state={state}
                to="result"
                direction="right"
                extra="Has everyone voted? Tap here to..."
                label="Check Result"
            />
            <div class="message">
                Thank you! Now, please hand the phone to the next person.
            </div>
            <NavButton
                state={state}
                to="vote"
                direction="left"
                extra="Are you the next person? Tap here to..."
                label="Vote"
            />
        </Page>
    ),

    result: state => (
        <Page>
            <div class="message">
                Happiness Index:
                {map.view(pollMap, poll.result(getPoll(state)))}
            </div>
            <NavButton
                state={state}
                to="cleared"
                direction="right"
                extra="Need to do it again? Tap here to..."
                label="Reset Votes"
            />
        </Page>
    ),

    cleared: state => (
        <Page>
            <div class="message">
                All votes cleared from memory!
                {map.view(pollMap, poll.result(getPoll(state)))}
            </div>
            <NavButton
                state={state}
                to="start"
                direction="left"
                extra="Tap here to..."
                label="Start Again"
            />
        </Page>
    ),
}

const view = state =>
    map.view(
        slideMap,
        <slides.view
            state={state.slides}
            content={page => pages[page](state)}
        />
    )

export { init, view }