<template>
  <page
    next-page="/start"
    next-button-label="Reset"
    @go-next="$store.commit('reset')"
    next-button-info="Need to do it again?"
  >
    <panel>
    Happiness index:
    <div id="result">
      {{ resultStr }}
    </div>
    </panel>
  </page>
</template>
<script>
import Page from './Page.vue'
import Panel from './Panel.vue'
export default {
  components: { Page, Panel },
  computed: {
    resultStr () {
      if (this.$store.state.result === 0) return ''
      return '' + this.$store.state.result
    }
  }
}
</script>
<style>
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
