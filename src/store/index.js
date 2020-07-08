import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    cartList:[],

  },
  getters:{
    cartLength(state){
      return state.cartList.length
    },
    cartList(state){
      return state.cartList
    }
  },
  actions:{
    addCart({commit , state},payload){
      return new Promise((resolve,reject) => {
        let product  = state.cartList.find(item => item.iid === payload.iid)
        if(product){
          product.count ++
          resolve('当前商品数量加1')
        }
        else{
          payload.count = 1
          payload.checked = true
          state.cartList.push(payload)
          resolve('添加成功')
        }
      })
    }
  }
})

export default store