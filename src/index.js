import { h, app } from 'hyperapp'
import logger from './logger'
import html from './html'
const { body, main, section, button, p, ul, li } = html
import Voter from './components/voter'
import InitPage from './pages/init'

const SelectVote = (state, vote) => ({
    ...state,
    voter: { ...state.voter, vote },
})
const ResetVotes = state => ({
    ...state,
    voter: { vote: 0, tally: { num: 0, tot: 0 } },
})
const CommitVote = state =>
    !state.voter.vote
        ? state
        : {
              ...state,
              voter: {
                  vote: 0,
                  tally: {
                      num: state.voter.tally.num + 1,
                      tot: state.voter.tally.tot + state.voter.vote,
                  },
              },
          }
const InitVoter = _ => ({ tally: { num: 0, tot: 0 }, vote: 0 })

const AfterRender = (f => a => [f, a])((a, d) =>
    requestAnimationFrame(_ => d(a))
)

const StartTransition = (state, { page, direction }) =>
    state.nav.mode !== 'idle'
        ? state
        : [
              {
                  ...state,
                  nav: {
                      ...state.nav,
                      mode: 'start',
                      page,
                      direction,
                      prev: state.nav.page,
                  },
              },
              AfterRender(RunTransition),
          ]

const RunTransition = state => ({
    ...state,
    nav: { ...state.nav, mode: 'run' },
})
const EndTransition = state => ({
    ...state,
    nav: { ...state.nav, mode: 'idle' },
})

const Page = (props, children) =>
    section(
        {
            class: {
                page: true,
                exit: props.exit,
                enter: props.enter,
                run: props.run,
                left: props.left,
                right: props.right,
            },
            ontransitionend: EndTransition,
        },
        children
    )

const Navigate = (state, { onnavigate, page, direction }) =>
    StartTransition(onnavigate ? onnavigate(state) : state, { direction, page })

const InitNavigator = initialPage => ({ mode: 'idle', page: initialPage })

app(
    {
        init: _ => ({ nav: InitNavigator(InitPage), voter: InitVoter() }),
        view: state =>
            body({}, NavFrame({ navstate: state.nav, appstate: state })),
        node: document.body,
    },
    //*
    logger
    //*/
)
