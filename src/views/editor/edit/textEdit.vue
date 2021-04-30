<template>
<div class='image-area' v-if="editModule.type=='text'">
  <el-collapse v-model="activeNames">
  <el-collapse-item title="文本" name="1">
    <div class='oper-item'>
      <div class='oper-name'>
        字号  
      </div>
      <div class='oper-input'>
         <input-number v-model="editModule.fontSize" :min="6" :max="1000"></input-number>
      </div>
    </div>
     <div class='oper-item'>
      <div class='oper-name'>
         颜色
      </div>
      <div class='oper-input'>
         <el-color-picker v-model="editModule.color" size="mini" show-alpha ></el-color-picker>
      </div>
    </div>
    <div class='oper-item'>
       <div class='oper-name'>
         装饰
      </div>
      <div class='decoration'>
           <div :class='["flip",{active:editModule.rotateX}]' >
            <i class='icon iconfont icon-bold'></i>
          </div>
          <div :class='["flip",{active:editModule.rotateX}]' >
            <i class='icon iconfont icon-zitixieti'></i>
          </div>
          <div :class='["flip",{active:editModule.rotateX}]' >
            <i class='icon iconfont icon-zitixiahuaxian'></i>
          </div>
          <div :class='["flip",{active:editModule.rotateX}]' >
            <i class='icon iconfont icon-strikethrough'></i>
          </div>
      </div>
    </div>
    <div class='oper-item'>
       <div class='oper-name'>
         对齐
      </div>
      <div class='decoration'>
           <div :class='["flip",{active:editModule.rotateX}]' >
            <i class='icon iconfont icon-zuoduiqi'></i>
          </div>
          <div :class='["flip",{active:editModule.rotateX}]' >
            <i class='icon iconfont icon-juzhongduiqi'></i>
          </div>
          <div :class='["flip",{active:editModule.rotateX}]' >
            <i class='icon iconfont icon-youduiqi'></i>
          </div>
          <div :class='["flip",{active:editModule.rotateX}]' >
            <i class='icon iconfont icon-zuoyouduiqi'></i>
          </div>
      </div>
     
    </div>
     <div class='oper-item'>
        <div class='oper-name'>
          行间距  
        </div>
        <div class='oper-input'>
          <input-number  :min="1" :max="10"></input-number>
        </div>
      </div>
      <div class='oper-item'>
        <div class='oper-name'>
          字间距  
        </div>
        <div class='oper-input'>
          <el-input-number size="mini" :min="1" :max="10" ></el-input-number>
        </div>
      </div>
       <div class='oper-item'>
        <div class='oper-name'>
          不透明度  
        </div>
        <div class='oper-input'>
          <input-number  :min="1" :max="10"></input-number>
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
    let activeNames = ref(['1'])
    let value = ref(1)
    let color = ref('rgab(100,100,100,100)')
    const editModule:any= computed(()=>{
      return store.state.editModule
    })
    const borderRadiusMax = computed(() => {
      if(editModule.value.width>editModule.value.height){
        return editModule.value.height/2
      }else{
        return editModule.value.width/2
      }
    })
    const clipImage = () => {
      let clipOper = store.state.clipOper
      store.commit('setClipOper', !clipOper);
    }
    return {activeNames,value,color,editModule,borderRadiusMax,clipImage}
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
  color: rgb(5, 142, 255);
  background-color: rgb(0, 36, 112);
 
}

</style>