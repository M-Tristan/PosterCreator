<template>
  <div class='edit-head'>
    <div class='logo'>
      LOGO
    </div>
    <div class='history-area '>
      <div class='reverse'><i :class='["icon","iconfont","icon-chexiaoyou","icon-history",{disabled:backList.length<1}]' @click='back'></i></div>
      <i :class='["icon","iconfont","icon-chexiaoyou","icon-history",{disabled:nextList.length<1}]'  @click='next'></i>
    </div>
    <div class='operation' >
      <el-popover
        placement="bottom"
        :width="200"
        trigger="click"
        v-if="!editModule.lock"
      >
        <template #reference>
         <div class='positionAjust'>
          位置调整
        </div>
        </template>
        <div @click='positionAjust("left")' class='position-item'>
          左对齐
        </div>
        <div @click='positionAjust("right")' class='position-item'>
          右对齐
        </div>
        <div @click='positionAjust("horizontally")' class='position-item'>
          水平居中
        </div>
        <div @click='positionAjust("verticalcenter")' class='position-item'>
          垂直居中
        </div>
        <div @click='positionAjust("top")' class='position-item'>
          顶部对齐
        </div>
        <div @click='positionAjust("bottom")' class='position-item'>
          底部对齐
        </div>
      </el-popover>
      <div class='space'  v-if="!editModule.lock ">|</div>
      <el-popover
        placement="bottom"
        :width="100"
        trigger="click"
        v-if="!editModule.lock"
      >
        <template #reference>
         <div class='layerAjust'><i class='icon iconfont icon-tuceng1'></i></div>
        </template>
        <div @click='layerAdjustment("up")' class='layer-item'>
          上移
        </div>
        <div @click='layerAdjustment("down")' class='layer-item'>
          下移
        </div>
        <div @click='layerAdjustment("top")' class='layer-item'>
          置顶
        </div>
        <div @click='layerAdjustment("bottom")' class='layer-item'>
          置底
        </div>
      </el-popover>
     
      <div class='lockAjust' v-if="!editModule.lock && editModule.type != 'back'" @click='lock'><i class='icon el-icon-unlock'></i></div>
       <div class='lockAjust' v-if="editModule.lock" @click='unlock'><i class='icon el-icon-lock'></i></div>
       <div class='deleteAjust'  v-if="editModule.type != 'back' && !editModule.lock" @click='deletelayer'><i class='icon el-icon-delete'></i></div>
    </div>
    <div class='download'>
      <i class='icon iconfont icon-xiazai'></i>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { computed, defineComponent } from 'vue'
import operation from '../operation/common/operation'

export default defineComponent({
  setup () {
    const store = useStore()
    const { pushBack } = operation()
    const backList = computed(()=>{
      return store.state.backList
    })
    const nextList = computed(()=>{
      return store.state.nextList
    })
    const back = () => {
       if(backList.value.length < 1){
        return
      }
     store.commit('back');
    }
    const next = () => {
      if(nextList.value.length < 1){
        return
      }
     store.commit('next');
    }
    const positionAjust = (type) => {
      store.commit('positionAdjustment',type);
    }
    const layerAdjustment = (type) => {
       store.commit('layerAdjustment',type);
    }
    const editModule:any= computed(()=>{
          return store.state.editModule
        })
    const lock = () => {
      store.commit('lock');
    }
    const unlock = () => {
      store.commit('unlock');
    }
    const deletelayer = () => {
      store.commit('delete');
    }
    return {backList,nextList,back,next,pushBack,positionAjust,layerAdjustment,editModule,lock,unlock,deletelayer}
  }
})
</script>

<style lang='scss' scoped>
*{
  box-sizing: border-box;
}
.edit-head{
   width: 100%;
   height: 50px;
   background-color: rgb(0, 225, 255);
   background-image: linear-gradient(90deg, rgb(0, 234, 255), rgb(89, 0, 255));  
}
.logo{
  width: 200px;
  height: 50px;
  line-height: 50px;
  display:inline-block;
  float: left;
  font-size: 40px;
  color: rgb(255, 255, 255);
  font-weight: 900; 
  background-image: -webkit-linear-gradient(bottom, rgb(224, 224, 224), #ffffff, rgb(224, 224, 224)); 
 -webkit-background-clip: text; 
 -webkit-text-fill-color: transparent; 
}

.history-area{
  display: inline-block;
  float: left;
  height: 50px;
  width: 100px;
  line-height: 50px;
  color: white;
}

.icon-history{
  font-size: 25px;
  cursor: pointer;
}

.reverse{
 transform:rotateY(180deg);
 display: inline-block;
 margin-right: 20px;
}
.disabled{
  color: #8f8f8f;
}
.operation{
  float: left;
  height: 50px;
  width: 300px;
}
.positionAjust{
  float: left;
  line-height: 40px;
  width: 80px;
  color: white;
  font-size: 16px;
  font-family: SourceHanSansCN-Regular;
  cursor: pointer;
  padding: 5px;
  font-weight: 900;
  &:hover{
    background-color: #8f8f8f5d;
  }
}
.layerAjust{
  float: left;
  line-height: 40px;
  height: 50px;
  width: 40px;
  color: white;
  cursor: pointer;
  padding: 5px;
  // font-weight: 900;
  &:hover{
    background-color: #8f8f8f5d;
  }
  .icon{
    font-size: 25px;
  }
}
.lockAjust{
  float: left;
  line-height: 45px;
  height: 50px;
  width: 40px;
  color: white;
  cursor: pointer;
  padding: 5px;
  // font-weight: 900;
  &:hover{
    background-color: #8f8f8f5d;
  }
  .icon{
    font-size: 20px;
  }
}
.deleteAjust{
  float: left;
  line-height: 45px;
  height: 50px;
  width: 40px;
  color: white;
  cursor: pointer;
  padding: 5px;
  // font-weight: 900;
  &:hover{
    background-color: #8f8f8f5d;
  }
  .icon{
    font-size: 20px;
  }
}
.position-item{
  width: 100px;
  float: left;
  color: black;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  font-weight: 900;
  &:hover{
    background-color: #8f8f8f32;
  }
}
.layer-item{
  width: 70px;
  float: left;
  color: black;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  font-weight: 900;
  &:hover{
    background-color: #8f8f8f32;
  }
}
.space{
  color: white;
  font-weight: 900;
  width: 10px;
  line-height: 50px;
  float: left;

}
.download{
  width: 50px;
  float: right;
  line-height: 50px;
  cursor: pointer;
   color: white;
  .icon{
    font-size: 30px;
   
  }
  &:hover{
    color: aqua;
  }
}
</style>