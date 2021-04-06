<template>
    <div class='clipper' :style="{
         width: editModule.width + 'px'
        ,height: editModule.height+'px'
        ,top:editModule.top+'px'
        ,left:editModule.left+'px'
        ,transform:  `rotate(${editModule.rotate?editModule.rotate:0}deg)`
        }">
       
        <img draggable="false" class='image' :src='editModule.src' :style="{  width: editModule.width + 'px'
                                        ,height: editModule.height+'px'
                                        ,transform:`rotateY(${editModule.rotateY?180:0}deg) rotateX(${editModule.rotateX?180:0}deg)`
                                         }"/>
        <div class='org-image-area'></div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
    setup () {
        const store = useStore()
        const editModule:any= computed(()=>{
            return store.state.editModule
        })
        return {editModule}
    }
})
</script>
<style lang="scss" scoped>
.clipper{
    position: absolute;
}
.org-image-area{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.473);
    left: 0;
    top: 0;
    
}
.image{
        width: 100%;
        height: 100%;
    }
</style>