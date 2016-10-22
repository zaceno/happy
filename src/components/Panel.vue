<template>
  <div class="panel-outer">
    <div class="panel-inner">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="less">
.panel-outer {
  position: relative;

  .panel-inner {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 0px;
    overflow: hidden;
    background: #eee;
    border: 1px solid #ddd;
    padding: 0.5em;
    color: #555;
    text-shadow: 0px 1px 1px #fff;

    @media screen and (max-height: 550px) {
      font-size: 0.9em;
    }
    @media screen and (max-height: 500px) {
      font-size: 0.8em;
    }
    @media screen and (max-height: 400px) {
      font-size: 0.7em;
    }
    @media screen and (min-height: 650px) {
      font-size: 1.2em;
    }
  }

}

</style>
