import html from '../util/html'

export default ({ page, prev }) =>
    html.main({ class: 'navContainer' }, [prev && prev, page])
