<template>
    <div class='image-item' v-for="(url,index) in imageList" @click='selectBack(url)'  :key="index">
      <el-image 
        style="width: 80px; height: 80px"
        :src="url"
        fit="contain">
        </el-image>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
    setup () {
        const store = useStore()
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
        const selectBack = (url:string) => {
           store.commit('setBackground', url);
        }

        return {imageList,selectBack}
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
</style>