import html from '../util/html'

export default ({ direction, onnavigate }, children) =>
    html.button({ onclick: onnavigate }, [
        direction === 'right' && '<',
        children,
        direction === 'left' && '>',
    ])
