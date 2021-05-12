<template>
   <div  class='editContent' @mousedown.stop draggable="false" :style="{
                                  transform:`scale(${scale},${scale}) `,
                                  backgroundColor:`#fff`,
                                  backgroundSize: `16px 16px`,
                                  backgroundPosition: `0 0,8px 8px`,
                                  backgroundImage: `linear-gradient(to top right,#ccc 25%,transparent 0,transparent 75%,#ccc 0,#ccc),linear-gradient(to top right,#ccc 25%,transparent 0,transparent 75%,#ccc 0,#ccc)`
                                  ,width: canvas.width+'px'
                                  ,height:canvas.height+'px'
                                  }">
        <background :background='background'></background>
        <d-shape v-for="(shape,index) in shapes" :key="index" :shape="shape"></d-shape>
        <d-chart  v-for="(chart,index) in charts" :key="index" :chart="chart"></d-chart>
        <d-image v-for="(image,index) in images" :key="index" :image="image"></d-image>
        <d-text  v-for="(text,index) in texts" :key="index" :text="text"></d-text>
        <d-code  v-for="(code,index) in codes" :key="index" :code="code"></d-code>
       
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
import DChart from '../operation/dChart.vue'
import DShape from '../operation/dShape.vue'
export default defineComponent({
  components:{
    dImage,
    clipper,
    dText,
    DCode,
    Background,
    DChart,
    DShape
  },
  props:{
    postInfo:{
      type:Object,
      default:new Object()
    },
    width:{
      type:Number,
      default:150
    }
  },
  setup (props) {
    const store = useStore()
    const scale = computed(() => {
      return props.width/canvas.value.width
    })
    let clipOper = computed(()=>store.state.clipOper)
    let background = computed(()=>{
      return props.postInfo.background
    })
    let codes = computed(()=>{
      return props.postInfo.codes
    })
    let texts = computed(()=>{
      return props.postInfo.texts
    })
    let images = computed(()=>{
      return props.postInfo.images
    })
    let charts = computed(()=>{
      return props.postInfo.charts
    })
     let shapes = computed(()=>{
      return props.postInfo.shapes
    })
    let canvas = computed(()=>{
      return props.postInfo.canvas
    })
    
  
    return {
      images:images,
      texts:texts,
      codes:codes,
      charts:charts,
      shapes:shapes,
      background:background,
      clipOper,
      canvas,
      scale
    }
  }
})
</script>

<style lang="scss" scoped>
  .editContent{
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.308);
     -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position:relative;
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