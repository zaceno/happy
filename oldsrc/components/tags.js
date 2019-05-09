import {h} from 'hyperapp'
export default function (tags) {
    return tags.replace(/\s/g, '').split(',').map(tagName => (props, children) => {
        return (typeof props === 'object' && !Array.isArray(props)) 
        ? h(tagName, props, children)
        : h(tagName, {}, props)
    })   
}