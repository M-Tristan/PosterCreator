import { createStore } from 'vuex'
import { background, canvas, chart, code, image, operItem, shape, text, effectText, group } from '../interface/module'
import { v4 as uuids4 } from 'uuid';
import PositionUtil from '@/lib/PositionUtil';
import _ from 'lodash'
export default createStore({
  state: {
    postInfo: {
      layers: new Array<operItem>(),
      groups: new Array<group>(),
      background: <background>new Object(),
      canvas: <canvas>new Object()
    },
    postList: new Array<any>(),
    backList: new Array<any>(),
    nextList: new Array<any>(),
    editModule: <any>new Object(),//当前编辑模块
    clipOper: false,
    group: undefined as any,
    editSize: { width: 800, height: 800 },
    scale: 100
  },
  mutations: {
    layerAdjustment(state, type) {
      let index = state.editModule.zindex
      state.editModule.zindex = 1000
      let changeModule
      switch (type) {
        case "up":
          if (index != state.postInfo.layers.length - 1) {
            state.postInfo.layers[index].zindex = index + 1
            state.postInfo.layers[index + 1].zindex = index
          }
          break;
        case "down":
          if (index != 0) {
            changeModule = state.postInfo.layers[index - 1]
            state.postInfo.layers[index].zindex = index - 1
            state.postInfo.layers[index - 1].zindex = index
          }
          break;
        case "top":
          if (index != state.postInfo.layers.length - 1) {
            state.postInfo.layers[index].zindex = state.postInfo.layers.length - 1
            state.postInfo.layers[state.postInfo.layers.length - 1].zindex = index
          }
          break;
        case "bottom":
          if (index != 0) {
            state.postInfo.layers[index].zindex = 0
            state.postInfo.layers[0].zindex = index

          }
          break;
      }
      state.postInfo.layers.sort((layero, layert) => {
        return layero.zindex - layert.zindex
      })
    },
    positionAdjustment(state, type) {
      let canvas = state.postInfo.canvas
      let range = {
        top: 0,
        left: 0,
        width: canvas.width,
        height: canvas.height
      }
      let editModule = state.editModule as operItem
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
    },
    next(state) {
      let postState = state.nextList.pop()
      state.backList.push(postState)
      state.postInfo = _.cloneDeep(postState.postInfo)
      state.postList = _.cloneDeep(postState.postList)
    },
    back(state) {
      let postState = state.backList.pop()
      state.nextList.push(postState)
      state.postInfo = _.cloneDeep(state.backList[state.backList.length - 1].postInfo)
      state.postList = _.cloneDeep(state.backList[state.backList.length - 1].postList)
    },
    pushBack(state) {
      state.backList.push({
        postInfo: _.cloneDeep(state.postInfo),
        postList: _.cloneDeep(state.postList)
      })
      state.nextList = []
    },

    deletePostByIndex(state, index) {
      state.postList.splice(index, 1)
      state.postInfo = state.postList[0]
    },
    selectPostByIndex(state, index) {
      state.postInfo = state.postList[index]
    },
    setScale(state, scale) {
      state.scale = scale
    },
    setEditSize(state, size) {
      state.editSize.width = size.width
      state.editSize.height = size.height
    },
    addChart(state, chart: chart) {
      chart.type = 'chart'
      chart.zindex = state.postInfo.layers.length
      state.postInfo.layers.push(chart)
    },
    addEffectText(state, effectText: effectText) {
      effectText.type = 'effectText'
    },
    addShape(state, shape: shape) {
      shape.type = 'shape'
      shape.zindex = state.postInfo.layers.length
      state.postInfo.layers.push(shape)
    },
    addImage(state, image: image) {
      image.type = 'image'
      image.zindex = state.postInfo.layers.length
      state.postInfo.layers.push(image)
    },
    addText(state, text: text) {
      text.type = 'text'
      text.zindex = state.postInfo.layers.length
      state.postInfo.layers.push(text)
    },
    addCode(state, code: code) {
      code.type = 'code'
      code.zindex = state.postInfo.layers.length
      state.postInfo.layers.push(code)
    },
    addBack(state, back: background) {
      back.type = 'back'
      state.postInfo.background = back
    },
    addCanvas(state, canvas: canvas) {
      let postInfo = {
        groups: new Array<group>(),
        layers: new Array<operItem>(),
        background: <background>new Object(),
        canvas: <canvas>new Object()
      }
      postInfo.canvas = canvas
      state.postList.push(postInfo)

      state.postInfo = postInfo
    },
    /**
     * 
     * @param state 设置组合
     */
    addGroup(state) {
      let group = {} as group
      group.type = 'group'
      group.id = state.group.id
      group.layerIds = state.group.layersIds
      group.top = state.group.top
      group.left = state.group.left
      group.width = state.group.width
      group.height = state.group.height
      group.rotate = state.group.rotate
      state.postInfo.groups.push(group)
    },
    setEditModule(state, moduleId: string) {
      state.editModule = <operItem>state.postInfo.layers.find(item => item.id == moduleId)

      if (state.editModule.groupId) {
        let group = state.postInfo.groups.find(item => {
          return item.id = state.editModule.groupId
        })

        state.group = { ...group }
      }
    },
    setEditModuleToBack(state) {
      state.editModule = state.postInfo.background
    },
    setClipOper(state, val: boolean) {
      state.clipOper = val
    },
    initBack(state) {
      state.postInfo.background = {
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
    },
    addBackImage(state, image) {
      state.postInfo.background.image = image
    },
    batchSelect(state, position) {
      state.group = { layersIds: new Array<string>(), operItems: new Array<any>(), rotate: 0, type: 'group' }

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
      state.postInfo.layers.forEach(item => {
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
          state.group.operItems.push({
            operItem: item
          })
          state.group.layersIds.push(item.id)
        }
      })

      if (state.group.layersIds.length == 0) {
        state.group = undefined
      } else {
        state.group.left = minLeft
        state.group.top = minTop
        state.group.width = maxLeft - minLeft
        state.group.height = maxTop - minTop
        // state.group.anglePositionInfo = PositionUtil.getGroupPositionInfo(pointList, 340)
        state.group.operItems.forEach(item => {
          item.width = item.operItem.width / state.group.width
          item.height = item.operItem.height / state.group.height
          item.centerLeft = (item.operItem.left + item.operItem.width / 2 - state.group.left) / state.group.width
          item.centerTop = (item.operItem.top + item.operItem.height / 2 - state.group.top) / state.group.height
          item.rotate = item.operItem.rotate
          if (item.operItem.type == 'text' || item.operItem.type == 'effectText') {
            item.fontSize = item.operItem.fontSize / state.group.width
            item.letterSpacing = item.operItem.letterSpacing / state.group.width
          }
        })
      }
    },
    lock(state) {
      state.editModule.lock = true
    },
    unlock(state) {
      state.editModule.lock = false
    },
    delete(state) {
      let index = state.editModule.zindex
      state.postInfo.layers.splice(index, 1)
      state.postInfo.layers = [...state.postInfo.layers]
      state.postInfo.layers.forEach((item, index) => {
        item.zindex = index
      })
      state.editModule = state.postInfo.background
    }
  },
  actions: {
  },
  modules: {
  }
})
