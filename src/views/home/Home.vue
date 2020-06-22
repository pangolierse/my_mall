<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物车</template>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-controll @tabClick="tabClick" :titles="titles"></tab-controll>
    <goods-list :goods="showList"></goods-list>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControll from 'components/content/tabControll/TabControll'
import GoodsList from 'components/content/goodsList/GoodsList'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import { getHomeMultidata,getHomeGoods } from 'network/home'

export default {
  name: "Home",
  components: {
    NavBar,
    TabControll,
    GoodsList,

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
      currentType: 'pop'
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
    },
    /* 
      网络请求方法
    */
    getMultidata(){
      getHomeMultidata().then( res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
        console.log(res);
      })
    },
    getGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page ++
      })
    },
  }
};
</script>

<style scoped lang="less">
   #home{
     padding-top: 44px;
      .home-nav{
        background-color: @color-tint;
        color: #fff;
        position: fixed;
        z-index: 999;
        top: 0;
        right: 0;
        left: 0;
      }
   }
</style>