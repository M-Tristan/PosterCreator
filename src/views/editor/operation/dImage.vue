<template>
  <div class='img-content' @click='selectModel'   @mousedown="moduleMove" :style="{  width: module.width + 'px'
                                        ,height: module.height+'px'
                                        ,left:module.left+'px'
                                        ,top:module.top+'px',
                                        transform:  `rotate(${module.rotate?image.rotate:0}deg)`,
                                              }" >
    <img draggable="false" :src='module.src' :style="{  width: module.width + 'px'
                                        ,height: module.height+'px'
                                        ,filter: `blur(${module.blur}px)`
                                        ,opacity:module.opacity
                                        ,borderRadius:`${module.borderRadius}px`
                                        ,transform:`rotateY(${module.rotateY?180:0}deg) rotateX(${module.rotateX?180:0}deg)`
                                              }"/>
    <regulator :module='module' v-if="editModule.id == image.id" ></regulator>
    <rotate :module='module' v-if="editModule.id == image.id"></rotate>                                      
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
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
    const store = useStore()
    const editModule:any= computed(()=>{
      return store.state.editModule
    })
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
    const selectModel = () =>{
      store.commit('setEditModule',module.value.id)
    }
    return {module,moduleMove,editModule,selectModel}
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