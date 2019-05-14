import html from '../util/html'

export default ({ num, tot }) =>
    html.p(
        { class: 'happinessResult' },
        num ? Math.round((tot / num) * 10) / 10 : ''
    )
