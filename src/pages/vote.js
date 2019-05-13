import Immediate from '../fx/immediate'
import Message from '../components/message'
import * as Nav from '../navigation'
import * as Happiness from '../happiness'
import * as Votes from '../votes'
import PassPage from './pass'

const CommitAndReset = (state, happiness) => [
    state,
    Immediate(Votes.Vote, happiness),
    Immediate(Happiness.Init),
]

export default Nav.Page(state => [
    Message('How happy are you about your job?'),
    Happiness.View(state),
    Nav.Button({
        direction: 'left',
        page: PassPage,
        onnavigate: [CommitAndReset, Happiness.Value(state)],
        extra: 'Make your selection, then tap here to...',
        text: 'Cast vote',
    }),
])
