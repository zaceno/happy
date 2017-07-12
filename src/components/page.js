const NavButton = require('./navbutton')
const {combine, enter, leave} = require('hyperapp-transitions')
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

module.exports = ({name, direction, next}, children) => {
    cache.direction = direction
    return pageSlide({
        'tag': 'div',
        data: {
            class: 'page',
            key: name,
        },
        children: [].concat(children, NavButton(next))
    })
}