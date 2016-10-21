<template>
  <ul>
    <li
    :class="{active: $store.state.currentVote === null}"
    @click="$store.commit('setVote', null)"
    >No vote</li>
    <li
    :class="{active: $store.state.currentVote === 5}"
    @click="$store.commit('setVote', 5)"
    >5</li>
    <li
    :class="{active: $store.state.currentVote === 4}"
    @click="$store.commit('setVote', 4)"
    >4</li>
    <li
    :class="{active: $store.state.currentVote === 3}"
    @click="$store.commit('setVote', 3)"
    >3</li>
    <li
    :class="{active: $store.state.currentVote === 2}"
    @click="$store.commit('setVote', 2)"
    >2</li>
    <li
    :class="{active: $store.state.currentVote === 1}"
    @click="$store.commit('setVote', 1)"
    >1</li>
  </ul>
</template>
<style>
li {
  height: 40px;
}

li.active {
  background-color: #ff99ff;
}
</style>
