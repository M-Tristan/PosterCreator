<template>
    <div class='color-List'>
      <div class='color-item' v-for="(item,index) in colorList" :key='index' :style='{backgroundColor:item}' @click="backModel.color = item"></div>  
      <div class='color-item'>
        <el-color-picker v-model="backModel.color"  size="mini" show-alpha ></el-color-picker>
      </div>
       
    </div>
    <div class='image-item' v-for="(url,index) in imageList" @click='selectBack(url)'  :key="index">
      <el-image 
        style="width: 80px; height: 80px"
        :src="url"
        fit="contain">
        </el-image>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import ModuleUtil from '@/lib/ModuleUtil'
export default defineComponent({
    setup () {
        const store = useStore()
        const colorList = ref(['red','green','blue','black','white','gray','yellow','gold','greenyellow','brown','aqua'])
        const imageList = reactive(["https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1886815664,3042078165&fm=26&gp=0.jpg",
              "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3197198635,147065671&fm=26&gp=0.jpg",
              "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2223646626,3318155102&fm=26&gp=0.jpg",
              "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3114391237,3786372091&fm=26&gp=0.jpg",
              "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1544803638,310076437&fm=26&gp=0.jpg",
              "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2957528572,4206890035&fm=26&gp=0.jpg",
              "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3196777898,2063165476&fm=26&gp=0.jpg",
              "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1747262246,1068568751&fm=26&gp=0.jpg",
              "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=233606692,1631189151&fm=26&gp=0.jpg",
              "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3555324113,3929451227&fm=26&gp=0.jpg",
              "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2346550673,3354440050&fm=26&gp=0.jpg",
              "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1428225030,2228787498&fm=26&gp=0.jpg"
          ])
        const selectBack = async (url:string) => {
             store.commit('setEditModuleToBack')
             let imageInfo = await ModuleUtil.getBackImageInfo(url)
             store.commit('addBackImage', imageInfo); 
             backModel.value.color=undefined
        }
         const selectColor = async (color:string) => {
             store.commit('setEditModuleToBack')
             backModel.value.image = undefined
             backModel.value.color = color
        }
        const backModel = computed(()=>{
          
          return store.state.postInfo.background
        })
     
        // store.commit('setEditModuleToBack')
        return {imageList,selectBack,colorList,backModel}
    }
})
</script>

<style lang="scss" scoped>
.image-item{
    width: 80px;
    height: 80px;
    margin: 5px;
    float: left;
    border: 1px solid rgb(230, 230, 230);
    cursor: pointer;
    &:hover{
        transform: scale(1.1);
        transition: 0.1s;
    }
}
.color-List{
  width: 100%;
  display: inline-block;
}
.color-item{
  width: 30px;
  height: 30px;
  float: left;
  margin: 5px;
  border:1px solid gray;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>