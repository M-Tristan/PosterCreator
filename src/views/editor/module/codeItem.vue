<template>
  <div ref='code' class='code' @click='addCode'>

  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import * as QRCode from 'qrcode';
import ModuleUtil from '@/lib/ModuleUtil'
import { useStore } from 'vuex'
import { operItem } from '@/interface/module';
export default defineComponent({
  props:{
    options:{
      type:Object,
      default:{}
    }
  },
  setup (props) {
    const store = useStore()
    let code = ref(null as unknown as HTMLElement)
    onMounted(()=>{
      QRCode.toCanvas('二维码编辑', props.options, (err: any, canvas: any) => {
        code.value.append(canvas) 
          if (err) throw err;
      });
    })
    const addCode = async () =>{
      let codeInfo = <operItem> await ModuleUtil.getAddCodeInfo({
            text:'二维码编辑',
            colorDark:props.options.color.dark,
            colorLight:props.options.color.light
      })
      store.commit('addCode',codeInfo)
      store.commit('setEditModule',codeInfo.id)
    }
    return {code,addCode}
  }
})
</script>

<style lang="scss" scoped>
.code{
  float: left;
  cursor: pointer;
}
</style>