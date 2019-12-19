import { h } from 'hyperapp'
import { mapVNode } from 'hyperapp-map'
import { pollGet, pollMap, screenMap, screenGet } from './model'
import * as screens from './screens'
import * as poll from './poll'

const NavButton = (
    { state, to, direction, extra, label },
    _,
    go = [screenMap(screens.show), { value: to, transition: direction }]
) => (
    <button
        class={{
            navButton: true,
            [direction]: true,
            active: screens.getEntering(screenGet(state)) === to,
        }}
        onmousedown={go}
        ontouchstart={go}
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

const PollResult = ({ state }) => (
    <p class="happinessResult">
        <poll.result state={pollGet(state)} />
    </p>
)

const PollSelector = ({ state }) =>
    mapVNode(pollMap, <poll.selector state={pollGet(state)} />)

const Page = ({}, content) => content

const Panel = ({}, content) => <div class="message">{content}</div>

export { NavButton, PollResult, PollSelector, Page, Panel }
