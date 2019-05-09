import html from '../html'
const { p } = html
import Page from '../navigation-page'
import NavButton from '../navigation-button'
import VotePage from './vote'

export default props =>
    Page(props, [
        p({}, 'Please pass the phone to the first person'),
        NavButton({ direction: 'left', page: VotePage }, 'Vote'),
    ])
