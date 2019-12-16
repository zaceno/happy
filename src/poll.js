import { h } from 'hyperapp'

const init = { votes: 0, total: 0, current: 0 }

const select = ({ votes, total }, current) => ({
    votes,
    total,
    current,
})

const commit = ({ votes, total, current }) => ({
    votes: current > 0 ? votes + 1 : votes,
    total: current > 0 ? total + current : total,
    current: 0,
})

const reset = _ => ({ ...init })

const optionProps = (value, current) => ({
    ontouchstart: [select, value],
    onmousedown: [select, value],
    class: { selected: current === value },
})

const selector = ({ state: { current } }) => (
    <ul class="happinessSelector">
        <li {...optionProps(0, current)}>
            <div class="icon face">
                <svg width="100%" height="100%" viewBox="-50 -50 100 100">
                    <circle cx="0" cy="0" r="40" />
                </svg>
            </div>
            <p class="mainText">No Vote</p>
            <p class="extraText">I don't want to participate</p>
        </li>
        <li {...optionProps(5, current)}>
            <div class="icon face">
                <svg width="100%" height="100%" viewBox="-50 -50 100 100">
                    <circle cx="0" cy="0" r="40" />
                    <line x1="-18" y1="-10" x2="-8" y2="-18" />
                    <line x1="18" y1="-10" x2="8" y2="-18" />
                    <path d="M -15 15 C 0 20 0 20 15 15" />
                </svg>
            </div>
            <p class="mainText">Very Happy</p>
            <p class="extraText">It should always be this way!</p>
        </li>
        <li {...optionProps(4, current)}>
            <div class="icon face">
                <svg width="100%" height="100%" viewBox="-50 -50 100 100">
                    <circle cx="0" cy="0" r="40" />
                    <circle cx="-15" cy="-8" r="2" />
                    <circle cx="15" cy="-8" r="2" />
                    <path d="M -15 15 C 0 20 0 20 15 15" />
                </svg>
            </div>
            <p class="mainText">Happy</p>
            <p class="extraText">It can always get better!</p>
        </li>
        <li {...optionProps(3, current)}>
            <div class="icon face">
                <svg width="100%" height="100%" viewBox="-50 -50 100 100">
                    <circle cx="0" cy="0" r="40" />
                    <circle cx="-15" cy="-8" r="2" />
                    <circle cx="15" cy="-8" r="2" />
                    <line x1="-15" y1="15" x2="15" y2="15" />
                </svg>
            </div>
            <p class="mainText">Don't know</p>
            <p class="extraText">Meh... / Mixed feelings</p>
        </li>
        <li {...optionProps(2, current)}>
            <div class="icon face">
                <svg width="100%" height="100%" viewBox="-50 -50 100 100">
                    <circle cx="0" cy="0" r="40" />
                    <circle cx="-15" cy="-8" r="2" />
                    <circle cx="15" cy="-8" r="2" />
                    <path d="M -15 15 C 0 10 0 10 15 15" />
                </svg>
            </div>
            <p class="mainText">Unhappy</p>
            <p class="extraText">A lot needs to change!</p>
        </li>
        <li {...optionProps(1, current)}>
            <div class="icon face">
                <svg width="100%" height="100%" viewBox="-50 -50 100 100">
                    <circle cx="0" cy="0" r="40" />
                    <line x1="-15" y1="-7" x2="-8" y2="-15" />
                    <line x1="-8" y1="-15" x2="-15" y2="-18" />
                    <line x1="15" y1="-7" x2="8" y2="-15" />
                    <line x1="8" y1="-15" x2="15" y2="-18" />
                    <path d="M -18 20 C -15 5 15 5 18 20" />
                </svg>
            </div>
            <p class="mainText">Very Unhappy</p>
            <p class="extraText">Why even bother...</p>
        </li>
    </ul>
)

const result = ({ state: { votes, total } }) =>
    votes ? Math.round((10 * total) / votes) / 10 : ''

export { init, reset, commit, selector, result }
