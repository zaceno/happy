import html from '../html'
const { p } = html
import Page from '../navigation-page'
import NavButton from '../navigation-button'
import ResetPage from './reset'
import CalcAverage from '../calc-average'
import { ResetVotes } from '../tally-actions'
export default props =>
    Page(props, [
        p(['Happiness Index:', CalcAverage(props.tally)]),
        NavButton(
            {
                direction: 'left',
                page: ResetPage,
                onnavigate: ResetVotes,
            },
            'Reset'
        ),
    ])
