<template>
  <page
    next-page="/vote"
    next-button-label="Vote"
    next-button-info="When you're ready, tap here to..."
  >
    <panel class="prompt-panel">
      Please hand the phone to the first person to vote
    </div>

    </panel>
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

.prompt-panel {
  height: 80%;
}
</style>
