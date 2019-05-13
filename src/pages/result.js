import html from '../html'
const { p } = html
import Page from '../navigation-page'
import NavButton from '../navigation-button'
import ResetPage from './reset'
import { avg } from '../calcs/vote'
import { ResetVotes } from '../tally-actions'
export default props =>
    Page(props, [
        p(['Happiness Index:', avg(props.tally)]),
        NavButton(
            {
                direction: 'left',
                page: ResetPage,
                onnavigate: ResetVotes,
            },
            'Reset'
        ),
    ])
