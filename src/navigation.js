import AfterRender from './fx/after-render'
import Immediate from './fx/immediate'
import * as actions from './actions/navigate'
import NavButton from './components/navigation-button'
import NavPage from './components/navigation-page'
import NavContainer from './components/navigation-container'

const RunTransition = state => ({ ...state, nav: actions.run(state.nav) })

const EndTransition = state => ({ ...state, nav: actions.finish(state.nav) })

const Navigate = (state, props) => {
    if (state.nav.mode !== 'idle') return state
    return [
        { ...state, nav: actions.start(state.nav, props) },
        AfterRender(RunTransition),
        props.onnavigate && Immediate(props.onnavigate),
    ]
}

export const Init = (state, page) => ({
    ...state,
    nav: actions.reset(state.nav, page),
})

export const Button = ({ page, direction, onnavigate }, children) =>
    NavButton(
        { direction, onnavigate: [Navigate, { page, direction, onnavigate }] },
        children
    )

export const Page = (props, children) =>
    NavPage({ ...props, ontransitionend: EndTransition }, children)

export const Container = ({ state }) => NavContainer({ ...state.nav, state })
