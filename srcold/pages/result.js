import Message from '../components/message'
import * as Nav from '../navigation'
import * as Votes from '../votes'
import ResetPage from './reset'

export default Nav.Page(state => [
    Message(['Happiness index: ', Votes.View(state)]),
    Nav.Button(state, {
        direction: 'left',
        page: ResetPage,
        onnavigate: Votes.Init,
        extra: 'Need to do it again? Tap here to...',
        text: 'Reset votes',
    }),
])
