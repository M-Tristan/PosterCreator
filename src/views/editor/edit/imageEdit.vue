<template>
<div class='image-area' v-if="editModule.type=='image'">
  <el-collapse v-model="activeNames">
  <el-collapse-item title="图片" name="1">
    <div class='oper-item'>
      <div class='oper-name'>
        模糊  
      </div>
      <div class='oper-input'>
        <input-number v-model="editModule.blur"></input-number>
        <!-- <el-input-number size="mini" :min="0" :max="50" v-model="editModule.blur"></el-input-number> -->
      </div>
    </div>
    <div class='oper-item'>
      <div class='oper-name'>
        透明度  
      </div>
      <div class='oper-input'>
        <el-input-number size="mini" :min="0" :max="1" :step="0.01"  v-model="editModule.opacity"></el-input-number>
      </div>
    </div>
    <div class='oper-item'>
      <div class='oper-name'>
        圆角
      </div>
      <div class='oper-input'>
        <el-input-number size="mini" :min="0" :max="borderRadiusMax" v-model="editModule.borderRadius"></el-input-number>
      </div>
    </div>
   <!-- <div class='oper-item'>
      <div class='oper-name'>
        翻转  
      </div>
      <div class='oper-input'>
        <div :class='["flip",{active:editModule.rotateX}]' @click="editModule.rotateX = !editModule.rotateX">
          <i class='el-icon-sort'></i>
        </div>
        <div :class='["flip",{active:editModule.rotateY}]' @click="editModule.rotateY = !editModule.rotateY">
            <i class='el-icon-sort transverse'></i>
        </div>
        
      
      </div>
    </div> -->
  </el-collapse-item>
  <el-collapse-item title="投影" name="2">
     <div class='oper-item'>
      <div class='oper-name'>
         投影颜色
      </div>
     
      <div class='oper-input'>
         <el-color-picker v-model="editModule.dropshadowColor" size="mini" show-alpha ></el-color-picker>
      </div>
    </div>
     <div class='oper-item'>
      <div class='oper-name'>
        横向距离  
      </div>
      <div class='oper-input'>
        <el-input-number size="mini" v-model="editModule.dropshadowX" ></el-input-number>
      </div>
    </div>
     <div class='oper-item'>
      <div class='oper-name'>
        纵向距离  
      </div>
      <div class='oper-input'>
        <el-input-number size="mini" v-model="editModule.dropshadowY"></el-input-number>
      </div>
    </div>
     <div class='oper-item'>
      <div class='oper-name'>
        模糊  
      </div>
      <div class='oper-input'>
        <el-input-number size="mini" v-model="editModule.dropshadowBlur"></el-input-number>
      </div>
    </div>
  </el-collapse-item>
  <!-- <el-collapse-item title="边框" name="3">
   <div class='oper-item'>
      <div class='oper-name'>
         颜色
      </div>
      <div class='oper-input'>
         <el-color-picker v-model="editModule.borderColor" size="mini" show-alpha></el-color-picker>
      </div>
    </div>
   <div class='oper-item'>
      <div class='oper-name'>
        大小  
      </div>
      <div class='oper-input'>
        <el-input-number size="mini" v-model="editModule.borderWidth"></el-input-number>
      </div>
    </div>
  </el-collapse-item> -->
  <el-collapse-item title="位置" name="3">
    <div class='oper-item'>
      <div class='oper-name'>
        旋转角度  
      </div>
      <div class='oper-input'>
        <el-input-number size="mini" :min='0' :max='360' v-model="editModule.rotate"></el-input-number>
      </div>
    </div>
    <div class='oper-item'>
      <div class='oper-name'>
        左边距  
      </div>
      <div class='oper-input'>
        <el-input-number size="mini" v-model="editModule.left"></el-input-number>
      </div>
    </div>
    <div class='oper-item'>
      <div class='oper-name'>
        上边距  
      </div>
      <div class='oper-input'>
        <el-input-number size="mini" v-model="editModule.top"></el-input-number>
      </div>
    </div>
    <div class='oper-item'>
      <div class='oper-name'>
        宽  
      </div>
      <div class='oper-input'>
        <el-input-number size="mini" v-model="editModule.width"></el-input-number>
      </div>
    </div>
    <div class='oper-item'>
      <div class='oper-name'>
        高 
      </div>
      <div class='oper-input'>
        <el-input-number size="mini" v-model="editModule.height"></el-input-number>
      </div>
    </div>
  </el-collapse-item>
  <el-collapse-item title="操作" name="4">
    <el-button type="info" plain size="mini" @click="clipImage">裁剪</el-button>
  </el-collapse-item>
</el-collapse>
</div>

</template>

<script lang="ts">
import { useStore } from 'vuex'
import { computed, defineComponent, ref } from 'vue'
export default defineComponent({
  components:{
  },
  setup () {
    const store = useStore()
    let activeNames = ref(['1'])
    let value = ref(1)
    let color = ref('rgab(100,100,100,1)')
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
.image-area{
  padding-left:10px;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar{
    width: 0;
  }
}

</style>