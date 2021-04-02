<template>
<div style="padding-left:10px">
  <el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item title="图片" name="1">
    <div class='oper-item'>
      <div class='oper-name'>
        模糊  
      </div>
      <div class='oper-input'>
        <el-input-number size="mini" v-model="value"></el-input-number>
      </div>
    </div>
    <div class='oper-item'>
      <div class='oper-name'>
        透明度  
      </div>
      <div class='oper-input'>
        <el-input-number size="mini" v-model="value"></el-input-number>
      </div>
    </div>
    <div class='oper-item'>
      <div class='oper-name'>
        圆角  
      </div>
      <div class='oper-input'>
        <el-input-number size="mini" v-model="value"></el-input-number>
      </div>
    </div>
   <div class='oper-item'>
      <div class='oper-name'>
        翻转  
      </div>
      <div class='oper-input'>
        <div class='flip'>
          <i class='el-icon-sort'></i>
        </div>
        <div class='flip'>
            <i class='el-icon-sort transverse'></i>
        </div>
        
      
      </div>
    </div>
  </el-collapse-item>
  <el-collapse-item title="投影" name="2">
     <div class='oper-item'>
      <div class='oper-name'>
         投影颜色
      </div>
      <div class='oper-input'>
         <el-color-picker v-model="color" size="mini"></el-color-picker>
      </div>
    </div>
     <div class='oper-item'>
      <div class='oper-name'>
        横向距离  
      </div>
      <div class='oper-input'>
        <el-input-number size="mini" v-model="value" ></el-input-number>
      </div>
    </div>
     <div class='oper-item'>
      <div class='oper-name'>
        纵向距离  
      </div>
      <div class='oper-input'>
        <el-input-number size="mini" v-model="value"></el-input-number>
      </div>
    </div>
     <div class='oper-item'>
      <div class='oper-name'>
        模糊  
      </div>
      <div class='oper-input'>
        <el-input-number size="mini" v-model="value"></el-input-number>
      </div>
    </div>
     <div class='oper-item'>
      <div class='oper-name'>
        透明度  
      </div>
      <div class='oper-input'>
        <el-input-number size="mini" v-model="value"></el-input-number>
      </div>
    </div>
  </el-collapse-item>
  <el-collapse-item title="边框" name="3">
   <div class='oper-item'>
      <div class='oper-name'>
         颜色
      </div>
      <div class='oper-input'>
         <el-color-picker v-model="color" size="mini"></el-color-picker>
      </div>
    </div>
   <div class='oper-item'>
      <div class='oper-name'>
        大小  
      </div>
      <div class='oper-input'>
        <el-input-number size="mini" v-model="value"></el-input-number>
      </div>
    </div>
  </el-collapse-item>
  <el-collapse-item title="位置" name="4">
    <div class='oper-item'>
      <div class='oper-name'>
        大小  
      </div>
      <div class='oper-input'>
        <el-input-number size="mini" v-model="value"></el-input-number>
      </div>
    </div>
    <div class='oper-item'>
      <div class='oper-name'>
        旋转角度  
      </div>
      <div class='oper-input'>
        <el-input-number size="mini" v-model="value"></el-input-number>
      </div>
    </div>
    <div class='oper-item'>
      <div class='oper-name'>
        左边距  
      </div>
      <div class='oper-input'>
        <el-input-number size="mini" v-model="value"></el-input-number>
      </div>
    </div>
    <div class='oper-item'>
      <div class='oper-name'>
        上边距  
      </div>
      <div class='oper-input'>
        <el-input-number size="mini" v-model="value"></el-input-number>
      </div>
    </div>
    <div class='oper-item'>
      <div class='oper-name'>
        宽  
      </div>
      <div class='oper-input'>
        <el-input-number size="mini" v-model="value"></el-input-number>
      </div>
    </div>
    <div class='oper-item'>
      <div class='oper-name'>
        高 
      </div>
      <div class='oper-input'>
        <el-input-number size="mini" v-model="value"></el-input-number>
      </div>
    </div>
  </el-collapse-item>
</el-collapse>
</div>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    let activeNames = ref(['1'])
    let value = ref(1)
    let color = ref('rgab(100,100,100,100)')
    return {activeNames,value,color}
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
.transverse{
  transform: rotate(90deg);
}
.flip{
  border-radius: 5px;
  width: 25px;
  height: 25px;
  background-color: rgb(187, 187, 187);
  color: white;
  font-size: 20px;
  float: left;
 margin-left: 5px;
 display: flex;
 justify-content: center;
 align-items: center;
}
</style>