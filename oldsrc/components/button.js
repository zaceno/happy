import tags from './tags'
const [button] = tags('button')

const onActivate = action => ev => {
    ev.preventDefault(true)
    ev.currentTarget.classList.add('active')
    action()
}

export default ({cls, action}, children) => button({
    class: cls,
    ontouchstart: onActivate(action),
    onmousedown: onActivate(action)
}, children)

