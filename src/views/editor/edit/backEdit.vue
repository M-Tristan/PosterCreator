

<template>
 <!-- -->
  <div class='back-area'  v-if="editModule.type=='back'">
    <el-divider content-position="left">画布</el-divider>
    <div class='size-area'>
      <div class='size-item'>
         <input-number  :min="100" :max="10000"></input-number>
        <span>宽</span>
      </div>
      <div class='size-item'>
        <input-number  :min="100" :max="10000"></input-number>
        <span>高</span>
      </div>
    
    </div>
      
     
    <el-divider content-position="left">背景</el-divider>
      <div class='back-Info'>
        <div class='back-image-area'>
            <div class='image-info'>

            </div>
        </div>
      </div>
      <div class='button-area'>
         <el-button type="primary">设置图片</el-button>
          <el-button type="primary">设置颜色</el-button>
      </div>
  </div>

</template>

<script lang="ts">
import { useStore } from "vuex"
import { computed, defineComponent, ref } from "vue"
export default defineComponent({
  setup () {
    const store = useStore()
    let width = ref(400)
     let height = ref(400)
    const editModule:any= computed(()=>{
      return store.state.editModule
    })
    return {
      width,
      height,
      editModule
    }
  }
})
</script>

<style lang="scss" scoped>
.back-area{
  position:absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.size-area{
  width: 100%;
  // float: left;
  display: flex;
  height: 40px;
  justify-content: space-around;
}
.size-item{
   width: 45%;
   float: left;
   display: inline-block;
}
.back-Info{
  margin-top: 40px;
  width: 100%;
  display: block;
}
.back-image-area{
  display: flex;
  justify-content: center;
}
.image-info{
  width: 200px;
  height: 200px;
  background-color: green;
}
.button-area{
  width: 100%;
  margin-top: 40px;
}
</style>