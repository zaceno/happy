import Message from '../components/message'
import * as Nav from '../navigation'
import StartPage from './start'
import * as Votes from '../votes'

export default Nav.Page(state => [
    Message(['Memory Cleared!', Votes.View(state)]),
    Nav.Button({
        direction: 'right',
        page: StartPage,
        extra: 'Tap here to...',
        text: 'Start again',
    }),
])
