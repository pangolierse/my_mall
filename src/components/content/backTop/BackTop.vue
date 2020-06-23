<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">  
  </div>
</template>

<script>
  export default {
    name: 'BackTop',
  }
</script>

<style scoped lang="less">
.back-top{
  position: fixed;
  right: 5px;
  bottom: 60px;
  img{
    width: 40px;
    opacity: .8;
  }
}

</style>