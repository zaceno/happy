import Vue from 'vue'
import VueRouter from 'vue-router'
import StartPage from './components/StartPage.vue'
import PassPage from './components/PassPage.vue'
import VotePage from './components/VotePage.vue'
import ResultPage from './components/ResultPage.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/start', component: StartPage },
    { path: '/vote', component: VotePage },
    { path: '/pass', component: PassPage },
    { path: '/result', component: ResultPage },
    { path: '*', redirect: '/start' }
  ]
})
