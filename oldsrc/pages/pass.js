import Message from '../components/message'
import * as Nav from '../navigation'
import VotePage from './vote'
import ResultPage from './result'

export default Nav.Page(state => [
    Nav.Button(state, {
        direction: 'left',
        page: ResultPage,
        text: 'Check Result',
        extra: 'Has everyone voted? Tap here to...',
    }),
    Message('Thank you! Now, please hand the phone to the next person.'),
    Nav.Button(state, {
        direction: 'right',
        page: VotePage,
        text: 'Vote',
        extra: 'Are you the next person? Tap here to...',
    }),
])
