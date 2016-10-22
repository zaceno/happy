<template>
  <page
    next-page="/vote"
    next-button-label="Start Voting"
    next-button-info="Are you the next person? Tap here to..."
  >
    <panel>Pass to the next person</panel>
    <nav-button page="/result" label="See Results" @go="reset" direction="right">
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
