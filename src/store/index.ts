import { createStore } from 'vuex'
import {image,postInfo} from '../interface/module'
export default createStore({
  state: {
    postInfo:{
      images:new Array()
    }
  },
  mutations: {
    addImage(state,image:image){
      state.postInfo.images.push(image)
    }
  },
  actions: {
  },
  modules: {
  }
})
