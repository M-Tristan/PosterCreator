<template>
    <div class='main'>
        <div class='edit-head'></div>
        <div class='module-area'>
            <module></module>
        </div>
        <div class='canvas-area'>
            <zoom></zoom>
            <editCom></editCom>
        </div>
        <div class='edit-area'></div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import editCom from './panel/editCom.vue'
import module from './module/module.vue'
import zoom from './edit/zoom.vue'

export default defineComponent({
    setup () {
        return {}
    },
    components:{
        module,
        zoom,
        editCom
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
    background-color: brown;
}
.canvas-area{
    position: absolute;
    top: 50px;
    bottom: 0px;
    right: 240px;
    left: 65px;
}


</style>