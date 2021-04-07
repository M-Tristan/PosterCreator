<template>
  <div class='text-content'  @click='selectModel'   @mousedown="moduleMove(module)" :style="{  width: module.width + 'px'
                                        ,left:module.left+'px'
                                        ,top:module.top+'px',
                                        transform:  `rotate(${module.rotate?module.rotate:0}deg)`,
                                   }" >
    <div class='content' :contenteditable='true' @input="changeText" ref='contentInput'>
      {{module.text}}
    </div>
    <regulator :module='module' v-if="editModule.id == module.id" ></regulator>
    <rotate :module='module' v-if="editModule.id == module.id"></rotate> 
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { computed, ComputedRef, defineComponent, ref } from 'vue'
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
    const changeText = () => {
          module.value.height = contentInput.value.clientHeight
        }
    return {
      module,
      moduleMove,
      editModule,
      selectModel,
      changeText,
      contentInput
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
     &:focus{
          outline: none
        }
}
</style>