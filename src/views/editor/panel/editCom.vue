<template>
   <div  class='canvas-area' :style="{
                                  backgroundColor:`#fff`,
                                  backgroundSize: `16px 16px`,
                                  backgroundPosition: `0 0,8px 8px`,
                                  backgroundImage: `linear-gradient(to top right,#ccc 25%,transparent 0,transparent 75%,#ccc 0,#ccc),linear-gradient(to top right,#ccc 25%,transparent 0,transparent 75%,#ccc 0,#ccc)`
                                  ,'width': 420+'px'
                                  ,'height':480+'px'
                                  ,'left':`40%`
                                  ,'top':`10`}">
        
        
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

<style lang="scss" scoped>
  .canvas-area{
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