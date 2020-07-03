import html from 'https://unpkg.com/hyperlit?module'

// MODEL
const init = () => ({sum: 0, count: 0, vote: 0})
const select = (state, vote) => ({ ...state, vote })
const commit = (state) => !state.vote
    ? state
    : {
          count: state.count + 1,
          sum: state.sum + state.vote,
          vote: 0,
      }


// ACTIONS

const SelectVote = (state, {transf, value}) => transf(select)(state, value)


// VIEWS

const face = (features) => html` <svg class="face" viewBox="-50 -50 100 100">
    <circle cx="0" cy="0" r="40" />
    ${features}
</svg>`

const noface = face()

const veryhappyface = face(html`
    <line x1="-18" y1="-10" x2="-8" y2="-18" />
    <line x1="18" y1="-10" x2="8" y2="-18" />
    <path d="M -15 15 C 0 20 0 20 15 15" />
`)

const happyface = face(html`
    <circle cx="-15" cy="-8" r="2" />
    <circle cx="15" cy="-8" r="2" />
    <path d="M -15 15 C 0 20 0 20 15 15" />
`)

const mehface = face(html`
    <circle cx="-15" cy="-8" r="2" />
    <circle cx="15" cy="-8" r="2" />
    <line x1="-15" y1="15" x2="15" y2="15" />
`)

const unhappyface = face(html`
    <circle cx="-15" cy="-8" r="2" />
    <circle cx="15" cy="-8" r="2" />
    <path d="M -15 15 C 0 10 0 10 15 15" />
`)

const veryunhappyface = face(html`
    <line x1="-15" y1="-7" x2="-8" y2="-15" />
    <line x1="-8" y1="-15" x2="-15" y2="-18" />
    <line x1="15" y1="-7" x2="8" y2="-15" />
    <line x1="8" y1="-15" x2="15" y2="-18" />
    <path d="M -18 20 C -15 5 15 5 18 20" />
`)

const getFace = (value) =>
    [noface, veryunhappyface, unhappyface, mehface, happyface, veryhappyface][
        value
    ]

const option = ({ value, state, transf, label, extra }) => html` <li
    ontouchstart=${[SelectVote, {value, transf}]}
    onmousedown=${[SelectVote, {value, transf}]}
    class=${{ selected: value === state.vote }}
>
    ${getFace(value)}
    <p class="label">${label}</p>
    <p class="extra">${extra}</p>
</li>`


const selector = (props) => html` <ul class="happiness-selector">
    <${option}
        ${props}
        value=${0}
        label="No Vote"
        extra="I don't want to participate"
    />
    <${option}
        ${props}
        value=${5}
        label="Very Happy"
        extra="It should always be this way"
    />
    <${option}
        ${props}
        value=${4}
        label="Happy"
        extra="It can always get better"
    />
    <${option}
        ${props}
        value=${3}
        label="Don't know"
        extra="Meh... / Mixed feelings"
    />
    <${option}
        ${props}
        value=${2}
        label="Unhappy"
        extra="A lot needs to change!"
    />
    <${option}
        ${props}
        value=${1}
        label="Very Unhappy"
        extra="Why even bother..."
    />
</ul>`



const result = ({state: {count, sum}}) => html`
    <span class="result">
        ${count > 0 ? Math.round((sum * 10) / count) / 10 : ''}
    </span>`

export {init, commit, selector, result}