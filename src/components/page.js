import {h} from 'hyperapp'
import NavButton from './navbutton'
import {enter as TxEnter, exit as TxExit} from 'hyperapp-transitions'

const cache = {
    direction: null
}

const TxTranslation = {
    enter: {
        back: '-110%',
        forward: '110%',
    },
    exit: {
        back: '110%',
        forward: '-110%',
    }
}

const getTxCSS = inOrOut => _ => ({
    transform: `translateX(${TxTranslation[inOrOut][cache.direction]})`
})


export default ({name, direction, next}, children) => {
    cache.direction = direction
    return TxEnter(
        {
            css: getTxCSS('enter'),
            easing: 'ease-in-out',
            time: 400
        },
        TxExit(
            {
                css: getTxCSS('exit'),
                easing: 'ease-in-out',
                time: 400
            },
            [
                h(
                    'div',
                    {
                        class: 'page',
                        key: name
                    },
                    [].concat(children, NavButton(next))
                )
            ]
        )
    )[0]
}