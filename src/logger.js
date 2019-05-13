let lock = false
export default dispatch => (...args) => {
    if (typeof args[0] !== 'function') return dispatch(...args)
    const name = args[0].name || '-'
    const payload = args[1]
    const ret = dispatch(...args)
    console.log(name, payload, ret)
    return ret
}
