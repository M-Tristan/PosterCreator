<template>
  <div class='text-content'  @click='selectModel'   @mousedown="moveEvent" :style="{  width: module.width + 'px'
                                        , height:`${fontScale!=1?module.height*fontScale+'px':'auto'}`
                                        ,left:module.left+'px'
                                        ,top:module.top+'px',
                                        transform:  `rotate(${module.rotate?module.rotate:0}deg)`
                                         ,zIndex:module.zindex,
                                         textAlign:`${module.textAlign}`
                                   }" >
    <div class='content' :contenteditable='contenteditable' @input="contentChange" @dblclick="dbClickEvent" @blur="contenteditable=false" ref='contentInput' :style="{
      fontSize:`${module.fontSize}px`,
      transform: `scale(${fontScale})`,
      color:`${pattern == 'show'?module.color:'rgba(0,0,0,0)'}`,
      caretColor: module.color,
      width: `${module.width/fontScale}px`,
      fontWeight:`${module.bold?900:400}`,
      textDecoration:`${module.textDecoration}`,
      fontStyle:`${module.italic?'italic':'normal'}`,
      lineHeight:`${module.lineHeight}`,
      letterSpacing:`${module.letterSpacing}px`,
      opacity:module.opacity,
      textShadow:textShadow,
      textStroke:`${pattern == 'edit'?0: module.strokeWidth}px ${module.strokeColor}`
    }">
      {{module.text}}
    </div>
    <regulator :module='module' v-if="editModule.id == module.id && pattern == 'edit'" @changeHeight='changeHeight' ></regulator>
    <rotate :module='module' v-if="editModule.id == module.id && pattern == 'edit'"></rotate> 
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { computed, defineComponent, nextTick, ref, watch } from 'vue'
import regulator from './regulator.vue'
import rotate from './rotate.vue'
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
  setup (props,ctx) {
     const store = useStore()
     const contenteditable = ref(false)
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
    const contentChange = () => {
        module.value.html=contentInput.value.innerHTML
        module.value.text = contentInput.value.innerText
        changeHeight()
    }
    const  dbClickEvent = () => {
      contenteditable.value = true
      contentInput.value.focus()
      nextTick(()=>{
        contentInput.value.focus()
        document.execCommand('selectAll')
      })
 
    }
    const moveEvent = () => {
      if(contenteditable.value){
        return
      }
      moduleMove(module.value)
    }
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
      fontScale,
      textShadow,
      contentChange,
      contenteditable,
      dbClickEvent,
      moveEvent
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