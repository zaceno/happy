import * as actions from './actions/vote'
import HappinessResult from './components/happiness-result'

const Vote = (state, vote) => ({
    ...state,
    votes: actions.vote(state.votes, vote),
})

const Init = state => ({ ...state, votes: actions.reset(state.votes) })

const View = ({ state }) => HappinessResult(state.votes)

export { Init, Vote, View }
