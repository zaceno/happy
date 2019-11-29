import { h, app } from 'hyperapp'
import map from 'hyperapp-map'

const nextFrame = (f => a => [f, { a }])((d, { a }) =>
    requestAnimationFrame(_ => d(a))
)

const slides = (() => {
    const init = { view: null, transition: null, mode: 'idle' }
    const go = (state, { view, transition }) =>
        state.mode !== 'idle'
            ? state
            : [
                  {
                      view: view,
                      mode: 'start',
                      prev: state.view,
                      transition,
                  },
                  nextFrame(run),
              ]
    const run = state => ({ ...state, mode: 'run' })
    const finish = state => ({ ...state, mode: 'finish' })
    const classes = ({ mode, transition, view, prev }, self) => ({
        [transition + '-enter']: mode !== 'idle' && view === self,
        [transition + '-exit']: mode !== 'idle' && prev === self,
        [transition + '-run']: mode === 'run',
    })
    const events = ({ view }, self) => ({
        ontransitionend: view === self ? finish : null,
    })

    const content = ({ prev, view }, data) => [
        prev && prev(data),
        view && view(data),
    ]
    return { init, events, go, classes, content }
})()

const slideMap = map(
    state => state.slides,
    (state, slides) => ({ ...state, slides })
)

/*
controlled container:

a stateful container component: 
you are meant to provide the sub-state and submap, t

const ControlledView => (localState, map, view, props, content)


const PageA = state => {
    const container = mapSlides(slides.slide(state.slide))
    container
}

*/

const slide = { tag, state, content }

const PageA = state =>
    h(
        'section',
        {
            class: ['navPage', slides.classes(state.slides, PageA)],
            ...slides.events(state.slides, PageA),
        },
        [
            h('h1', {}, 'This is Page A'),
            state.message,
            h(
                'button',
                {
                    onclick: [
                        slideMap(slides.go),
                        {
                            view: PageB,
                            transition: 'slideRight',
                        },
                    ],
                },
                'To B'
            ),
        ]
    )

const PageB = state =>
    h(
        'section',
        {
            class: ['navPage', slideClasses(state, PageB)],
            ...slideEvents(state, PageB),
        },
        [
            h('h1', {}, 'This is Page B'),
            state.message,
            h(
                'button',
                {
                    onclick: [
                        slideMap(slides.go),
                        {
                            view: PageA,
                            transition: 'slideLeft',
                        },
                    ],
                },
                'To A'
            ),
        ]
    )

let dispatch
app({
    init: {
        slides: slides.init,
        message: 'This is a message in state',
    },
    view: state =>
        console.log('STATE', state) ||
        h('body', {}, [
            h(
                'main',
                { class: 'navContainer' },
                slides.content(state.slides, state)
            ),
        ]),
    node: document.body,
    middleware: d =>
        (dispatch = (action, data) => {
            console.log('DISP', action, data)
            return d(action, data)
        }),
})
setTimeout(
    _ =>
        dispatch([
            slideMap(slides.go),
            {
                view: PageA,
                transition: 'slideLeft',
            },
        ]),
    1000
)
