<template>
  <page next-page="/pass" @go-next="$store.commit('castVote')" next-button-label="Cast Vote">
    <vote-selector></vote-selector>
  </page>
</template>
<script>
import VoteSelector from './VoteSelector.vue'
import Page from './Page.vue'
export default {
  components: {
    VoteSelector,
    Page
  }
}
</script>
