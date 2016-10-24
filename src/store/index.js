import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    votes: [],
    currentVote: 0,
    result: 0
  },
  mutations: {
    setVote (state, val) { state.currentVote = val },
    castVote (state) {
      if (state.currentVote !== 0) state.votes.push(state.currentVote)
      state.currentVote = 0
    },
    finishRound (state) {
      var result = 0
      if (state.votes.length > 0) {
        result = state.votes.reduce((sum, v) => { return sum + v }) / state.votes.length
        result = Math.round(result * 10) / 10 // round to single decimal
      }
      state.result = result
      state.votes = []
      state.currentVote = null
    },
    reset (state) {
      state.votes = []
      state.currentVote = 0
      state.result = 0
    }
  }
})
