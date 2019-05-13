export const reset = _ => ({ num: 0, tot: 0 })
export const vote = ({ num, tot }, val) => ({ num: num + 1, tot: tot + val })
