import { createStore } from 'vuex'
import {image,postInfo,operItem} from '../interface/module'
export default createStore({
  state: {
    postInfo:{
      images:new Array<image>(),
      layer:new Array<operItem>()
    }
  },
  mutations: {
    addImage(state,image:image){
      image.zindex = state.postInfo.layer.length
      state.postInfo.images.push(image)
      state.postInfo.layer.push(image)
    }
  },
  actions: {
  },
  modules: {
  }
})
