<template>
  <li
    :class="{active: $store.state.currentVote === value}"
    @click="$store.commit('setVote', value)"
  >
    <div class="number">{{valstr}}</div>
    <div class="label">{{label}}</div>
    <div class="extra">{{extra}}</div>
    <icon class="smiley" :name="iconName"></icon>
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

  color: @color;
  background-color: @bgcolor;
  text-shadow: 0 0 1px darken(@bgcolor, 40%);

  @media screen and (min-height: 550px) {
    .extra { font-size: 0.65em }
  }

  @media screen and (max-height: 550px) {
    .number { font-size: 0.9em; }
    .label { font-size: 0.9em; }
    .extra { font-size: 0.6em; }
  }
  @media screen and (max-height: 500px) {
    .number { font-size: 0.8em; }
    .label { font-size: 0.8em; }
    .extra { font-size: 0.55em; }
  }
  @media screen and (max-height: 450px) {
    .number { font-size: 0.7em; }
    .label { font-size: 0.7em; }
    .extra { font-size: 0.5em; }
  }
  @media screen and (max-height: 400px) {
    .number { font-size: 0.6em; }
    .label { font-size: 0.6em; }
    .extra { font-size: 0.4em; }
  }

  .number {
    position: absolute;
    left: 0.3em;
    top: 0.3em;
  }

  .label {
    position: absolute;
    top: 0.2em;
    left: 2.0em;
  }

  .extra {
    position: absolute;
    top:2.2em;
    left: 2.7em;
    font-style: italic;
    &:before { content: '"'; }
    &:after { content: '"'; }
  }


  &.active {
    color: lighten(@color, 500%);
    background-color: darken(@bgcolor, 20%);
    text-shadow: 0 0 1px darken(@bgcolor, 50%);
  }


  .smiley {
    position: absolute;
    top: 0.2em;
    right: 0.2em;
    bottom: 0.2em;
    width: 2em;;
    svg *{
      stroke: currentColor;
      fill: transparent;
      stroke-width: 5;
      filter: drop-shadow( 0 0 2px darken(@bgcolor, 40%));
    }
  }

}

</style>
