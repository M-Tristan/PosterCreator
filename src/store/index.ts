import { createStore } from 'vuex'
import {background, canvas, code, image,itemBase,operItem,text} from '../interface/module'
import { v4 as uuids4 } from 'uuid';
export default createStore({
  state: {
    postInfo:{
      images:new Array<image>(),
      texts:new Array<text>(),
      codes:new Array<code>(),
      layers:new Array<operItem>(),
      background:<background>new Object(),
      canvas:<canvas>new Object()
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
      back.type='back'
      state.postInfo.background = back
    },
    addCanvas(state,canvas:canvas){
      state.postInfo.canvas = canvas
    },
    setEditModule(state,moduleId:string){
      state.editModule = <operItem>state.postInfo.layers.find(item=>item.id == moduleId )
    },
    setEditModuleToBack(state){
      state.editModule = state.postInfo.background
    },
    setClipOper(state,val:boolean){
      state.clipOper = val
    },
    initBack(state){
      state.postInfo.background = {
        id:uuids4(),
        type:'back',
        color:`rgba(0,0,0,0)`,
        opacity:1,
        image:{
              width:0,
              height:0,
              top:0,
              left:0,
              src:'',
              blur:0
        }
      }
    },
    addBackImage(state,image){
      state.postInfo.background.image = image
    }
  },
  actions: {
  },
  modules: {
  }
})
