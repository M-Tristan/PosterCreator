<template>
  <div class='text-content'  @click='selectModel'   @mousedown="moduleMove(module)" :style="{  width: module.width + 'px'
                                        , height:`${fontScale!=1?module.height*fontScale+'px':'auto'}`
                                        ,left:module.left+'px'
                                        ,top:module.top+'px',
                                        transform:  `rotate(${module.rotate?module.rotate:0}deg)`
                                         ,zIndex:module.zindex,
                                         textAlign:`${module.textAlign}`
                                   }" >
    <div class='content' :contenteditable='true' @input="changeHeight" ref='contentInput' :style="{
      fontSize:`${module.fontSize}px`,
      transform: `scale(${fontScale})`,
      color:`${module.color}`,
      width: `${module.width/fontScale}px`,
      fontWeight:`${module.bold?900:400}`,
      textDecoration:`${module.textDecoration}`,
      fontStyle:`${module.italic?'italic':'normal'}`,
      lineHeight:`${module.lineHeight}`,
      letterSpacing:`${module.letterSpacing}px`,
      opacity:module.opacity
    }">
      {{module.text}}
    </div>
    <regulator :module='module' v-if="editModule.id == module.id" @changeHeight='changeHeight' ></regulator>
    <rotate :module='module' v-if="editModule.id == module.id"></rotate> 
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { computed, defineComponent, nextTick, ref, watch } from 'vue'
import regulator from './regulator.vue'
import rotate from './rotate.vue'
import operation from './common/operation'
export default defineComponent({
 props:{
    text:{
      type:String,
      default:''
    }
  },
  components:{
    regulator,
    rotate
  },
  setup (props,ctx) {
     const store = useStore()
    const editModule:any= computed(()=>{
      return store.state.editModule
    })
    const module:any= computed(()=>{
      return props.text
    })
     const { moduleMove } = operation()
     const selectModel = () =>{
      store.commit('setEditModule',module.value.id)
    }
    const contentInput = ref(null as unknown as HTMLElement)
    const changeHeight = () => {
          module.value.height = contentInput.value.clientHeight
        }
    const fontSize = computed(()=>{
      return module.value.fontSize
    })
    const lineHeight = computed(()=>{
      return module.value.lineHeight
    })
     const letterSpacing = computed(()=>{
      return module.value.letterSpacing
    })
    const fontScale = computed(()=>{
      let fontSize = module.value.fontSize
      if(fontSize<12){
        return fontSize/12
      }
      return 1
    })
    watch([fontSize,lineHeight,letterSpacing], (nv, ov) => {
     nextTick(()=>{changeHeight()})
    })
     
    return {
      module,
      moduleMove,
      editModule,
      selectModel,
      changeHeight,
      contentInput,
      fontScale
    }
  }
})

</script>

<style lang="scss" scoped>
.text-content{
  position: absolute;
 
}
.content{
    word-break:break-word;
    white-space:normal;
    position: relative;
    left: 0;
    transform-origin: 0px 0px;
     &:focus{
          outline: none
        }
  
}
</style>