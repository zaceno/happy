import * as actions from './actions/vote'
import HappinessResult from './components/happiness-result'

const Vote = (state, vote) =>
    vote === 0
        ? state
        : {
              ...state,
              votes: {
                  num: state.votes.num + 1,
                  tot: state.votes.tot + vote,
              },
          }

const Init = state => ({ ...state, votes: { num: 0, tot: 0 } })

const View = state => HappinessResult(state.votes)

export { Init, Vote, View }
