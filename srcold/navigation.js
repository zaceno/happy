import AfterRender from './fx/after-render'
import Immediate from './fx/immediate'
import NavButton from './components/navigation-button'
import NavPage from './components/navigation-page'
import NavContainer from './components/navigation-container'

const RunTransition = state => ({
    ...state,
    nav: { ...state.nav, mode: 'run' },
})

const EndTransition = state => ({
    ...state,
    nav: { ...state.nav, mode: 'idle' },
})

const Navigate = (state, props) => {
    if (state.nav.mode !== 'idle') return state
    return [
        {
            ...state,
            nav: {
                mode: 'start',
                page: props.page,
                prev: state.nav.page,
                direction: props.direction,
            },
        },
        AfterRender(RunTransition),
        props.onnavigate && Immediate(props.onnavigate),
    ]
}

export const Init = (state, page) => ({
    ...state,
    nav: { mode: 'idle', page },
})

export const Button = (state, { page, direction, onnavigate, text, extra }) =>
    NavButton({
        active: state.nav.mode !== 'idle' && state.nav.page === page,
        text,
        extra,
        direction,
        onnavigate: [
            Navigate,
            {
                page,
                direction,
                onnavigate,
            },
        ],
    })

export const Page = contentView => (state, isPrev) =>
    NavPage(
        {
            entering: state.nav.mode !== 'idle' && !isPrev,
            exiting: state.nav.mode !== 'idle' && isPrev,
            running: state.nav.mode === 'run',
            direction: state.nav.direction,
            ontransitionend: EndTransition,
        },
        contentView(state)
    )

export const Container = state => {
    const { page, prev } = state.nav
    return state.nav.mode === 'idle'
        ? NavContainer({ page: state.nav.page(state) })
        : NavContainer({
              prev: state.nav.prev(state, true),
              page: state.nav.page(state),
          })
}
