import { h } from 'hyperapp'
export default x => h('p', { class: 'happinessResult' }, x > 0 ? x : '')
