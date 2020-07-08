import {debounce} from './utils'
export const itemListenerMixin = {
  data(){
    return {
      itemImgListener:null,
    }
  },
  mounted(){
    let scrollRefresh = debounce(this.$refs.scroll.refresh,100)
    this.itemImgListener = () => {
      scrollRefresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}