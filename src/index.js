import { app } from 'hyperapp'
import { init, view } from './main'

app({
    init,
    view: state => console.log('NEW STATE', state) || view(state),
    node: document.querySelector('main'),
    middleware: dispatch => (action, data) => {
        console.log('DISPATCH', action, data)
        return dispatch(action, data)
    },
})
