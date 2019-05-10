import html from './html'
import { Navigate } from './navigation-actions'

export default (props, children) =>
    html.button({ onclick: [Navigate, props] }, children)
