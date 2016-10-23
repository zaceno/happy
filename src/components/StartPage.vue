<template>
  <page
    next-page="/first"
    next-button-label="Start Round"
    next-button-info="Tap here to ..."
  >
    <panel class="start-panel">
      Happiness Index Calculator
    </panel>
  </page>
</template>
<script>
import Page from './Page.vue'
import Panel from './Panel.vue'
export default { components: { Page, Panel } }
</script>
<style lang="less">
.start-panel {
  height: 98%;
}
</style>
