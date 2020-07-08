<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" ref="navbar" @titleClick="titleClick"></detail-nav-bar>
    <scroll @scroll="scroll" :probeType="3" class="content" ref="scroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="param" :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <!-- <detail-btn-bar></detail-btn-bar> -->
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import GoodsList from 'components/content/goodsList/GoodsList'

  import Scroll from 'components/common/scroll/Scroll'

  import {getDetail, getRecommend, GoodsInfo, ShopInfo, GoodsParam} from 'network/detail'
  
  import {debounce} from 'common/utils'
  import {itemListenerMixin} from 'common/mixins'

  export default {
    name: 'Detail',
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,

      GoodsList,

      Scroll,
    },
    data(){
      return{
        iid:0,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo: {},
        commentInfo: {},
        recommends:[],
        themeTopYs:[],
        currentIndex:0,
        getThemeTopY:null,

      }
    },
    created(){
      this.iid = this.$route.params.iid
      getDetail(this.iid).then(res => {
        const data = res.result
        this.topImages = data.itemInfo.topImages
        this.goods = new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services)
        this.shop = new ShopInfo(data.shopInfo)
        this.detailInfo = data.detailInfo
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
      })
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        let topBar = 44
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop-topBar)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop-topBar)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-topBar)
      },200)
    },
    mixins: [itemListenerMixin],
    destroyed(){
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
      imageLoad(){
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      scroll(position){
        for(let i = 0,length = this.themeTopYs.length; i < length; i++){
          if(-position.y < this.themeTopYs[i] && -position.y >= 0){
            this.$refs.navbar.currentIndex = i-1
            break
          }
        }
      },
      addToCart(){
        const product = {}
        product.iid = this.iid
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.newPrice
        this.$store.dispatch('addCart',product).then(res =>{
          console.log(res);
        })
      }
    }
  }
</script>

<style scoped lang="less">
#detail{
  position: relative;
  background-color: #fff;
  height: 100vh;
  overflow: hidden;
  width: 100%;
  z-index:999;
  .detail-nav{
    position: relative;
    background-color: #fff;
    z-index: 99;
  }
  .content{
    height: calc(100vh - 44px - 49px)
  }
}
</style>