import Message from '../components/message'
import * as Nav from '../navigation'
import StartPage from './start'
import * as Votes from '../votes'

export default ({ state, ...pageProps }) =>
    Nav.Page(pageProps, [
        Message(['Memory Cleared!', Votes.View({ state })]),
        Nav.Button({ direction: 'right', page: StartPage }, 'Start Again'),
    ])
