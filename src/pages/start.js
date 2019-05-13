import html from '../util/html'
const { p } = html
import * as Nav from '../navigation'
import VotePage from './vote'

export default ({ state, ...pageProps }) =>
    Nav.Page(pageProps, [
        p({}, 'Please pass the phone to the first person'),
        Nav.Button({ direction: 'left', page: VotePage }, 'Vote'),
    ])
