<template>
  <div id="goodsItem" @click="itemClick">
    <a  >
      <img :src="showImage" @load="imageLoad" alt="">
      <div class="goods-Info">
        <p>{{goodsItem.title}}</p>
        <span class="price">￥{{goodsItem.price}}</span>
        <span class="collect">{{goodsItem.cfav}}</span>
      </div>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'GoodListItem',
    props: {
      goodsItem: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    computed: {
      showImage(){
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      imageLoad(){
        this.$bus.$emit('itemImageLoad');
      },
      itemClick(){
        this.$router.push('/detail/'+this.goodsItem.iid)
      }
    }
  }
</script>

<style scoped lang="less">
  #goodsItem{
    width: 50%;
    box-sizing: border-box;
    padding: 5px;
    font-size: 14px;
    img{
      width: 100%;
      border-radius: 10px;
    }
    .goods-Info{      
      padding: 2px 10px;
      text-align: center;
      p{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: block;  
      }
      .price{
        color: red;
        margin-right: 20px;
      }
      .collect{
        position: relative;
      }
      .collect::before{
        content: '';
        width: 14px;
        height: 14px;
        position: absolute;
        top: 1px;
        left: -14px;
        vertical-align: bottom;
        background-image: url("~assets/img/common/collect.svg");
        background-size: 14px;
      }
    }
  }
</style>