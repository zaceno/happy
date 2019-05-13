import html from '../html'
const { p } = html
import Page from '../navigation-page'
import NavButton from '../navigation-button'
import StartPage from './start'
import { avg } from '../calcs/vote'

export default props =>
    Page(props, [
        p(['Memory Cleared!', avg(props.tally)]),
        NavButton({ direction: 'right', page: StartPage }, 'Start Again'),
    ])
