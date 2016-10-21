<template>
  <page next-page="/start" next-button-label="Reset" @go-next="$store.commit('reset')">
    Average happiness index is: {{ $store.state.result }}
  </page>
</template>
<script>
import Page from './Page.vue'
export default { components: { Page } }
</script>
