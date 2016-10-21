<template>
  <page
    next-page="/vote"
    next-button-label="VOTE"
    next-button-info="Are you the next person? Click here to..."
  >
    This is the pass page

    if Everyone is done
    <nav-button page="/result" label="See Results" @go="reset">
  </page>
</template>
<script>
import Page from './Page.vue'
import NavButton from './NavButton.vue'

export default {
  methods: {
    reset () {
      this.$store.commit('finishRound')
    }
  },
  components: {
    Page,
    NavButton
  }
}
</script>
