const {h} = require('hyperapp')
const avg = ({sum, count}) => {
    if (count === 0) return ''
    return '' + Math.round(10 * sum / count) / 10
}

module.exports = (data) => h('p', {class: 'result-display'}, [avg(data)])