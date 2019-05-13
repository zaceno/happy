import Message from '../components/message'
import * as Nav from '../navigation'
import ResetPage from './reset'
import * as Votes from '../votes'
export default ({ state, ...pageProps }) =>
    Nav.Page(pageProps, [
        Message(['Happiness index: ', Votes.View({ state })]),
        Nav.Button(
            {
                direction: 'left',
                page: ResetPage,
                onnavigate: Votes.Init,
            },
            'Reset'
        ),
    ])
