import {h} from 'hyperapp'
import NavButton from './navbutton'
import transitions from 'hyperapp-transitions'


const pageSlide = (() => {
    const {combine, enter, leave} = transitions    
    var direction

    var opts = _ => ({
        name: 'slide-' + direction,
        easing: 'ease-in-out',
        time: 400,
        ready: 500,
    })

    return d => {
        direction = d
        return combine(enter(opts), leave(opts))
    }
})()

export default ({name, direction, next}, children) => pageSlide(direction)(h(
    'div',
    {
        class: 'page',
        key: name
    },
    [].concat(children, NavButton(next))
))
