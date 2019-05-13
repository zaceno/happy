import Message from '../components/message'
import * as Nav from '../navigation'
import VotePage from './vote'
import ResultPage from './result'

export default ({ state, ...pageProps }) =>
    Nav.Page(pageProps, [
        Message('Thanks! Please pass the phone to the next person'),
        Nav.Button({ direction: 'right', page: VotePage }, 'Vote'),
        Nav.Button({ direction: 'left', page: ResultPage }, 'Result'),
    ])
