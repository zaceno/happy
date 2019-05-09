import html from '../html'
const { p } = html
import Page from '../navigation-page'
import NavButton from '../navigation-button'
import PassPage from './pass'
import HappinessSelector from '../happiness-selector'
export default props =>
    Page(props, [
        HappinessSelector({
            value: props.happinessSelection,
            set: props.selectHappiness,
        }),
        NavButton(
            { direction: 'left', page: PassPage, onnavigate: props.commitVote },
            'Cast vote!'
        ),
    ])
