<template>
  <div class="page">
    <div class="page-content">
      <slot>
        Page content goes here
      </slot>
    </div>
    <next-step-button
      class="next-button"
      @go="$emit('go-next')"
      :page="nextPage"
      :label="nextButtonLabel"
      :info="nextButtonInfo"
      :direction="nextDirection"
    >
  </div>
</template>
<script>
import {direction} from '../router'
import NextStepButton from './NextStepButton.vue'

export default {
  props: ['nextPage', 'nextButtonLabel', 'nextButtonInfo'],
  components: { NextStepButton },
  computed: {
    nextDirection () {
      var d = direction(this.$route.path, this.nextPage)
      console.log('DIRECTION', this.$route.path, this.nextPage, d)
      return d
    }
  }
}
</script>
<style lang="less">

.page {
  background-color: #fff;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  .page-content {
    height: 85%;
    max-height: 85%;
    width: 100%;
    overflow: hidden;
  }

  .next-button {
    height: 15%;
    max-height: 15%;
    overflow: hidden;
  }

}

</style>
