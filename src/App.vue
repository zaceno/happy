<template>
    <div id="app">
      <transition :name="transition" appear>
        <router-view></router-view>
      </transition>
    </div>
</template>
<script>
import { direction } from './router'

export default {
  data () {
    return {
      prevPath: '/nothing',
      currentPath: this.$route.path
    }
  },
  computed: {
    nextDirection () {
      return direction(this._myPath, this.nextPage)
    },
    transition () {
      console.log('TRANS', this.prevPath, this.currentPath, direction(this.prevPath, this.currentPath))
      return 'slide-' + direction(this.prevPath, this.currentPath)
    }
  },
  watch: {
    '$route' (to) {
      this.prevPath = this.currentPath
      this.currentPath = to.path
    }
  }

}
</script>
<style lang="less">
@import './assets/transitions.less';

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

#app .page {
  .slide-transition()
}

</style>
