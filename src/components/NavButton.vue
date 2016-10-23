<template>
  <button
    class="nav-button"
    :class="{active: isActive}"
    @click="onClick"
    @mousedown="activate"
    @mouseup="deactivate"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
    type="button"
  >
    <div class="chevron animated" :class="[direction]">
      <svg width="100%" height="100%" viewBox="-35 -60 70 120" xmlns="http://www.w3.org/2000/svg">
        <path d="M -25 -60 L 35 0 L -25 60 L -35 50 L 15 0 L -35 -50 z" />
      </svg>
    </div>
    <div v-if="info" class="button-info">{{info}}</div>
    <div class="button-main">{{label}}</div>
  </button>
</template>
<script>
var touchEnabled = false

export default {
  props: ['label', 'page', 'info', 'direction'],
  data () {
    return {
      isActive: false
    }
  },
  methods: {
    doAction () {
      this.$router.replace(this.page)
      this.$emit('go')
    },
    activate () {
      this.isActive = true
    },
    deactivate () {
      this.isActive = false
    },
    onClick (ev) {
      if (touchEnabled) {
        ev.preventDefault(true)
        return
      }
      this.doAction()
    },
    onTouchStart (ev) {
      touchEnabled = true
      this.isActive = true
    },
    onTouchEnd (ev) {
      this.isActive = false
      this.doAction()
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
  overflow: hidden;

  .button-main {
    text-transform: uppercase;
  }
  .button-info {
    font-size: 0.6em;
  }

  @media screen and (max-height: 350px) {
    .button-main { font-size: 0.8em; }
    .button-info { font-size: 0.5em; }
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
