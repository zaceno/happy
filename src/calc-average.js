export default ({ num, tot }) => {
    if (!num) return 0
    let avg = tot / num
    return Math.round(avg * 10) / 10
}
