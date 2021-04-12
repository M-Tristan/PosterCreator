<template>
    <div class='main'>
        <div class='edit-head'></div>
        <div class='module-area'>
            <module></module>
        </div>
        <div @click="selectModel" class='canvas-area'>
            <zoom @click.stop></zoom>
            <editCom  @click.stop></editCom>
        </div>
        <div class='edit-area'>
          <image-edit></image-edit>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent, onMounted } from 'vue'
import editCom from './panel/editCom.vue'
import module from './module/module.vue'
import zoom from './edit/zoom.vue'
import imageEdit from './edit/imageEdit.vue'
import { useStore } from 'vuex'
import ModuleUtil from '@/lib/ModuleUtil'
export default defineComponent({
    setup () {
        const store = useStore()
      
          store.commit('initBack');
        onMounted(async()=>{
          let canvas = {
            width:400,
            height:400,
          }
          store.commit('addCanvas', canvas);
        })
        const selectModel = () =>{
          store.commit('setEditModuleToBack')
        }
        return {selectModel}
    },
    components:{
        module,
        zoom,
        editCom,
        imageEdit
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
.edit-head{
   width: 100%;
   height: 50px;
   background-color: blue;
    
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
}
.canvas-area{
    position: absolute;
    top: 50px;
    bottom: 0px;
    right: 240px;
    left: 65px;
}


</style>