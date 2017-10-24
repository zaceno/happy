import {h} from 'hyperapp'
import Button from './button'
import Chevron from './chevron'

export default ({goTo, target, direction, text, extra, onGo}) => {
    return Button(
        {
            cls: `nav-button ${direction}`,
            action: _ => {
                if (onGo) onGo()
                goTo([target, direction])
            },
        },
        [
            Chevron({direction}),
            h('p', {class: 'button-text-extra'}, [extra]),
            h('p', {class: 'button-text-main'}, [text])
        ]
    )
}