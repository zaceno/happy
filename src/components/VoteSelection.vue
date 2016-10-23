<template>
  <li
    class="vote-option"
    :class="{active: $store.state.currentVote === value}"
    @mousedown="select"
    @touchstart="select"
  >
    <div class="label">{{labelstr}}</div>
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
  methods: {
    select () {
      this.$store.commit('setVote', this.value)
    }
  },
  computed: {
    labelstr () {
      if (this.value === 0) return LABELS[0]
      return `${this.value}: ${LABELS[this.value]}`
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
li.vote-option {
  @bgcolor: #3cb8ea ;
  @color: lighten(@bgcolor, 25%);

  position: relative;

  color: @color;
  background-color: @bgcolor;
  text-shadow: 0 0 1px darken(@bgcolor, 40%);
  border-bottom: 1px lighten(@bgcolor, 15%) solid;


  .label {
    position: absolute;
    top: 0.4em;
    left: 3em;
  }

  .extra {
    position: absolute;
    top: 2.5em;
    left: 4em;
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
    left: 0.2em;
    bottom: 0.2em;
    width: 2em;;
    svg *{
      stroke: currentColor;
      fill: transparent;
      stroke-width: 5;
      filter: drop-shadow( 0 0 2px darken(@bgcolor, 40%));
    }
  }

  @media screen and (min-height: 550px) {
    .extra { font-size: 0.65em }
  }

  @media screen and (max-height: 550px) {
    .label { font-size: 0.9em; }
    .extra { font-size: 0.6em; }
  }
  @media screen and (max-height: 500px) {
    .label { font-size: 0.8em; }
    .extra { font-size: 0.55em; }
    .smiley { left: 0.1em; }
  }
  @media screen and (max-height: 450px) {
    .label { font-size: 0.7em; }
    .extra { font-size: 0.5em; }
    .smiley { left: 0; }
  }
  @media screen and (max-height: 400px) {
    .label { font-size: 0.6em; }
    .extra { font-size: 0.4em; }
    .smiley { left: -0.2em; }
  }


}

</style>
