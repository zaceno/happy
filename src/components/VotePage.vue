<template>
  <page
    next-page="/pass"
    @go-next="$store.commit('castVote')"
    next-button-label="Cast Vote"
    next-button-info="When you're ready, tap here to..."
    >
    <panel>How happy are you about your job?</panel>
    <vote-selector></vote-selector>
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
