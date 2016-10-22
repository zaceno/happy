<template>
  <page
    next-page="/pass"
    @go-next="$store.commit('castVote')"
    next-button-label="Cast Vote"
    next-button-info="When you're ready, tap here to..."
    >
    <panel class="question-panel">How happy are you about your job?</panel>
    <div class="vote-container">
      <vote-selector class="vote-selector"></vote-selector>
    </div>
  </page>
</template>
<script>
import VoteSelector from './VoteSelector.vue'
import Page from './Page.vue'
import Panel from './Panel.vue'
export default {
  components: {
    VoteSelector,
    Page,
    Panel
  }
}
</script>
<style lang="less">
.question-panel {
  height: 20%;
  max-height: 20%;
}
.vote-container {
  height: 80%;
  width: 100%;
  position: relative;
  .vote-selector {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
  }

}

</style>
