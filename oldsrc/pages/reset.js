import Message from '../components/message'
import * as Nav from '../navigation'
import StartPage from './start'
import * as Votes from '../votes'

export default Nav.Page(state => [
    Message(['Votes cleared from memory', Votes.View(state)]),
    Nav.Button(state, {
        direction: 'right',
        page: StartPage,
        extra: 'Tap here to...',
        text: 'Start again',
    }),
])
