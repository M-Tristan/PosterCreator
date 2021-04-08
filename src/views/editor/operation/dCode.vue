<template>
  <div class='code-content' @click='selectModel'   @mousedown="moduleMove(module)" :style="{  width: module.width + 'px'
                                        ,height: module.height+'px'
                                        ,left:module.left+'px'
                                        ,top:module.top+'px',
                                        transform:  `rotate(${module.rotate?module.rotate:0}deg)`
                                        ,zIndex:module.zindex
                                       
                                              }" >
         <div ref='code' class='code' >

         </div>                                
    <regulator :module='module' v-if="editModule.id == module.id" ></regulator>
    <rotate :module='module' v-if="editModule.id == module.id"></rotate>                                      
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { computed, defineComponent, onMounted, ref } from 'vue'
import regulator from './regulator.vue'
import rotate from './rotate.vue'
import operation from './common/operation'
import * as QRCode from 'qrcode';
export default defineComponent({
  props:{
    code:{
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
    let code = ref(null as unknown as HTMLElement)
    onMounted(()=>{
      // console.log(props.code)
      QRCode.toCanvas('二维码编辑', {
        color:{
           dark:props.code.colorDark,
           light:props.code.colorLight
        }
      }, (err: any, canvas: any) => {
         if (err) throw err;
        code.value.append(canvas) 
        var image = new Image();
        image.src = canvas.toDataURL("image/png");
        image.style.width='100%'
        image.style.height='100%'
        code.value.innerHTML = ""
        code.value.append(image) 
      });
    })
    const editModule:any= computed(()=>{
      return store.state.editModule
    })
    const module:any= computed(()=>{
      return props.code
    })
    const { moduleMove } = operation()
    const selectModel = () =>{
      store.commit('setEditModule',module.value.id)
    }
    return {module,moduleMove,editModule,selectModel,code}
  }
})
</script>

<style lang="scss" scoped>
.code-content{
    position: absolute;
    display:inline-block; 
    cursor: move;
    user-select:none
}
.code{
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>