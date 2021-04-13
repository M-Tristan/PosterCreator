<template>
  <div class='img-content' @click='selectModel'   @mousedown="moduleMove(module)" :style="{  width: module.width + 'px'
                                        ,height: module.height+'px'
                                        ,left:module.left+'px'
                                        ,top:module.top+'px',
                                        transform:  `rotate(${module.rotate?image.rotate:0}deg)`
                                        ,zIndex:module.zindex
                                       
                                              }" >
                    

                <div class='image-border' :style="{
                  borderRadius:`${module.borderRadius}px`,
                  border:`solid ${module.borderWidth}px ${module.borderColor}`
                }">
                  <img draggable="false" class='image' :src='module.src' :style="{  width: nature.naturalWidth*imageScale + 'px'
                                        ,height: nature.naturalHeight*imageScale+'px'
                                        ,filter: `blur(${module.blur}px) drop-shadow(${module.dropshadowX}px ${module.dropshadowY}px ${module.dropshadowBlur}px ${module.dropshadowColor})`
                                        ,opacity:module.opacity
                                        ,left:`-${module.crop.left*imageScale}px`
                                        ,top:`-${module.crop.top*imageScale}px`
                                        ,transform:`rotateY(${module.rotateY?180:0}deg) rotateX(${module.rotateX?180:0}deg)`
                                        
                                              }"/>
                </div>

   
                                            
    <regulator :module='module' v-if="editModule.id == module.id" ></regulator>
    <rotate :module='module' v-if="editModule.id == module.id"></rotate>                                      
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { computed, defineComponent, reactive } from 'vue'
import regulator from './regulator.vue'
import rotate from './rotate.vue'
import operation from './common/operation'
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
      let image = new Image()
      image.src = store.state.editModule.src
      const nature = reactive({
        naturalWidth:0,
        naturalHeight:0
      })
      image.onload = () => {
        nature.naturalWidth = image.naturalWidth
        nature.naturalHeight = image.naturalHeight
      }
      
      const editModule:any= computed(()=>{
        return store.state.editModule
      })
      let imageScale = computed(()=>{
        return module.value.width/module.value.crop.width
      })
      const module:any= computed(()=>{
        return props.image
      })
      const { moduleMove } = operation()
      const selectModel = () =>{
        store.commit('setEditModule',module.value.id)
      }
    return {module,moduleMove,editModule,selectModel,imageScale,nature}
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
.image-border{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: content-box;
}
.image{
  position: absolute;
}
</style>