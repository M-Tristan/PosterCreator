<template>
   <div  class='canvas-area' draggable="false" :style="{
                                  backgroundColor:`#fff`,
                                  backgroundSize: `16px 16px`,
                                  backgroundPosition: `0 0,8px 8px`,
                                  backgroundImage: `linear-gradient(to top right,#ccc 25%,transparent 0,transparent 75%,#ccc 0,#ccc),linear-gradient(to top right,#ccc 25%,transparent 0,transparent 75%,#ccc 0,#ccc)`
                                  ,'width': canvas.width+'px'
                                  ,'height':canvas.height+'px'
                                  ,'left':`40%`
                                  ,'top':`10`}">
        <background :background='background'></background>
        <d-image v-for="(image,index) in images" :key="index" :image="image"></d-image>
        <d-text  v-for="(text,index) in texts" :key="index" :text="text"></d-text>
        <d-code  v-for="(code,index) in codes" :key="index" :code="code"></d-code>
        <clipper v-if="clipOper"></clipper>
    </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { computed, defineComponent } from 'vue'
import dImage from '../operation/dImage.vue'
import dText from '../operation/dText.vue'
import clipper from '../operation/clipper.vue'
import DCode from '../operation/dCode.vue'
import Background from '../operation/background.vue'
export default defineComponent({
  components:{
    dImage,
    clipper,
    dText,
    DCode,
    Background
  },
  setup () {
    const store = useStore()
    let clipOper = computed(()=>store.state.clipOper)
    let background = computed(()=>{
      return store.state.postInfo.background
    })
    let codes = computed(()=>{
      return store.state.postInfo.codes
    })
    let texts = computed(()=>{
      return store.state.postInfo.texts
    })
    let images = computed(()=>{
      return store.state.postInfo.images
    })
    let canvas = computed(()=>{
      return store.state.postInfo.canvas
    })
    return {
      images:images,
      texts:texts,
      codes:codes,
      background:background,
      clipOper,
      canvas
    }
  }
})
</script>

<style lang="scss" scoped>
  .canvas-area{
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.308);
     -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
          position:absolute;
          transform-origin: left top;
          margin-bottom: 30px;
          overflow: hidden;
          .background{
            width: 100%;
            height: 100%;
            position: relative;
            img{
              position:absolute;
            }
          }
      }
</style>