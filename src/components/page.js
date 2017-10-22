import {h} from 'hyperapp'
import NavButton from './navbutton'
import transitions from 'hyperapp-transitions'

const {combine, enter, leave} = transitions
const cache = {direction: null}

const pageSlideOpts = _ => {
    return {
        name: 'slide-' + cache.direction,
        easing: 'ease-in-out',
        time: 400,
        ready: 420,
    }
}

const pageSlide = combine(
    enter(pageSlideOpts),
    leave(pageSlideOpts)
)

export default ({name, direction, next}, children) => {
    cache.direction = direction
    return pageSlide(h('div', {class: 'page', key: name }, [].concat(children, NavButton(next))))
}