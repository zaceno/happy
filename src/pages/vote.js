import Immediate from '../fx/immediate'
import * as Nav from '../navigation'
import * as Happiness from '../happiness'
import * as Votes from '../votes'
import PassPage from './pass'

const CommitAndReset = (state, happiness) => [
    state,
    Immediate(Votes.Vote, happiness),
    Immediate(Happiness.Init),
]

export default ({ state, ...pageProps }) =>
    Nav.Page(pageProps, [
        Happiness.View({ state }),
        Nav.Button(
            {
                direction: 'left',
                page: PassPage,
                onnavigate: [CommitAndReset, Happiness.Value(state)],
            },
            'Cast vote!'
        ),
    ])
