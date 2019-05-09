import {h} from 'hyperapp'
const avg = ({sum, count}) => {
    if (count === 0) return ''
    return '' + Math.round(10 * sum / count) / 10
}

export default (data) => h('p', {class: 'result-display'}, [avg(data)])