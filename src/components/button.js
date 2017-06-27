
module.exports = ({cls, action}, children) => {
    const onActivate = ev => {
        ev.preventDefault(true)
        ev.currentTarget.classList.add('active')
        action()
    }
    
    return {
        tag: 'button',
        data:{
            class: cls,
            ontouchstart: onActivate,
            onmousedown: onActivate
        },
        children
    }
}