<template>
  <div id="goods">

    <goods-list-item v-for="(item,index) in goods" 
      :key="index"
      :goodsItem="item"
    />
  </div>
</template>

<script>
  import GoodsListItem from './GoodListItem'
  export default {
    name: 'GoodsList',
    props: {
      goods: {
        type: Array,
        default(){
          return []
        }
      }
    },
    components: {
      GoodsListItem
    }
  }
</script>

<style scoped lang="less">
  #goods{
    display: flex;
    flex-wrap: wrap;
  }
</style>