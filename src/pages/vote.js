import html from '../html'
const { p } = html
import Page from '../navigation-page'
import NavButton from '../navigation-button'
import PassPage from './pass'
import HappinessSelector from '../happiness-selector'
import { CommitVote } from '../tally-actions'
export default props =>
    Page(props, [
        HappinessSelector({ value: props.happiness }),
        NavButton(
            {
                direction: 'left',
                page: PassPage,
                onnavigate: CommitVote,
            },
            'Cast vote!'
        ),
    ])
