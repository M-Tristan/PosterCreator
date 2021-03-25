<template>
  <div class='img-content' @mousedown="moduleMove" :style="{  width: module.width + 'px'
                                        ,height: module.height+'px'
                                        ,left:module.left+'px'
                                        ,top:module.top+'px',
                                        transform:  `rotate(${module.rotate?image.rotate:0}deg)`,
                                              }" >
    <img draggable="false" :src='module.src' :style="{  width: module.width + 'px'
                                        ,height: module.height+'px'
                                              }"/>
    <regulator :module='module'></regulator>
    <rotate :module='module'></rotate>                                      
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import regulator from './regulator.vue'
import rotate from './rotate.vue'
export default defineComponent({
  props:{
    image:{
      type:Object,
      default:new Object()
    }
  },
  components:{
    regulator,
    rotate
  },
  setup (props) {
    let moveScale = 1
    const module:any= computed(()=>{
      return props.image
    })
    const moduleMove = (event:MouseEvent)=>{
      let oriX = event.clientX
      let oriY = event.clientY
      let orileft = module.value.left 
      let oritop = module.value.top 
      window.onmousemove = (event:MouseEvent)=>{
          let X = event.clientX
          let Y = event.clientY
          module.value.left = orileft+(X-oriX)*moveScale
          module.value.top = oritop+(Y-oriY)*moveScale
          
      }
      window.onmouseup = ()=>{
          window.onmousemove = null
          module.value.left = Math.round(module.value.left)
          module.value.height = Math.round(module.value.height)
          module.value.width = Math.round(module.value.width)
          module.value.top = Math.round(module.value.top)
          window.onmouseup=null
          
      }
    }
    return {module,moduleMove}
  }
})
</script>

<style lang="scss" scoped>
.img-content{
    position: absolute;
    display:inline-block; 
    cursor: move;
    user-select:none
}
</style>