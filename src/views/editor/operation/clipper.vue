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
        <div class='org-image-area'>
         
        </div>
    </div>
    <div class='showImage' :style="{
         width: showImage.width + 'px'
        ,height: showImage.height+'px'
        ,top:showImage.top+'px'
        ,left:showImage.left+'px'
        ,transform:  `rotate(${showImage.rotate?showImage.rotate:0}deg)`
        }">
        
        <div class='image-content'>
          
          <img draggable="false" class='display-image' :src='showImage.src' :style="{  width: showImage.showWidth + 'px'
                                        ,height: showImage.showHeigth+'px'
                                        ,top:`${-showImage.showTop}px`
                                        ,left:`${-showImage.showLeft}px`
                                        ,transform:`rotateY(${showImage.rotateY?180:0}deg) rotateX(${showImage.rotateX?180:0}deg)`
                                      }"/>
        </div> 
        <clipper-regulator :module='showImage'></clipper-regulator>
    </div>
    <div class='button-area' :style="{
      top:`${buttonInfo.most.minTop}px`,
      left:`${(buttonInfo.most.minLeft+buttonInfo.most.maxLeft)/2}px`
    }">
      <div class='ensure-button'>
        <i class='el-icon-check'></i>
      </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import PositionUtil from '@/lib/PositionUtil'
import clipperRegulator from './clipperRegulator.vue'
export default defineComponent({
    setup () {
        const store = useStore()
        const editModule:any= reactive(store.state.editModule)
        const showImage = reactive({...editModule})
        showImage.showWidth = showImage.width
        showImage.showHeigth = showImage.height
        showImage.oriTop = showImage.top
        showImage.oriLeft = showImage.left
        showImage.showTop = 0
        showImage.showLeft = 0
        const buttonInfo = computed(()=>{
          return PositionUtil.getPosition(showImage.left,showImage.top,showImage.width,showImage.height,showImage.rotate)
        })
        return {editModule,showImage,buttonInfo}
    },
    components:{
      clipperRegulator
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
.showImage{
  position: absolute;
  z-index: 99;
  .image-content{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    pointer-events: none;
  }
  .display-image{
     position: absolute;
  }
}
.ensure-button{
  width: 20px;
  height: 25px;
  background-color: white;
  color: #000;
  font-size: 20px;
  border: 1px solid rgb(158, 158, 158);
  border-radius: 5px;
}
.button-area{
  position: absolute;
  z-index: 99;
}
</style>