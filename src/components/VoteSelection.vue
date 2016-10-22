<template>
  <li
    :class="{active: $store.state.currentVote === value}"
    @click="$store.commit('setVote', value)"
  >
    <div class="number">{{valstr}}</div>
    <div class="label">{{label}}</div>
    <div class="extra">{{extra}}</div>
    <icon :name="iconName"></icon>
  </li>
</template>
<script>
import Icon from './Icon.vue'

const LABELS = {
  0: 'No Vote',
  5: 'Very Happy',
  4: 'Happy',
  3: "Don't know",
  2: 'Unhappy',
  1: 'Very Unhappy'
}

const EXTRA = {
  0: 'I don\'t want to participate',
  5: 'It should always be this way!',
  4: 'It can always get better!',
  3: 'Meh... / Mixed feelings',
  2: 'A lot needs to change!',
  1: 'Why do I bother...'
}

const ICONS = {
  0: 'no face',
  5: 'very happy face',
  4: 'happy face',
  3: 'uncertain face',
  2: 'unhappy face',
  1: 'very unhappy face'
}

export default {
  components: { Icon },
  props: ['value'],
  computed: {
    valstr () {
//      if (this.value === 0) return ''
      return '' + this.value
    },
    label () {
      return LABELS[this.value]
    },
    extra () {
      return EXTRA[this.value]
    },
    iconName () {
      return ICONS[this.value]
    }
  }
}
</script>
<style lang="less">
/*  #78c5e4 */
li {
  @bgcolor: #3cb8ea ;
  @color: lighten(@bgcolor, 25%);

  position: relative;
  font-size: 0.8em;

  height: 1.88em;
  color: @color;
  background-color: @bgcolor;
  text-shadow: 0 0 1px darken(@bgcolor, 40%);

  .number {
    position: absolute;
    left: 0.3em;
    top: 0.3em;
  }

  .label {
    position: absolute;
    top: 0.2em;
    left: 2.0em;
    font-size: 0.8em;
  }

  .extra {
    position: absolute;
    top:2.2em;
    left: 3em;
    font-size: 0.5em;
    font-style: italic;
    &:before { content: '"'; }
    &:after { content: '"'; }
  }


  &.active {
    color: lighten(@color, 500%);
    background-color: darken(@bgcolor, 20%);
    text-shadow: 0 0 1px darken(@bgcolor, 50%);
  }


  .icon {
    width: 1.3em;
    height: 1.3em;
    position: absolute;
    top: 0.3em;
    right: 0.3em;
    svg *{
      stroke: currentColor;
      fill: transparent;
      stroke-width: 5;
      filter: drop-shadow( 0 0 2px darken(@bgcolor, 40%));
    }
  }

}

</style>
