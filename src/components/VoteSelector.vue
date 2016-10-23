<template>
  <ul class="list-selector">
    <vote-selection class="vote-item" :value="0"></vote-selection>
    <vote-selection class="vote-item" :value="5"></vote-selection>
    <vote-selection class="vote-item" :value="4"></vote-selection>
    <vote-selection class="vote-item" :value="3"></vote-selection>
    <vote-selection class="vote-item" :value="2"></vote-selection>
    <vote-selection class="vote-item" :value="1"></vote-selection>
  </ul>
</template>
<script>
import VoteSelection from './VoteSelection.vue'
export default {
  components: { VoteSelection }
}
</script>
<style lang="less">

ul.list-selector {
  text-indent: none;
  list-style-type: none;
  display: block;
  position: relative;

  .vote-item {
    height: 16.3%;
    overflow: hidden;
  }
}


</style>
