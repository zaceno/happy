import html from '../html'
const { p } = html
import Page from '../navigation-page'
import NavButton from '../navigation-button'
import StartPage from './start'
import CalcAverage from '../calc-average'

export default props =>
    Page(props, [
        p(['Memory Cleared!', CalcAverage(props.tally)]),
        NavButton({ direction: 'right', page: StartPage }, 'Start Again'),
    ])
