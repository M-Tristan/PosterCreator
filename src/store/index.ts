import { createStore } from 'vuex'
import {background, code, image,itemBase,operItem,text} from '../interface/module'
export default createStore({
  state: {
    postInfo:{
      images:new Array<image>(),
      texts:new Array<text>(),
      codes:new Array<code>(),
      layers:new Array<operItem>(),
      background:<background>new Object()
    },
    editModule:<itemBase>new Object(),//当前编辑模块
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
    addCode(state,code:code){
      code.type='code'
      code.zindex = state.postInfo.layers.length
      state.postInfo.codes.push(code)
      state.postInfo.layers.push(code)
    },
    addBack(state,back:background){
      state.postInfo.background = back
    },
    setBackground(state,url:string){
      state.postInfo.background.color = 'rgba(0,0,0,0)'
      state.postInfo.background.imageUrl = url
    },
    setEditModule(state,moduleId:string){
      state.editModule = <operItem>state.postInfo.layers.find(item=>item.id == moduleId )
    },
    setEditModuleToBack(state){
      state.editModule = state.postInfo.background
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
