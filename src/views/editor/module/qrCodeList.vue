<template>
  <div align='left'>
    <code-item v-for="(option,index) in options" :key="index" :options='option'></code-item>
    
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, } from 'vue'
import CodeItem from './codeItem.vue'
export default defineComponent({
  setup () {
    const options = reactive([
      {
        width:130,
        color: {
          dark: `#000000`,
          light: `#ffffff`
        }
      },
      {
        width:130,
        color: {
          dark: `#ff0000`,
          light: `#ffffff`
        }
      },
      {
        width:130,
        color: {
          dark: `#0062ff`,
          light: `#ffffff`
        }
      },
      {
        width:130,
        color: {
          dark: `#06aa00`,
          light: `#ffffff`
        }
      }
    ])
    return {options}
  },
  components:{
    CodeItem
  }
})
</script>

<style lang="scss" scoped>
*{
  color: #06aa00;
}
</style>