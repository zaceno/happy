import Message from '../components/message'
import * as Nav from '../navigation'
import StartPage from './start'

export default ({ state, ...pageProps }) =>
    Nav.Page(pageProps, [
        Message('Happiness Index Calculator'),
        Nav.Button({ direction: 'left', page: StartPage }, 'Start'),
    ])
