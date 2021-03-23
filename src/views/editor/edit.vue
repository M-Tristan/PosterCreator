<template>
    <div class='main'>
        <div class='edit-head'></div>
        <div class='module-area'></div>
        <div class='canvas-area'></div>
        <div class='edit-area'></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup () {
        

        return {}
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
    background-color: aqua;
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
    background-color: brown;
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
    background-color: rgb(42, 165, 89);
}

</style>