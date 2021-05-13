<template>
    <div class='main'>
        <edit-head></edit-head>
        <div class='module-area'>
            <module></module>
        </div>
        <div  class='canvas-area' ref='canvasArea'  @mousedown="batchStart" @mouseleave="moveOut">
            <editCom pattern='show'  @click.stop></editCom>
            <editCom pattern='edit'  @click.stop></editCom>
            <div class='batchMask' v-if="showBatchMask"></div>
            <div class='batchContent' v-if="showBatchMask" :style="{
              top:`${batchPosition.top}px`,
              left:`${batchPosition.left}px`,
              width:`${batchPosition.width}px`,
              height:`${batchPosition.height}px`
            }"></div>
             
        </div>
        <!-- <navigate></navigate> -->
        <zoom @click.stop></zoom>
        <div class='edit-area'>
         
          <image-edit v-if="editModule.type=='image'"></image-edit>
          <text-edit v-if="editModule.type=='text'"></text-edit>
          <back-edit v-if="editModule.type=='back'"></back-edit>
          <code-edit v-if="editModule.type=='code'"></code-edit>
          <shape-edit v-if="editModule.type=='shape'"></shape-edit>
          <chart-edit v-if="editModule.type=='chart'"></chart-edit>
        </div>
    </div>
</template>

<script lang="ts">

import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import editCom from './panel/editCom.vue'
import module from './module/module.vue'
import zoom from './edit/zoom.vue'
import imageEdit from './edit/imageEdit.vue'
import { useStore } from 'vuex'
import TextEdit from './edit/textEdit.vue'
import backEdit from './edit/backEdit.vue'
import CodeEdit from './edit/codeEdit.vue'
import ShapeEdit from './edit/shapeEdit.vue'
import ChartEdit from './edit/chartEdit.vue'
import navigate from './edit/navigate.vue'
import editHead from './edit/editHead.vue'
export default defineComponent({
    setup () {
      const batchPosition = reactive({
        top:0,
        left:0,
        width:0,
        height:0
      })
      const showBatchMask = ref(false)
        onMounted(()=>{
          store.commit("setEditSize",{
            width:canvasArea.value.offsetWidth,
            height:canvasArea.value.offsetHeight
          })
        })
        window.onresize = () => {
          store.commit("setEditSize",{
            width:canvasArea.value.offsetWidth,
            height:canvasArea.value.offsetHeight
          })
        }
        document.addEventListener ( 'paste' , (e)  =>  {
       
          e.preventDefault();
         
          var text = e.clipboardData ? e.clipboardData.getData('text/plain') : prompt('请在这里粘贴文本', '');
          if (e.clipboardData) { // 支持直接 clipboardData，则直接 OK
            document.execCommand('insertText', false, text as string);
          } else { // 不支持则取用户在 prompt 提示输入框粘贴的内容（自动去格式的）
            var sel, textRange;
            try {
              document.execCommand("ms-beginUndoUnit", false, undefined); // 开始给 IE 增加撤回功能
            } catch (e) { }
          
              sel = window.getSelection() as Selection;
              var range = sel.getRangeAt(0);
              range.deleteContents(); // 删除 range 的内容
              var textNode = document.createTextNode(text as string);
              range.insertNode(textNode); // 向 range 插入 text 节点
              range.selectNodeContents(textNode); // 选中 text 节点
              sel.removeAllRanges(); // 删除选区中所有的 range
              sel.addRange(range); // 向选区增加刚才处理后的 range（只含 text 节点）
            

            try {
              document.execCommand("ms-endUndoUnit", false, undefined); // 结束给 IE 增加撤回功能
            } catch (e) { }
          }
      });
        const store = useStore()
        const canvasArea = ref(null as unknown as HTMLElement)
        const editModule:any= computed(()=>{
          return store.state.editModule
        })
        
        onMounted(async()=>{
          let canvas = {
            width:800,
            height:800,
          }
          store.commit('addCanvas', canvas);
          store.commit('initBack');
        })
        const selectModel = () =>{
          store.commit('setEditModuleToBack')
        }
        const scale = computed(() => {
            return store.state.scale
          })
          let canvas = computed(()=>{
            return store.state.postInfo.canvas
          })
          let editSize = computed(()=>{
            return  store.state.editSize
          })
        let editPosition = computed(()=>{
          let left = 0
          let top = 0
          if(canvas.value.width*scale.value/100 < editSize.value.width){
            left = (editSize.value.width - canvas.value.width*scale.value/100)/2
          }
          if(canvas.value.height*scale.value/100 < editSize.value.height){
            top = (editSize.value.height - canvas.value.height*scale.value/100)/2
          }
          return {left,top}
        })
        const batchStart = () => {
          store.commit('setEditModuleToBack')
          const event:MouseEvent  = <MouseEvent>window.event
          let startTop = event.offsetY
          batchPosition.top = event.offsetY
          batchPosition.height = 0
          let startLeft =  event.offsetX
          batchPosition.left = event.offsetX
          batchPosition.width = 0
          showBatchMask.value = true
          window.onmousemove = (event:MouseEvent) => {
            if(event.offsetY - startTop < 0){
              batchPosition.height = startTop - event.offsetY  
              batchPosition.top = startTop - batchPosition.height
            }else{
              batchPosition.height = event.offsetY - startTop
              batchPosition.top = startTop
            }
            if(event.offsetX - startLeft<0){
              batchPosition.width =  startLeft - event.offsetX 
              batchPosition.left = startLeft - batchPosition.width
            }else{
              batchPosition.width = event.offsetX - startLeft
              batchPosition.left = startLeft
            }
             
             
          }
          window.onmouseup = () => {
            let rate = 100/scale.value
            window.onmousemove = null
            window.onmouseup = null
            showBatchMask.value = false
            batchPosition.left =-( editPosition.value.left-batchPosition.left)*rate
            batchPosition.top = -(editPosition.value.top-batchPosition.top)*rate
             batchPosition.width*=rate
             batchPosition.height*=rate
            store.commit('batchSelect',batchPosition)
          }
        }
        const moveOut = () => {
            window.onmousemove = null
            window.onmouseup = null
            showBatchMask.value = false
        }
        return {selectModel,editModule,batchStart,batchPosition,showBatchMask,moveOut,canvasArea}
    },
    components:{
        module,
        zoom,
        editCom,
        imageEdit,
        TextEdit,
        backEdit,
        CodeEdit,
        ShapeEdit,
        ChartEdit,
        navigate,
        editHead
    }
})
</script>

<style scoped>
.main{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%) ;
    overflow: hidden;
}

.module-area{
    position: absolute;
    top: 50px;
    bottom: 0px;
    left: 0px;
    width: 65px;
    border-right: 1px solid rgb(223, 223, 223);
}
.edit-area{
    position: absolute;
    top: 50px;
    bottom: 0px;
    right: 0px;
    width: 240px;
    border-left: 1px solid rgb(223, 223, 223);
    background-color: white;
}
.canvas-area{
    position: absolute;
    top: 50px;
    bottom: 0px;
    right: 240px;
    left:346px;
    background-color: rgba(236, 236, 236, 0.205);
    overflow: scroll;
}
.batchContent{
  display: inline-block;
  position: absolute;
  border: 1px solid blue;
  background-color: rgba(0, 255, 255, 0.233);
  z-index: 990;
}
.batchMask{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
}

</style>