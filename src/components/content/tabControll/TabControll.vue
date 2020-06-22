<template>
  <div id="tab-controll">
    <div v-for="(item, index) in titles" 
      :key="item" 
      :class="{active: index === currentIndex}"
      @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabControll',
    data(){
      return{
        currentIndex:0
      }
    },
    props: {
      titles:{
        type: Array,
        default(){
          return []
        }
      }
    },
    methods: {
      itemClick(index){
        this.currentIndex = index
        this.$emit('tabClick',index)
      }
    }
  }
</script>

<style scoped lang="less">
  #tab-controll{
    display: flex;
    font-size: 15px;
    justify-content: space-around;
    position: sticky;
    top: 44px;
    background-color: #fff;
    div{
      padding: 8px;
      // border: 2px solid black;
    }
    .active{
      color: palevioletred;
      border-bottom: 2px solid palevioletred;
    }
  }
</style>