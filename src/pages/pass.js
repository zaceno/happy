import html from '../html'
const { p } = html
import Page from '../navigation-page'
import NavButton from '../navigation-button'
import VotePage from './vote'
import ResultPage from './result'

export default props =>
    Page(props, [
        p('Thanks! Pass the phone to the next person'),
        NavButton({ direction: 'right', page: VotePage }, 'Vote'),
        NavButton({ direction: 'left', page: ResultPage }, 'Result'),
    ])
