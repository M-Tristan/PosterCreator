let layerInfo = {}
class EditUtil {
  /**
 * 得到所有图层信息
 * @param {} state
 * @returns
 */
  static getLayers(state) {

    const layers = <any>[];
    state.postInfo.layers.forEach(ele => {
      layers[ele.zindex] = ele
    })
    let index = layers.length - 1
    const newLayers = <any>[]
    const groupInfo = {}
    while (index >= 0) {
      const item = layers[index--]
      if (item) {
        layerInfo[item.id] = item
        if (item.groupId) {
          if (groupInfo[item.groupId]) {
            groupInfo[item.groupId].unshift(item)
          } else {
            const group = [item]
            layerInfo[item.groupId] = group
            groupInfo[item.groupId] = group
            newLayers.push(group)
          }
        } else {
          newLayers.push(item)
        }
      }
    }
    return newLayers.reverse()
  }
  /**
 * 重新调整图层
 * @param {} state
 */
  static adjustLayers(state) {
    const newLayers = EditUtil.getLayers(state)
    console.log(newLayers)
    EditUtil.initLayer(newLayers)
  }
  /**
* 初始化图层
* @param {*} newLayers
*/
  static initLayer(newLayers) {
    newLayers.flat(Infinity).forEach((ele, index) => {
      if (ele) {
        ele.zindex = index
      }
    })
  }

  /**
 * 图层上移
 * @param {*} state
 * @param {*} id
 * @returns
 */
  static upper(state, id) {
    const newLayers = EditUtil.getLayers(state)
    const length = newLayers.length
    let editModel = layerInfo[id]
    if (editModel.groupId) {
      editModel = layerInfo[editModel.groupId]
    }
    const index = newLayers.findIndex(item => { return editModel === item })
    if (index === length - 1) {
      return
    }
    [newLayers[index], newLayers[index + 1]] = [newLayers[index + 1], newLayers[index]]
    EditUtil.initLayer(newLayers)
  }

  /**
 * 图层下移
 * @param {*} state
 * @param {*} id
 * @returns
 */
  static down(state, id) {
    const newLayers = EditUtil.getLayers(state)
    let editModel = layerInfo[id]
    if (editModel.groupId) {
      editModel = layerInfo[editModel.groupId]
    }

    const index = newLayers.findIndex(item => { return editModel === item })
    if (index === 0) {
      return
    }
    [newLayers[index], newLayers[index - 1]] = [newLayers[index - 1], newLayers[index]]
    EditUtil.initLayer(newLayers)
  }

  /**
 * 图层置顶
 * @param {*} state
 * @param {*} id
 * @returns
 */
  static top(state, id) {
    const newLayers = EditUtil.getLayers(state)
    let editModel = layerInfo[id]
    if (editModel.groupId) {
      editModel = layerInfo[editModel.groupId]
    }

    const length = newLayers.length
    const index = newLayers.findIndex(item => { return editModel === item })
    if (index === length - 1) {
      return
    }
    const layer = newLayers.splice(index, 1)
    newLayers.push(layer)
    EditUtil.initLayer(newLayers)
  }

  /**
 * 图层置底
 * @param {*} state
 * @param {*} id
 * @returns
 */
  static bottom(state, id) {
    const newLayers = EditUtil.getLayers(state)
    let editModel = layerInfo[id]
    if (editModel.groupId) {
      editModel = layerInfo[editModel.groupId]
    }
    const index = newLayers.findIndex(item => { return editModel === item })
    if (index === 0) {
      return
    }
    const layer = newLayers.splice(index, 1)
    newLayers.unshift(layer)
    EditUtil.initLayer(newLayers)
  }
}
export default EditUtil