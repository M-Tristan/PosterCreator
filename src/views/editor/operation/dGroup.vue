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
import MathUtil from '@/lib/MathUtil'
import PositionUtil from '@/lib/PositionUtil'
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
    const resetGroupItem = () => {
      module.value.operItems.forEach(item=>{
        item.operItem.rotate = (item.rotate + module.value.rotate)%360
        let width = (item.centerLeft-0.5)*module.value.width
        let height = (0.5-item.centerTop)*module.value.height
        let hypotenuse = MathUtil.getHypotenuse(width,height)
        let innerAngle = 0
        if(item.centerTop != 0.5){
          innerAngle = MathUtil.atan(height/width)-180
        }
        if(item.centerLeft < 0.5){
          innerAngle+=180
        }
        let angle = innerAngle - module.value.rotate
        let centerPosition = PositionUtil.getPositionbyCenter(angle,hypotenuse,{
            left:module.value.left + module.value.width/2,
            top:module.value.top + module.value.height/2,
          })
        item.operItem.left = centerPosition.left - item.operItem.width/2
        item.operItem.top = centerPosition.top - item.operItem.height/2
      })
    }
    watch(()=>module.value.width,(nv,ov)=>{
      module.value.operItems.forEach(item=>{
        item.operItem.width = item.width*module.value.width
        item.operItem.height = item.height*module.value.height
        if(item.operItem.type == 'text'){
          item.operItem.fontSize = item.fontSize*nv
          item.operItem.letterSpacing = item.letterSpacing*nv
        }
       
      })
       resetGroupItem()
    })
    watch(()=>module.value.rotate,(nv,ov)=>{
      resetGroupItem()
    })
     watch(()=>module.value.left,(nv,ov)=>{
      resetGroupItem()
    })
      watch(()=>module.value.top,(nv,ov)=>{
      resetGroupItem()
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