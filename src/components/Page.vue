<template>
  <div class="page">
    <slot>
      Page content goes here
    </slot>
    <next-step-button
      @go="$emit('go-next')"
      :page="nextPage"
      :label="nextButtonLabel"
      :info="nextButtonInfo"
    >
  </div>
</template>
<script>
import NextStepButton from './NextStepButton.vue'
export default {
  props: ['nextPage', 'nextButtonLabel', 'nextButtonInfo'],
  components: { NextStepButton }
}
</script>
<style lang="less">
@import '../assets/transitions.less';

.page {
  background-color: #fff;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  .slide-transition()
}
</style>
