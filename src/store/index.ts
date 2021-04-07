import { createStore } from 'vuex'
import {image,operItem,text} from '../interface/module'
export default createStore({
  state: {
    postInfo:{
      images:new Array<image>(),
      texts:new Array<text>(),
      layers:new Array<operItem>()
    },
    editModule:<operItem>new Object(),//当前编辑模块
    clipOper:false
  },
  mutations: {
    addImage(state,image:image){
      image.type='image'
      image.zindex = state.postInfo.layers.length
      state.postInfo.images.push(image)
      state.postInfo.layers.push(image)
    },
    addText(state,text:text){
      text.type='text'
      text.zindex = state.postInfo.layers.length
      state.postInfo.texts.push(text)
      state.postInfo.layers.push(text)
    },
    setEditModule(state,moduleId:string){
      state.editModule = <operItem>state.postInfo.layers.find(item=>item.id == moduleId )
    },
    setClipOper(state,val:boolean){
      state.clipOper = val
    }
  },
  actions: {
  },
  modules: {
  }
})
