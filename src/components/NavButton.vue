<template>
  <button
    class="nav-button"
    :class="{active: isActive}"
    @click="onClick"
    @mousedown="isActive = true"
    @mouseup="isActive = false"
    @touchstart="isActive = true"
    @touchend="isActive = false"
    type="button"
  >
    <div class="chevron animated" :class="[direction]">
      <svg width="100%" height="100%" viewBox="-35 -60 70 120" xmlns="http://www.w3.org/2000/svg">
        <path d="M -25 -60 L 35 0 L -25 60 L -35 50 L 15 0 L -35 -50 z" />
      </svg>
    </div>
    <span v-if="info" class="button-info">{{info}}<br></span>
    <span class="button-main">{{label}}</span>
  </button>
</template>
<script>
export default {
  props: ['label', 'page', 'info', 'direction'],
  data () {
    return {
      isActive: false
    }
  },
  methods: {
    onClick (ev) {
      this.$router.replace(this.page)
      this.$emit('go')
    }
  }
}
</script>
<style lang="less">

button.nav-button {

  @bgcolor: #d6975c;
  background-color: @bgcolor;
  color: #fff;
  position: relative;
  width: 100%;
  padding: 0.2em;
  .button-main {
    text-transform: uppercase;
  }
  .button-info {
    line-height: 0.7em;
    font-size: 0.5em;
  }
  &.active {
    background-color: darken(@bgcolor, 20%);
    text-shadow: darken(@bgcolor, 55%);
  }
  text-shadow: 0 0 1px darken(@bgcolor, 40%);
  .chevron {
    @w: 21px;
    @h: 36px;
    width: @w;
    position: absolute;
    right: @w;
    top: 50%;
    margin-top: -@h/2;
    svg {
      filter: drop-shadow( 0 0 1px darken(@bgcolor, 40%));
      path {
        fill: currentColor;
      }
    }
    &.left {
      svg path {
        transform: scale(-1, 1)
      }
      left: @w/2;
    }
    &.right {
      right: @w/2;
    }
  }
}
</style>
