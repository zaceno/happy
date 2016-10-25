<template>
  <page
    next-page="/first"
    next-button-label="Start Again"
    next-button-info="Tap here to ..."
  >
    <panel class="result-panel">
      All votes cleared from memory
      <div id="result"></div>
    </panel>
  </page>
</template>
<script>
import Page from './Page.vue'
import Panel from './Panel.vue'
export default { components: { Page, Panel } }
</script>
<style lang="less">
.result-panel {
  height: 98%;
}
#result {
  width: 200px;
  height: 200px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 100px;
  border-color: #555;
  border-width: 3px;
  background-color: #fff;
  border-style: solid;
  font-size: 80px;
  line-height: 190px;
  text-align: center;
  margin-top: 0.5em;
}
</style>
