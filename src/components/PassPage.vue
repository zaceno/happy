<template>
  <page
    next-page="/vote"
    next-button-label="Vote"
    next-button-info="Are you the next person? Tap here to..."
  >
    <panel>Please pass the phone to the next person.</panel>
    <nav-button
      class="result-button"
      page="/result"
      label="Check Result"
      @go="reset"
      direction="right"
      info="Has everyone voted? Then..."
    >
  </page>
</template>
<script>
import Page from './Page.vue'
import NavButton from './NavButton.vue'
import Panel from './Panel.vue'
export default {
  methods: {
    reset () {
      this.$store.commit('finishRound')
    }
  },
  components: {
    Page,
    Panel,
    NavButton
  }
}
</script>
<style>
.result-button {
  top: 2em;
}
</style>
