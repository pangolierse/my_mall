<template>
  <div id="cart-list">
    <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"></cart-list-item>
  </div>
</template>

<script>
  import CartListItem from './CartListItem.vue'
  import { mapGetters } from 'vuex'
  export default {
    name: 'CartList',
    components: {
      CartListItem,
    },
    computed: {
      ...mapGetters([
        'cartList'
      ])
    }
  }
</script>

<style scoped lang="less">
  // #cart-list{
    
  // }
</style>