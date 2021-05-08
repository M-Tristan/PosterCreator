<template>
  <div class='mask-demo' @click='selectMask'>
    <canvas ref='canvasDom' width="100" height="100"></canvas>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { computed, defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  props:{
    src:{
      type:String,
      default:''
    }
  },
  setup (props) {
    const store = useStore()
    const canvasDom = ref(null as unknown as HTMLCanvasElement)
    const editModule:any= computed(()=>{
      return store.state.editModule
    })
    onMounted(()=>{
     let image = new Image()
     image.src = props.src
     image.onload = function(){
       draw(image)
     }
    })
    function draw(image){
      let canvas = canvasDom.value
      let ctx = <CanvasRenderingContext2D >canvas.getContext('2d')
      ctx.fillStyle="rgb(0, 153, 255)";
	    ctx.fillRect(0,0,100,100);
      ctx.globalCompositeOperation="destination-in";
      ctx.drawImage(image,0,0,100,100);	
    }
    const selectMask = () => {
      editModule.value.mask = {
        type:'normal',
        src:props.src
      }
      console.log(store.state.editModule)
    }
    return {canvasDom,selectMask}
  }
})
</script>

<style scoped>
.mask-demo{
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.171);
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
}

</style>