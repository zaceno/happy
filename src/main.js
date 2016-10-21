import Vue from 'vue'
import router from './router'
import store from './store/index'
import App from './App'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
})
