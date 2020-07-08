<template>
   <div>
       <nav-bar class="nav-bar">
         <template #center>购物车({{cartLength}})</template>
       </nav-bar>
       <scroll class="content" ref="scroll">
         <cart-list></cart-list>
       </scroll>
      <bottom-bar></bottom-bar>
   </div>
</template>

<script>
   import CartList from './childComps/CartList'
   import BottomBar from './childComps/BottomBar'

   import NavBar from 'components/common/navbar/NavBar'
   import Scroll from 'components/common/scroll/Scroll'
   import {mapGetters} from 'vuex'
   export default {
      name:'Cart',
      components:{
         CartList,
         BottomBar,

         NavBar,
         Scroll,

      },
      activated(){
         this.$refs.scroll.refresh()
      },
      computed: {
         ...mapGetters([
            'cartLength'
         ])
      }
   }
</script>

<style scoped lang="less">
   .nav-bar{
      background-color: @color-tint;
      color: white;
   }
   .content{
      height: calc(100vh - 44px - 49px);
      width: 100%;
      overflow: hidden;
   }
</style>