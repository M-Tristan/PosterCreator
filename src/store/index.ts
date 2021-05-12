import { createStore } from 'vuex'
import {background, canvas, chart, code, image,itemBase,operItem,shape,text} from '../interface/module'
import { v4 as uuids4 } from 'uuid';
import PositionUtil from '@/lib/PositionUtil';
export default createStore({
  state: {
    postInfo:{
      images:new Array<image>(),
      texts:new Array<text>(),
      codes:new Array<code>(),
      charts:new Array<chart>(),
      layers:new Array<operItem>(),
      shapes:new Array<shape>(),
      background:<background>new Object(),
      canvas:<canvas>new Object()
    },
    editModule:<itemBase>new Object(),//当前编辑模块
    clipOper:false,
    group:undefined as any,
    editSize:{width:800,height:800},
    scale:100
  },
  mutations: {
    setScale(state,scale){
      state.scale = scale
    },
    setEditSize(state,size){
      state.editSize.width = size.width
      state.editSize.height = size.height
    },
    addChart(state,chart:chart){
      chart.type='chart'
      chart.zindex = state.postInfo.layers.length
      state.postInfo.charts.push(chart)
      state.postInfo.layers.push(chart)
    },
    addShape(state,shape:shape){
      shape.type='shape'
      shape.zindex = state.postInfo.layers.length
      state.postInfo.shapes.push(shape)
      state.postInfo.layers.push(shape)
    },
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
        color:`white`,
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
    },
    batchSelect(state,position){
      state.group = {ids:new Array<string>(),operItems:new Array<any>(),rotate:0,type:'group'}
      
      let positionInfo = {
        top:position.top,
        left:position.left,
        width:position.width,
        height:position.height
      }
      let minLeft = Number.MAX_VALUE
      let maxLeft = Number.MIN_VALUE
      let minTop = Number.MAX_VALUE
      let maxTop = Number.MIN_VALUE
      state.postInfo.layers.forEach(item => {
        let res = PositionUtil.getPosition(item.left+item.width/2,item.top+item.height/2,item.width,item.height,item.rotate)
        let itemPositionInfo = {
          top:res.most.minTop,
          left:res.most.minLeft,
          width:res.most.maxLeft-res.most.minLeft,
          height:res.most.maxTop - res.most.minTop
        }
        
        if(PositionUtil.getSelectedByPosition(itemPositionInfo,positionInfo)){
          if(minLeft > itemPositionInfo.left){
            minLeft = itemPositionInfo.left
          }
          if(minTop > itemPositionInfo.top){
            minTop = itemPositionInfo.top
          }
          if(maxLeft < itemPositionInfo.left+itemPositionInfo.width){
            maxLeft = itemPositionInfo.left+itemPositionInfo.width
          }
          if(maxTop < itemPositionInfo.top+itemPositionInfo.height){
            maxTop = itemPositionInfo.top+itemPositionInfo.height
          }
          state.group.operItems.push({
            operItem:item
          })
          state.group.ids.push(item.id)
        }
      })
      
      if(state.group.ids.length == 0){
        state.group = undefined
      }else{
          state.group.left=minLeft
          state.group.top=minTop
          state.group.width=maxLeft - minLeft
          state.group.height=maxTop - minTop
          state.group.operItems.forEach(item=>{
            item.width = item.operItem.width/state.group.width
            item.height = item.operItem.height/state.group.height
            item.centerLeft = (item.operItem.left + item.operItem.width/2 - state.group.left)/state.group.width
            item.centerTop = (item.operItem.top + item.operItem.height/2 - state.group.top)/state.group.height
            item.rotate = item.operItem.rotate
            if(item.operItem.type == 'text'){
              item.fontSize = item.operItem.fontSize/state.group.width
              item.letterSpacing = item.operItem.letterSpacing/state.group.width
            }
          })
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
