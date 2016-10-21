import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    votes: [],
    currentVote: null,
    result: null
  },
  mutations: {
    setVote (state, val) { state.currentVote = val },
    castVote (state) {
      if (state.currentVote !== null) state.votes.push(state.currentVote)
      state.currentVote = null
      console.log('VOTE CAST', state.votes)
    },
    finishRound (state) {
      var result = null
      if (state.votes.length > 0) {
        result = state.votes.reduce((sum, v) => { return sum + v }) / state.votes.length
        result = Math.round(result * 10) / 10 // round to single decimal
      }
      state.result = result
      state.votes = []
      console.log('FINISHED ROUND', state.result, state.votes)
      state.currentVote = null
    },
    reset (state) {
      console.log('RESETTING VOTE')
      state.votes = []
      state.currentVote = null
      state.result = null
    }
  }
})
