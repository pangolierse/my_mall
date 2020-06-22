<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
      <!-- <template v-slot: left></template> -->
    </div>
    <div class="center">
      <slot name="center"></slot>
      <!-- <template v-slot: center></template> -->
    </div>
    <div class="right">
      <slot name="right"></slot>
      <!-- <template v-slot: right></template> -->
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
      text-align: center;
    }
    .left,.right{
      width: 60px;
      // background-color: blue;
    }
  }
</style>