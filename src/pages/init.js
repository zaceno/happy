import html from '../html'
const { p } = html
import Page from '../navigation-page'
import NavButton from '../navigation-button'
import StartPage from './start'

export default props =>
    Page(props, [
        p({}, 'Happiness Index Calculator'),
        NavButton({ direction: 'left', page: StartPage }, 'Start'),
    ])
