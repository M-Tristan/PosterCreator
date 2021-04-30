<template>
<div class='image-area' >
  <el-collapse v-model="activeNames">
  <el-collapse-item title="二维码" name="1">
    <div class='oper-item'>
      <div class='oper-name'>
        内容  
      </div>
      <div class='oper-input'>
        <el-tag type="info" class='code-content' @click="editCodeContent(editModule.text)">{{editModule.text}}</el-tag>
        
      </div>
    </div>
     <div class='oper-item' >
      <div class='oper-name'>
         颜色
      </div>
      <div class='oper-input'>
         <el-color-picker color-format='hex' v-model="editModule.colorLight" size="mini" :show-alpha='false' ></el-color-picker>
         <el-color-picker color-format='hex' v-if="!editModule.backImage" v-model="editModule.colorDark" size="mini" :show-alpha='false' ></el-color-picker>
      </div>
    </div>
  </el-collapse-item>
<el-collapse-item title="位置" name="2">
    <div class='oper-item'>
      <div class='oper-name'>
        旋转角度  
      </div>
      <div class='oper-input'>
        <input-number  :min='0' :max='360' v-model="editModule.rotate"></input-number>
      </div>
    </div>
    <div class='oper-item'>
      <div class='oper-name'>
        左边距  
      </div>
      <div class='oper-input'>
        <input-number  v-model="editModule.left"></input-number>
      </div>
    </div>
    <div class='oper-item'>
      <div class='oper-name'>
        上边距  
      </div>
      <div class='oper-input'>
        <input-number  v-model="editModule.top"></input-number>
      </div>
    </div>
    <div class='oper-item'>
      <div class='oper-name'>
        宽  
      </div>
      <div class='oper-input'>
        <input-number  v-model="editModule.width"></input-number>
      </div>
    </div>
    <div class='oper-item'>
      <div class='oper-name'>
        高 
      </div>
      <div class='oper-input'>
         <input-number  v-model="editModule.width"></input-number>
      </div>
    </div>
  </el-collapse-item>
</el-collapse>
</div>
<el-dialog
  title="二维码信息"
  v-model="dialogVisible"
  width="30%"
  :before-close="handleClose">
   <el-input type="textarea" v-model="showContent"></el-input>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="changeCodeContent">确 定</el-button>
    </span>
  </template>
</el-dialog>

</template>

<script lang="ts">
import { useStore } from 'vuex'
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const store = useStore()
    let activeNames = ref(['1'])
    const editModule:any= computed(()=>{
      return store.state.editModule
    })
    const showContent = ref('')
    const editCodeContent = (content:string) => {
      showContent.value = content
      dialogVisible.value = true
    }
    let dialogVisible = ref(false)
    const changeCodeContent = () => {
      editModule.value.text = showContent.value
      dialogVisible.value = false
    }
   

    return {editModule,dialogVisible,editCodeContent,showContent,changeCodeContent,activeNames}
  }
})
</script>

<style lang="scss" scoped>
.oper-item{
  height: 40px;
}
.oper-name{
  width: 30%;
  float: left;
  
}
.oper-input{
  width: 70%;
  float: left;
 display: flex;
 justify-content: center;
 align-items: center;
}


.code-content{
  width: 90%;
  overflow: hidden;
}

</style>