<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImages="topImages"></detail-swiper>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import {getDetail, GoodsInfo} from 'network/detail'
  export default {
    name: 'Detail',
    components:{
      DetailNavBar,
      DetailSwiper,
    },
    data(){
      return{
        iid:0,
        topImages:[],
        goods:{}
      }
    },
    created(){
      this.iid = this.$route.params.iid
      getDetail(this.iid).then(res => {
        const data = res.result
        this.topImages = data.itemInfo.topImages
        this.goods = new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services)

      })
      // console.log(this.iid);
    }
  }
</script>

<style scoped>

</style>