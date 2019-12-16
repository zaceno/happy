import { h } from 'hyperapp'
import * as map from './map'
import * as nav from './nav'
import * as poll from './poll'

//effect which dispatches another action immediately
const dispatch = (f => a => [f, { a }])((d, { a }) => a && d(a))

const init = page => ({
    nav: nav.init(page),
    poll: poll.init,
})

const pollGet = state => state.poll
const pollMap = map.make(pollGet, (state, poll) => ({ ...state, poll }))
const navGet = state => state.nav
const navMap = map.make(navGet, (state, navState) => [
    { ...state, nav: navState },
    nav.getLeaving(navState) === 'vote' && dispatch(pollMap(poll.commit)),
    nav.getEntering(navState) === 'cleared' && dispatch(pollMap(poll.reset)),
])

const NavButton = props =>
    map.view(navMap, <nav.button {...props} state={navGet(props.state)} />)

const NavView = ({ state, render }) =>
    map.view(
        navMap,
        <nav.view state={navGet(state)} render={p => map.pass(render(p))} />
    )

const PollResult = ({ state }) => (
    <p class="happinessResult">
        <poll.result state={pollGet(state)} />
    </p>
)

const PollSelector = ({ state }) =>
    map.view(pollMap, <poll.selector state={pollGet(state)} />)

const Page = ({}, content) => content

const Panel = ({}, content) => <div class="message">{content}</div>

export { init, NavButton, NavView, PollResult, PollSelector, Page, Panel }
