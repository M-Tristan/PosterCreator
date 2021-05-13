<template>
<div class='image-area' >
  <el-collapse v-model="activeNames">
  <el-collapse-item title="文本" name="1">
    <div class='oper-item'>
      <div class='oper-name'>
        字号  
      </div>
      <div class='oper-input'>
         <input-number @finishChange='pushBack' v-model="editModule.fontSize" :min="6" :max="1000"></input-number>
      </div>
    </div>
     <div class='oper-item'>
      <div class='oper-name'>
         颜色
      </div>
      <div class='oper-input'>
         <el-color-picker @change='pushBack' v-model="editModule.color" size="mini" show-alpha ></el-color-picker>
      </div>
    </div>
    <div class='oper-item'>
       <div class='oper-name'>
         装饰
      </div>
      <div class='decoration'>
           <div :class='["flip",{active:editModule.bold}]' @click="editModule.bold = !editModule.bold">
            <i class='icon iconfont icon-bold'></i>
          </div>
          <div :class='["flip",{active:editModule.italic}]' @click="editModule.italic = !editModule.italic">
            <i class='icon iconfont icon-zitixieti'></i>
          </div>
          <div :class='["flip",{active:editModule.textDecoration == "underline"}]' @click="changeDecoration('underline')">
            <i class='icon iconfont icon-zitixiahuaxian'></i>
          </div>
          <div :class='["flip",{active:editModule.textDecoration == "line-through"}]' @click="changeDecoration('line-through')">
            <i class='icon iconfont icon-strikethrough'></i>
          </div>
      </div>
    </div>
    <div class='oper-item'>
       <div class='oper-name'>
         对齐
      </div>
      <div class='decoration'>
          <div :class='["flip",{active:editModule.textAlign == "left"}]' @click="editModule.textAlign = 'left'">
            <i class='icon iconfont icon-zuoduiqi'></i>
          </div>
          <div :class='["flip",{active:editModule.textAlign == "center"}]' @click="editModule.textAlign = 'center'">
            <i class='icon iconfont icon-juzhongduiqi'></i>
          </div>
          <div :class='["flip",{active:editModule.textAlign == "right"}]' @click="editModule.textAlign = 'right'">
            <i class='icon iconfont icon-youduiqi'></i>
          </div>
          <!-- <div :class='["flip",{active:editModule.textAlign == "justify"}]' @click="editModule.textAlign = 'justify'">
            <i class='icon iconfont icon-zuoyouduiqi'></i>
          </div> -->
      </div>
     
    </div>
     <div class='oper-item'>
        <div class='oper-name'>
          行间距  
        </div>
        <div class='oper-input'>
          <input-number @finishChange='pushBack' v-model="editModule.lineHeight" :min="1" :max="10" :step='0.1'></input-number>
        </div>
      </div>
      <div class='oper-item'>
        <div class='oper-name'>
          字间距  
        </div>
        <div class='oper-input'>
          <input-number @finishChange='pushBack' v-model="editModule.letterSpacing" :min="0" :max="100" :step='1'></input-number>
        </div>
      </div>
       <div class='oper-item'>
        <div class='oper-name'>
          不透明度  
        </div>
        <div class='oper-input'>
           <input-number @finishChange='pushBack' v-model="editModule.opacity" :min="0" :max="1" :step="0.01"></input-number>
        </div>
      </div>
  </el-collapse-item>
  <el-collapse-item title="修饰" name="2">
     <div class='oper-item'>
      <div class='oper-name'>
         描边
      </div>
      <div class='oper-input'>
         <el-color-picker @change='pushBack' v-model="editModule.strokeColor" size="mini" show-alpha ></el-color-picker>
         <div class='strokeWidth'>
           <input-number @finishChange='pushBack' v-model="editModule.strokeWidth" :min="0" :max="50"></input-number>
         </div>
         
      </div>
    </div>
    <div class='oper-item'>
      <div class='oper-name'>
         阴影
      </div>
      <div class='oper-input'>
        <div class='add-area'>
          <i class='el-icon-circle-plus-outline add-icon' @click='addTextShadow'></i>
        </div>
         <div class='text-shadow' v-for="(shadow,index) in editModule.textShadowList" :key="index">
           <div class='item'>
             <el-color-picker @change='pushBack' v-model="shadow.color" size="mini" show-alpha ></el-color-picker>
           </div>
           <div class='item'>
              <input-number @finishChange='pushBack' v-model="shadow.hShadow" :min="0" :max="50"></input-number>
           </div>
           <div class='item'>
              <input-number @finishChange='pushBack' v-model="shadow.vShadow" :min="0" :max="50"></input-number>
           </div>
           <div class='item'>
              <input-number @finishChange='pushBack' v-model="shadow.blur" :min="0" :max="50"></input-number>
           </div>
            <div class='item'>
              <i class='el-icon-delete delete-icon' @click='deleteTextShadow(index)'></i>
           </div>
         </div>
      </div>
      
    </div>
  </el-collapse-item>
<el-collapse-item title="位置" name="3">
    <div class='oper-item'>
      <div class='oper-name'>
        旋转角度  
      </div>
      <div class='oper-input'>
        <input-number @finishChange='pushBack'  :min='0' :max='360' v-model="editModule.rotate"></input-number>
      </div>
    </div>
    <div class='oper-item'>
      <div class='oper-name'>
        左边距  
      </div>
      <div class='oper-input'>
        <input-number @finishChange='pushBack'  v-model="editModule.left"></input-number>
      </div>
    </div>
    <div class='oper-item'>
      <div class='oper-name'>
        上边距  
      </div>
      <div class='oper-input'>
        <input-number @finishChange='pushBack'  v-model="editModule.top"></input-number>
      </div>
    </div>
    <div class='oper-item'>
      <div class='oper-name'>
        宽  
      </div>
      <div class='oper-input'>
        <input-number @finishChange='pushBack'  v-model="editModule.width"></input-number>
      </div>
    </div>
    <div class='oper-item'>
      <div class='oper-name'>
        高 
      </div>
      <div class='oper-input'>
         <input-number @finishChange='pushBack'  v-model="editModule.height"></input-number>
      </div>
    </div>
  </el-collapse-item>
</el-collapse>
</div>

</template>

<script lang="ts">
import { useStore } from 'vuex'
import { computed, defineComponent, ref } from 'vue'
import _ from 'lodash'
import operation from '../operation/common/operation'
export default defineComponent({
  setup () {
    const store = useStore()
    const { pushBack } = operation()
    let activeNames = ref(['1'])
    const editModule:any= computed(()=>{
      return store.state.editModule
    })

    const changeDecoration = (type:string) => {
      if(editModule.value.textDecoration == type){
        editModule.value.textDecoration = 'none'
      }else{
         editModule.value.textDecoration = type
      }
      
    }
    const addTextShadow = () => {
      editModule.value.textShadowList.push({
         hShadow:10,
        vShadow:10,
        blur:0,
        color:'rgba(0, 0, 0, 1)'
      })
    }
    const deleteTextShadow = (index:number) => {
      editModule.value.textShadowList.splice(index,1)
    }
    return {activeNames,editModule,changeDecoration,addTextShadow,deleteTextShadow,pushBack}
  }
})
</script>

<style lang="scss" scoped>
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
.decoration{
   width: 70%;
   display: flex;
   justify-content: space-around;
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
.active{
  color: rgb(255, 255, 255);
  background-color: rgb(0, 36, 112);
 
}
.text-shadow{
  width: 100%;
  display: flex;
}
.add-area{
  height: 20px;
  width: 100%;
}
.add-icon{
  font-size: 20px;
  float: right;
  cursor: pointer;
}
.delete-icon{
  cursor: pointer;
}
.strokeWidth{
  display: inline-block;
  float: left;
  width: 70%;
  margin-left: 10px;
}
</style>