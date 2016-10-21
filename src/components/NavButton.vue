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
    <i class="arrow right"></i>
    <span class="button-info">{{info}}</span>
    <span class="button-main">{{label}}</span>
  </button>
</template>
<script>
export default {
  props: ['label', 'page', 'info'],
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
@import '../assets/fontawesome/path.less';
@import '../assets/fontawesome/variables.less';
@import '../assets/fontawesome/core.less';
@import '../assets/fontawesome/larger.less';
@import '../assets/fontawesome/bordered-pulled.less';

button.nav-button {

  @bgcolor: #d6975c;
  background-color: @bgcolor;
  color: #fff;
  padding: 2em;
  position: relative;

  i.arrow.right {
    display: block;
    position: absolute;
    right: 4px;
    .fa();
    .fa-2x();
    &:before { content: @fa-var-chevron-right; }
    height: 28px;
    top: 50%;
    margin-top: -14px;
  }
/*    i {
      vertical-align: middle;
    }
  }*/

  &.active {
    background-color: darken(@bgcolor, 20%);
    text-shadow: darken(@bgcolor, 55%);
  }
  span.button-main {
    font-size: 2em;
    font-weight: bold;

  }
  text-shadow: 0 0 1px darken(@bgcolor, 40%);
}
</style>
