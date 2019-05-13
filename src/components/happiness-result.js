export default ({ num, tot }) => (num ? Math.round((tot / num) * 10) / 10 : 0)
