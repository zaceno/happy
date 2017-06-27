const avg = ({sum, count}) => {
    if (count === 0) return ''
    return '' + Math.round(10 * sum / count) / 10
}

module.exports = (data) => ({
    tag: 'p',
    data: {class: 'result-display'},
    children: [avg(data)]//[ avg(data) ]
})