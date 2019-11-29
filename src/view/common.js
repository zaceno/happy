import { h } from 'hyperapp'
import { mapVNode } from 'hyperapp-map'
import { pollGet, pollMap, screenMap, screenGet } from '../model'
import * as screens from '../screens'
import * as poll from '../poll'
import css from './style.css'

const Chevron = ({ direction }) => (
    <svg class={[css.chevron, css[direction]]} viewBox="-10 -20 20 40">
        <path d="M -7 -17 L 7 0 L -7 17" />
    </svg>
)

const NavButton = (
    { state, to, direction, extra, label },
    _,
    go = [screenMap(screens.show), { value: to, transition: direction }]
) => (
    <button
        class={[
            css.navButton,
            css[direction],
            { [css.active]: screens.getEntering(screenGet(state)) === to },
        ]}
        onmousedown={go}
        ontouchstart={go}
    >
        <Chevron {...{ direction }} />
        <p class={css.extra}>{extra}</p>
        <p class={css.label}>{label}</p>
    </button>
)

const PollResult = ({ state }) => mapVNode(pollMap, poll.result(pollGet(state)))

const PollSelector = ({ state }) =>
    mapVNode(pollMap, poll.selector(pollGet(state)))

const Page = ({}, content) => content

const Panel = ({}, content) => <div class={css.panel}>{content}</div>

export { NavButton, PollResult, PollSelector, Page, Panel }
