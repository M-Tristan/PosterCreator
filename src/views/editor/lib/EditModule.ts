import {  canvas, chart, code, image, operItem, shape, text, effectText, group, background } from '@/interface/module'
import PositionUtil from "@/lib/PositionUtil";
import _ from "lodash";
import { v4 as uuids4 } from 'uuid';
class EditModule{
    postInfo: { layers: operItem[]; groups: group[]; background: background; canvas: canvas; } 
    postList: any[];
    backList: any[];
    nextList: any[];
    editModule: any;
    scale: number;
    editSize: { width: number; height: number; };
    group: any;
    clipOper: boolean;
    constructor(){
        this.postInfo= {
            layers: new Array<operItem>(),
            groups: new Array<group>(),
            background: <background>new Object(),
            canvas: <canvas>new Object()
          }
          this.postList=new Array<any>(),
          this.backList= new Array<any>(),
          this.nextList= new Array<any>(),
          this.editModule= <any>new Object(),//当前编辑模块
          this.clipOper= false,
          this.group= undefined,
          this.editSize= { width: 800, height: 800 },
          this.scale= 100
    }
    layerAdjustment(type) {
        let index = this.editModule.zindex
        this.editModule.zindex = 1000
        let changeModule
        switch (type) {
          case "up":
            if (index != this.postInfo.layers.length - 1) {
              this.postInfo.layers[index].zindex = index + 1
              this.postInfo.layers[index + 1].zindex = index
            }
            break;
          case "down":
            if (index != 0) {
              changeModule = this.postInfo.layers[index - 1]
              this.postInfo.layers[index].zindex = index - 1
              this.postInfo.layers[index - 1].zindex = index
            }
            break;
          case "top":
            if (index != this.postInfo.layers.length - 1) {
              this.postInfo.layers[index].zindex = this.postInfo.layers.length - 1
              this.postInfo.layers[this.postInfo.layers.length - 1].zindex = index
            }
            break;
          case "bottom":
            if (index != 0) {
              this.postInfo.layers[index].zindex = 0
              this.postInfo.layers[0].zindex = index
  
            }
            break;
        }
        this.postInfo.layers.sort((layero, layert) => {
          return layero.zindex - layert.zindex
        })
      }
      positionAdjustment(type) {
        let canvas = this.postInfo.canvas
        let range = {
          top: 0,
          left: 0,
          width: canvas.width,
          height: canvas.height
        }
        let editModule = this.editModule as operItem
        let res = PositionUtil.getPosition(editModule.left + editModule.width / 2, editModule.top + editModule.height / 2, editModule.width, editModule.height, editModule.rotate)
        let itemPositionInfo = {
          top: res.most.minTop,
          left: res.most.minLeft,
          width: res.most.maxLeft - res.most.minLeft,
          height: res.most.maxTop - res.most.minTop
        }
        switch (type) {
          case "top":
            editModule.top -= (itemPositionInfo.top - range.top)
            break;
          case "bottom":
            editModule.top -= (itemPositionInfo.top + itemPositionInfo.height - range.top - range.height)
            break;
          case "left":
            editModule.left -= (itemPositionInfo.left - range.left)
            break;
          case "right":
            editModule.left -= (itemPositionInfo.left + itemPositionInfo.width - range.left - range.width)
            break;
          case "horizontally":
            editModule.top -= (itemPositionInfo.top + itemPositionInfo.height / 2 - range.height / 2)
            break;
          case "verticalcenter":
            editModule.left -= (itemPositionInfo.left + itemPositionInfo.width / 2 - range.left - range.width / 2)
            break
        }
      }
      next() {
        let postthis = this.nextList.pop()
        this.backList.push(postthis)
        this.postInfo = _.cloneDeep(postthis.postInfo)
        this.postList = _.cloneDeep(postthis.postList)
      }
      back() {
        let postthis = this.backList.pop()
        this.nextList.push(postthis)
        this.postInfo = _.cloneDeep(this.backList[this.backList.length - 1].postInfo)
        this.postList = _.cloneDeep(this.backList[this.backList.length - 1].postList)
      }
      pushBack() {
          
        let editgroup = this.group
        if (editgroup != undefined && editgroup.id) {
          let group = this.postInfo.groups.find(item => {
            return item.id == (editgroup as group).id
          })
          if (group) {
            group.height = editgroup.height
            group.width = editgroup.width
            group.top = editgroup.top
            group.left = editgroup.left
            group.rotate = editgroup.rotate
          }
  
        }
        this.backList.push({
          postInfo: _.cloneDeep(this.postInfo),
          postList: _.cloneDeep(this.postList)
        })
        this.nextList = []
      }
  
      deletePostByIndex(index) {
        this.postList.splice(index, 1)
        this.postInfo = this.postList[0]
      }
      selectPostByIndex(index) {
        this.postInfo = this.postList[index]
      }
      setScale(scale) {
        this.scale = scale
      }
      setEditSize(size) {
        this.editSize.width = size.width
        this.editSize.height = size.height
      }
      addChart(chart: chart) {
        chart.type = 'chart'
        chart.zindex = this.postInfo.layers.length
        this.postInfo.layers.push(chart)
      }
      addEffectText(effectText: effectText) {
        effectText.type = 'effectText'
      }
      addShape(shape: shape) {
        shape.type = 'shape'
        shape.zindex = this.postInfo.layers.length
        this.postInfo.layers.push(shape)
      }
      addImage(image: image) {
        image.type = 'image'
        image.zindex = this.postInfo.layers.length
        this.postInfo.layers.push(image)
      }
      addText(text: text) {
        text.type = 'text'
        text.zindex = this.postInfo.layers.length
        this.postInfo.layers.push(text)
      }
      addCode(code: code) {
        code.type = 'code'
        code.zindex = this.postInfo.layers.length
        this.postInfo.layers.push(code)
      }
      addBack(back: background) {
        back.type = 'back'
        this.postInfo.background = back
      }
      addCanvas(canvas: canvas) {
        let postInfo = {
          groups: new Array<group>(),
          layers: new Array<operItem>(),
          background: <background>new Object(),
          canvas: <canvas>new Object()
        }
        postInfo.canvas = canvas
        this.postList.push(postInfo)
  
        this.postInfo = postInfo
      }
      /**
       * 
       * @param this 设置组合
       */
      addGroup() {
          if(!this.group){
            return
          }
        let groupId = uuids4();
        let group = {} as group
        group.type = 'group'
        this.group.id = groupId
        group.id = this.group.id
        group.layerIds = this.group.layerIds
        group.layerIds.forEach(id => {
          let layer = this.postInfo.layers.find(item => item.id == id)
          if (layer) {
            layer.groupId = groupId
          }
  
        })
        group.top = this.group.top
        group.left = this.group.left
        group.width = this.group.width
        group.height = this.group.height
        group.rotate = this.group.rotate
        this.postInfo.groups.push(group)
      }
      setEditModule(moduleId: string) {
        this.editModule = <operItem>this.postInfo.layers.find(item => item.id == moduleId)
        if (this.editModule.groupId) {
          let groupId = this.editModule.groupId
          let group = this.postInfo.groups.find(item => {
            return item.id == this.editModule.groupId
          })
          if (!this.group || this.group.id != groupId) {
            this.group = ({ ...group } as group)
          }
        }
      }
      setEditModuleToBack() {
        this.editModule = this.postInfo.background
      }
      setClipOper(val: boolean) {
        this.clipOper = val
      }
      initBack() {
        this.postInfo.background = {
          id: uuids4(),
          type: 'back',
          color: `white`,
          opacity: 1,
          image: {
            width: 0,
            height: 0,
            top: 0,
            left: 0,
            src: '',
            blur: 0
          }
        }
      }
      addBackImage(image) {
        this.postInfo.background.image = image
      }
      batchSelect(position) {
        this.group = { layerIds: new Array<string>(), rotate: 0, type: 'group' } as group
  
        let positionInfo = {
          top: position.top,
          left: position.left,
          width: position.width,
          height: position.height
        }
        let minLeft = Number.MAX_SAFE_INTEGER
        let maxLeft = Number.MIN_SAFE_INTEGER
        let minTop = Number.MAX_SAFE_INTEGER
        let maxTop = Number.MIN_SAFE_INTEGER
        // let pointList: { left: number, top: number }[] = []
        this.postInfo.layers.forEach(item => {
          if (item.lock) {
            return
          }
          let res = PositionUtil.getPosition(item.left + item.width / 2, item.top + item.height / 2, item.width, item.height, item.rotate)
          let itemPositionInfo = {
            top: res.most.minTop,
            left: res.most.minLeft,
            width: res.most.maxLeft - res.most.minLeft,
            height: res.most.maxTop - res.most.minTop
          }
  
          if (PositionUtil.getSelectedByPosition(itemPositionInfo, positionInfo)) {
            // pointList.push(res.leftTop)
            // pointList.push(res.leftBottom)
            // pointList.push(res.rightTop)
            // pointList.push(res.rightBottom)
            if (minLeft > itemPositionInfo.left) {
              minLeft = itemPositionInfo.left
            }
            if (minTop > itemPositionInfo.top) {
              minTop = itemPositionInfo.top
            }
            if (maxLeft < itemPositionInfo.left + itemPositionInfo.width) {
              maxLeft = itemPositionInfo.left + itemPositionInfo.width
            }
            if (maxTop < itemPositionInfo.top + itemPositionInfo.height) {
              maxTop = itemPositionInfo.top + itemPositionInfo.height
            }
            // this.group.operItems.push({
            //   operItem: item
            // })
            if(this.group){
                this.group.layerIds.push(item.id)
            }
            
          }
        })
  
        if (this.group.layerIds.length == 0) {
          this.group = undefined
        } else {
          this.group.left = minLeft
          this.group.top = minTop
          this.group.width = maxLeft - minLeft
          this.group.height = maxTop - minTop
      
        }
      }
      initGroupSize() {
          if(!this.group){
              return
          }
        let pointList: { left: number, top: number }[] = []
        this.group.operItems.forEach(operItem => {
          let item = operItem.operItem
          let res = PositionUtil.getPosition(item.left + item.width / 2, item.top + item.height / 2, item.width, item.height, item.rotate)
          pointList.push(res.leftTop)
          pointList.push(res.leftBottom)
          pointList.push(res.rightTop)
          pointList.push(res.rightBottom)
        })
        let anglePositionInfo = PositionUtil.getGroupPositionInfo(pointList, this.group.rotate)
        this.group.width = anglePositionInfo.width
        this.group.height = anglePositionInfo.height
        this.group.top = anglePositionInfo.top
        this.group.left = anglePositionInfo.left
        this.group.operItems = undefined
      }
      lock() {
        this.editModule.lock = true
      }
      unlock() {
        this.editModule.lock = false
      }
      delete() {
        let index = this.editModule.zindex
        this.postInfo.layers.splice(index, 1)
        this.postInfo.layers = [...this.postInfo.layers]
        this.postInfo.layers.forEach((item, index) => {
          item.zindex = index
        })
        this.editModule = this.postInfo.background
      }
}

export default new EditModule()