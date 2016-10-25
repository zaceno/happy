<template>
  <page
    next-page="/vote"
    next-button-label="Vote"
    next-button-info="Are you the next person? Tap to..."
  >
  <nav-button
    class="result-button"
    page="/result"
    label="Check Result"
    @go="reset"
    direction="right"
    info="Has everyone voted? Then..."
  />
    <panel class="prompt-panel">Thank you! <br>Please pass the phone to the next person.</panel>
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
<style lang="less">

.result-button {
  height: 18%;
  max-height: 18%;
}
.prompt-panel {
  height: 80%;
}

</style>
