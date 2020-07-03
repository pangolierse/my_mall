<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped lang="less">
  .nav-bar{
    display: flex;
    height: 44px;
    line-height: 44px;
    box-shadow: 0px 1px 1px rgba(100, 100, 100, .1);
    .center{
      flex-grow: 1;
      // background-color: red;
      // display: flex;
      text-align: center;
    }
    .left,.right{
      width: 60px;
      // background-color: blue;
    }
  }
</style>