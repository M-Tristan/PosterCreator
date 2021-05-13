<template>
  <div class='edit-head'>
    <div class='logo'>
      logo
    </div>
    <div class='history-area '>
      <div class='reverse'><i :class='["icon","iconfont","icon-chexiaoyou","icon-history",{disabled:backList.length<1}]' @click='back'></i></div>
      <i :class='["icon","iconfont","icon-chexiaoyou","icon-history",{disabled:nextList.length<1}]'  @click='next'></i>
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
    return {backList,nextList,back,next,pushBack}
  }
})
</script>

<style scoped>
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
</style>