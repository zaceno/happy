export default (f => a => [f, a])((a, d) => requestAnimationFrame(_ => d(a)))
