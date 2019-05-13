import html from '../html'
const { p } = html
import Page from '../navigation-page'
import NavButton from '../navigation-button'
import PassPage from './pass'
import * as HappinessSelector from '../happiness-selector'
import { CommitVote } from '../tally-actions'
import Immediate from '../fx/immediate'

const CommitAndReset = (state, happiness) => [
    state,
    Immediate(CommitVote, happiness),
    Immediate(HappinessSelector.Init),
]

export default props =>
    Page(props, [
        HappinessSelector.View({ value: props.happiness }),
        NavButton(
            {
                direction: 'left',
                page: PassPage,
                onnavigate: [CommitAndReset, props.happiness],
            },
            'Cast vote!'
        ),
    ])
