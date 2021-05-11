<template>
  <div class='shape-area'>
    
    <el-collapse v-model="activeNames">
       <el-collapse-item title="形状" name="1">
         <div class='oper-item'>
          <div class='oper-name'>
            颜色  
          </div>
          <div class='oper-input'>
             <el-color-picker  v-model="editModule.color" size="mini" show-alpha ></el-color-picker>
          </div>
        </div>
         <div class='oper-item' v-if="editModule.sectorAngle">
          <div class='oper-name'>
            角度  
          </div>
          <div class='oper-input'>
            <input-number :min='1' :max='359'  v-model="editModule.sectorAngle"></input-number>
          </div>
        </div>
        <div class='oper-item' v-if="editModule.angles">
          <div class='oper-name'>
            角数  
          </div>
          <div class='oper-input'>
            <input-number :min='2' :max='50'  v-model="editModule.angles"></input-number>
          </div>
        </div>
         <div class='oper-item' v-if="editModule.sides">
          <div class='oper-name'>
            边数  
          </div>
          <div class='oper-input'>
            <input-number :min='3' :max='50'  v-model="editModule.sides"></input-number>
          </div>
        </div>
        <div class='oper-item' v-if="editModule.petals">
          <div class='oper-name'>
            花瓣数
          </div>
          <div class='oper-input'>
            <input-number :min='5' :max='50'  v-model="editModule.petals"></input-number>
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
            <input-number  v-model="editModule.height"></input-number>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const store = useStore()
    const editModule:any= computed(()=>{
      return store.state.editModule
    })
     let activeNames = ref(['1'])
    return {editModule,activeNames}
  }
})
</script>

<style scoped>
.shape-area{
  position:absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.oper-item{
  height: auto;
  margin-bottom: 5px;
  display: inline-block;
  width: 100%;
}
.oper-name{
  width: 30%;
  float: left;
  
}
.oper-input{
  width: 70%;
  float: left;
 display: flex;
 flex-wrap: wrap;
 justify-content: center;
 align-items: center;
}
</style>