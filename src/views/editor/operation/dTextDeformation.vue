<template>
  <div class='text-content' @mousedown="moveEvent" :style="{  width: size.width + 'px'
                                        , height:`${size.height}px`
                                        ,left:module.left+'px'
                                        ,top:module.top+'px'
                                        ,zIndex:module.zindex
                                        }" >
                                         {{module.text}}
     <regulator :module='module' v-if="editModule.id == module.id && pattern == 'edit'"  ></regulator>
     <rotate :module='module' v-if="editModule.id == module.id && pattern == 'edit'"></rotate> 
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import regulator from './regulator.vue'
import rotate from './rotate.vue'
import { useStore } from 'vuex'
import operation from './common/operation'
import { textShadow } from '@/interface/module'
export default defineComponent({
  props:{
    text:{
      type:String,
      default:''
    },
    pattern:{
      type:String,
      default:'edit'
    }
  },
   components:{
    regulator,
    rotate
  },
  setup (props) {
    let ctx = document.createElement("canvas").getContext("2d") as CanvasRenderingContext2D
    const store = useStore()
    const editModule:any= computed(()=>{
      return store.state.editModule
    })
    const module:any= computed(()=>{
      return props.text
    })
    const textShadow = computed(()=>{
      let textShadowList = module.value.textShadowList
    
      if(textShadowList.length == 0 || props.pattern == 'edit' ){
        return 'none'
      }
      let result = ''
      textShadowList.forEach((item:textShadow,index:number)=>{
        if(index == 0){
           result = result + `${item.hShadow}px ${item.vShadow}px ${item.blur}px ${item.color}`
        }else{
           result = result + `,${item.hShadow}px ${item.vShadow}px ${item.blur}px ${item.color}`
        }
       
      })
      return result
    })
    const size = computed(()=>{
      ctx.font=`${module.value.fontSize}`
      let c = ctx.measureText(module.value.text).width
      let r = c/2/Math.PI
      return{
          width:2*r,
          height:2*r
        }
    })
    const { moduleMove } = operation()
    return {moduleMove,editModule,module,size}
  }
})
</script>

<style scoped>
.text-content{
  position: absolute;
}
</style>