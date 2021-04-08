<template>
  <div class='background' :style="{
      backgroundColor:background.color
    }">
    <img v-if="background.imageUrl" :src='background.imageUrl' />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
   props:{
    background:{
      type:Object,
      default:new Object()
    }
  },
  setup () {
     
    return {

    }
  }
})
</script>

<style lang="scss" scoped>
.background{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
}
</style>