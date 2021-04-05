import { createStore } from 'vuex'
import {image,operItem} from '../interface/module'
export default createStore({
  state: {
    postInfo:{
      images:new Array<image>(),
      layer:new Array<operItem>()
    },
    editModule:<operItem>new Object()//当前编辑模块
  },
  mutations: {
    addImage(state,image:image){
      image.zindex = state.postInfo.layer.length
      state.postInfo.images.push(image)
      state.postInfo.layer.push(image)
    },
    setEditModule(state,moduleId:string){
      state.editModule = <operItem>state.postInfo.layer.find(item=>item.id == moduleId )
    }
  },
  actions: {
  },
  modules: {
  }
})
