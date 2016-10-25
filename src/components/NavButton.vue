<template>
  <button
    class="nav-button"
    :class="{active: isActive, left: direction==='left', right: direction==='right' }"
    @click="onClick"
    @mousedown="activate"
    @mouseup="deactivate"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
    type="button"
  >
    <icon name="chevron" class="chevron" :class="{left: direction==='left', right: direction==='right'}"></icon>
    <icon v-if="isToRestart" name="chevron" class="chevron left double-back" ></icon>
    <div v-if="info" class="button-info">{{info}}</div>
    <div class="button-main">{{label}}</div>
  </button>
</template>
<script>
import Icon from './Icon.vue'

var touchEnabled = false

export default {
  components: {Icon},
  props: ['label', 'page', 'info', 'direction'],
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    isToRestart () { return this.$route.path === '/reset' }
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
@import '../assets/icon.less';

button.nav-button {

  @color: #fff;
  @bgColor: #d6975c;
  @dropShadowColor: darken(@bgColor, 40%);
  @activeBgColor: darken(@bgColor, 20%);
  @activeDropShadowColor: darken(@bgColor, 55%);

  position: relative;
  width: 100%;
  overflow: hidden;
  color: @color;
  background-color: @bgColor;
  text-shadow: 0 0 1px @dropShadowColor;
  &.active {
    background-color: @activeBgColor;
    text-shadow: @activeDropShadowColor;
  }

  .button-main { text-transform: uppercase; }
  .button-info { font-size: 0.6em; }

  @media screen and (max-height: 350px) {
    .button-main { font-size: 0.8em; }
    .button-info { font-size: 0.5em; }
  }

  .chevron {
    .icon(@color, @bgColor);
    @w: 21px;
    @h: 36px;
    position: absolute;
    width: @w;
    top: 50%;
    margin-top: -@h/2;
    &.left {
      left: @w/2;
      .icon-hflip();
    }
    &.double-back {
      left: @w;
    }
    &.right {
      right: @w/2;
    }
  }
}
</style>
