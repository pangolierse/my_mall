<template>
  <div>
    <nav-bar>
      <template #left>
        <div class="back" @click="backLink">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
      </template>
      <template #center>
        <div class="nav-center"> 
          <div v-for="(item,index) in titles" :key="item" class="title-item" 
          :class="{active: index === currentIndex}"
          @click="tabClick(index)"
          >{{item}}</div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
  import TabControll from 'components/content/tabControll/TabControll.vue'
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: 'DetailNavBar',
    components:{
      NavBar,
      TabControll,

    },
    data(){
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex:0,

      }
    },
    methods:{
      tabClick(index){
        this.currentIndex = index
        console.log('tabClick');
      },
      backLink(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .title-item{
    flex: 1;
    font-size: 14px;
    /* display: inline-block; */
    /* opacity: 0; */
  }
  .active{
    color: red;
  }
  .back{
    margin-top: 6px;
    text-align: center;
  }
  .nav-center{
    display: flex;
  }
</style>