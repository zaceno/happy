<template>
  <page
    next-page="/pass"
    next-button-label="Start Round"
    next-button-info="Tap here to "
  >
    <panel>
      Happiness Index Calculator
    </panel>
  </page>
</template>
<script>
import Page from './Page.vue'
import Panel from './Panel.vue'
export default { components: { Page, Panel } }
</script>
