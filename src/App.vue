<template>
  <div id="app">
    <transition :name="transition" appear>
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {
      transition: 'slide-left'
    }
  },
  watch: {
    '$route' (to) {
      if (to.path === '/start') this.transition = 'slide-right'
      else this.transition = 'slide-left'
    }
  }
}
</script>
<style lang="less">
*, ul, li, button, input, body {
  margin: 0;
  padding: 0;
  border: 0;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 24px;
}

html, body, div#app {
  margin: 0;
  padding: 0;
  border: 0;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #888;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
</style>
