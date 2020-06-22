<template>
  <div id="recommend">
    <div v-for="item in recommends" :key="item.title">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>    
  </div>
</template>

<script>
  export default {
    name: 'RecommendView',
    props: {
      recommends: {
        type: Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped lang="less">
  #recommend{
    display: flex;
    background-color: #fff;
    margin-top: 12px;
    font-size: 14px;
    border-bottom: 10px solid rgba(100, 100, 100, .1);
    div{
      padding: 7px;
      flex-grow: 1;
      text-align: center;
      a{
        display: block;
        img{
          width: 100%;
        }
        div{
          margin-top: 5px;
        }
      }
    } 
  }
</style>