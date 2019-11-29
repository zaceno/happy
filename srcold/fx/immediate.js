export default (f => (...a) => [f, a])((a, d) => d(...a))
