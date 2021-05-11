<template>
  <div class='group-content' @mousedown="moduleMove(module)" :style="{  width: module.width + 'px'
                                        ,height: module.height+'px'
                                        ,left:module.left+'px'
                                        ,top:module.top+'px'
                                        ,transform:  `rotate(${module.rotate?module.rotate:0}deg)`}">
     <regulator :module='module' ></regulator>
    <rotate :module='module'></rotate>    
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { computed, defineComponent, watch } from 'vue'
import regulator from './regulator.vue'
import rotate from './rotate.vue'
import operation from './common/operation'
export default defineComponent({
  components:{
    regulator,
    rotate
  },
  props:{
    group:{
      type:Object,
      default:new Object()
    }
  },
  setup (props) {
    const store = useStore()
    const module:any= computed(()=>{
      return props.group
    })
    const { moduleMove } = operation()
    watch(()=>module.value.width,(nv,ov)=>{
      module.value.operItems.forEach(item=>{
        item.operItem.width = item.width*module.value.width
        item.operItem.height = item.height*module.value.height
      })
    })
    watch(()=>module.value.rotate,(nv,ov)=>{
      module.value.operItems.forEach(item=>{
        item.operItem.rotate = (item.rotate + nv)%360
      })
    })
    
    return {module,moduleMove}
  }
})
</script>

<style scoped>
.group-content{
  position: absolute;
  border: 1px solid blue;
  background-color: rgba(0, 255, 255, 0.356);
  z-index: 999;
}
</style>