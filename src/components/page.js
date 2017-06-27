const NavButton = require('./navbutton')
const transitions = require('../transitions')


const cache = {
    direction: null
}

module.exports = ({name, direction, next}, children) => {
    cache.direction = direction
    const tx = transitions.both(_ => ({
        name: 'slide-' + cache.direction,
        time: 300
    }))
    return tx({
        'tag': 'div',
        data: {
            class: 'page',
            key: name,
        },
        children: [].concat(children, NavButton(next))
    })
}