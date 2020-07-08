<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>首页</template>
    </nav-bar>
    <tab-controll @tabClick="tabClick" :titles="titles" ref="tabControll1" v-show="isTabFixed" class="tab-control" ></tab-controll>
    <scroll class="content" ref="scroll" 
      :probe-type="3"
      :pullUpLoad = "true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad.once="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-controll @tabClick="tabClick" :titles="titles" ref="tabControll2" ></tab-controll>
      <goods-list :goods="showList"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import TabControll from 'components/content/tabControll/TabControll'
import GoodsList from 'components/content/goodsList/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import {debounce} from 'common/utils'
import {itemListenerMixin} from 'common/mixins'

import { getHomeMultidata,getHomeGoods } from 'network/home'

export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,

    TabControll,
    GoodsList,
    BackTop,

    HomeSwiper,
    RecommendView,
    FeatureView,

  },
  data() {
    return{
      banners: [],
      recommends: [],
      titles:['流行','新款','精选'],
      goods:{
        'pop': {
          page: 0,
          list: []
        },
        'new': {
          page: 0,
          list: []
        },
        'sell': {
          page: 0,
          list: []
        },
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY : 0,
    }
  },
  computed: {
    showList(){
      return this.goods[this.currentType].list
    }
  }
  ,
  created() {
    this.getMultidata()
    this.getGoods('pop')
    this.getGoods('new')
    this.getGoods('sell')
    
  },
  mixins:[itemListenerMixin],
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y
    this.$bus.$off('itemImgLoad',itemImgListener)
  },
  methods: {
    /* 
      事件监听方法
    */
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.listState = goods[index]
      this.$refs.tabControll1.currentIndex = index;
      this.$refs.tabControll2.currentIndex = index;
    },
    backTop(){
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position){
      this.isShowBackTop = position.y < -1000

      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      this.getGoods(this.currentType)
    },
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControll2.$el.offsetTop
    },
    itemImgListener(){
      this.$refs.scroll && refresh();
    },
    /* 
      网络请求方法
    */
    getMultidata(){
      getHomeMultidata().then( res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
        // console.log(res);
      })
    },
    getGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page ++
        this.$refs.scroll.finishPullUp()
      })
    },
  }
};
</script>

<style scoped lang="less">
   #home{
    //  padding-top: 44px;
     position: relative;
      .home-nav{
        background-color: @color-tint;
        color: #fff;
      }
      .tab-control{
        top: 0;
        position: relative;
        z-index: 999;
      }
      .content{
        height: @view-height;
        position: absolute;
        top:44px;
        bottom: 49px;
        right: 0;
        left: 0;
        overflow: hidden;
      }
   }
</style>