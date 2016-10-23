import Vue from 'vue'
import VueRouter from 'vue-router'
import StartPage from './components/StartPage.vue'
import PassPage from './components/PassPage.vue'
import VotePage from './components/VotePage.vue'
import ResultPage from './components/ResultPage.vue'
import FirstPage from './components/FirstPage.vue'
import ResetPage from './components/ResetPage.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/start', component: StartPage },
    { path: '/vote', component: VotePage },
    { path: '/pass', component: PassPage },
    { path: '/result', component: ResultPage },
    { path: '/first', component: FirstPage },
    { path: '/reset', component: ResetPage },
    { path: '*', redirect: '/start' }
  ]
})

const direction = function (a, b) {
  if (a === '/start' && b === '/first') return 'right'
  if (a === '/first' && b === '/vote') return 'right'
  if (a === '/vote' && b === '/pass') return 'right'
  if (a === '/pass' && b === '/vote') return 'left'
  if (a === '/pass' && b === '/result') return 'right'
  if (a === '/result' && b === '/reset') return 'right'
  if (a === '/reset' && b === '/first') return 'left'
  return 'none'
}

export { router, direction }
