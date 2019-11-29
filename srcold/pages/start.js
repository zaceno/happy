import Message from '../components/message'
import * as Nav from '../navigation'
import VotePage from './vote'

export default Nav.Page(state => [
    Message('Please pass the phone to the first person'),
    Nav.Button(state, {
        direction: 'left',
        page: VotePage,
        extra: "When you're ready, tap here to...",
        text: 'Vote',
    }),
])
