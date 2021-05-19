<template>
   <div  :class='["editContent",{"backgroundImage":pattern=="show"}]' @mousedown.stop draggable="false" :style="{
                                  overflow:`${pattern=='edit'?'none':'hidden'}`,
                                  transform:`scale(${scale/100},${scale/100}) `,
                                  width: canvas.width+'px'
                                  ,height:canvas.height+'px'
                                  ,left:`${editPosition.left}px`
                                  ,top:`${editPosition.top}px`}">
        <background v-if="pattern=='show'"  :background='background'></background>
        <d-shape :pattern='pattern'   v-for="(shape,index) in shapes" :key="index" :shape="shape"></d-shape>
        <d-chart :pattern='pattern'  v-for="(chart,index) in charts" :key="index" :chart="chart"></d-chart>
        <d-image :pattern='pattern' v-for="(image,index) in images" :key="index" :image="image"></d-image>
        <d-text :pattern='pattern'  v-for="(text,index) in texts"  :key="index" :text="text" ></d-text>
        <d-effect-text :pattern='pattern'  v-for="(effectText,index) in effectTexts"  :key="index" :effectText="effectText"></d-effect-text>
        <d-code  :pattern='pattern' v-for="(code,index) in codes" :key="index" :code="code"></d-code>
        
        <d-group v-if="group&&pattern=='edit'" :group="group"></d-group>
        <clipper  v-if="clipOper&&pattern=='edit'"></clipper>
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
import DGroup from '../operation/dGroup.vue'
import dEffectText from '../operation/dEffectText.vue'
export default defineComponent({
  components:{
    dImage,
    clipper,
    dText,
    DCode,
    Background,
    DChart,
    DShape,
    DGroup,
    dEffectText
  },
  props:{
    pattern:{
      type:String,
      default:'edit'
    }
  },
  setup () {
    const store = useStore()
    const scale = computed(() => {
      return store.state.scale
    })
    let editSize = computed(()=>{
      return  store.state.editSize
    })
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
    let charts = computed(()=>{
      return store.state.postInfo.charts
    })
     let shapes = computed(()=>{
      return store.state.postInfo.shapes
    })
     let effectTexts = computed(()=>{
      return store.state.postInfo.effectTexts
    })
    
    let canvas = computed(()=>{
      return store.state.postInfo.canvas
    })
    let group = computed(()=>{
      return store.state.group
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
    return {
      images:images,
      texts:texts,
      codes:codes,
      charts:charts,
      shapes:shapes,
      background:background,
      group,
      clipOper,
      canvas,
      editSize,
      editPosition,
      scale,
      effectTexts
    }
  }
})
</script>

<style lang="scss" scoped>
  .editContent{
   
     -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position:absolute;
    transform-origin: left top;
    margin-bottom: 30px;
    .background{
      width: 100%;
      height: 100%;
      position: relative;
      img{
        position:absolute;
      }
    }
  }
  .backgroundImage{
     box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.308);
     background-color:#fff;
    background-size: 16px 16px;
    background-position: 0 0,8px 8px;
    background-image: linear-gradient(to top right,#ccc 25%,transparent 0,transparent 75%,#ccc 0,#ccc),linear-gradient(to top right,#ccc 25%,transparent 0,transparent 75%,#ccc 0,#ccc)
  }
</style>