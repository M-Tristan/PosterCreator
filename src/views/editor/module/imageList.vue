<template>
    <div class='image-item' v-for="(url,index) in imageList"   :key="index">
     <el-image 
     @click='selectImage(url)'
      style="width: 80px; height: 80px"
      :src="url"
      fit="contain"></el-image>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import ModuleUtil from '@/lib/ModuleUtil'
import { useStore } from 'vuex'
export default defineComponent({
    setup () {
        const store = useStore()
        const imageList = reactive([ "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2093874594,590868280&fm=26&gp=0.jpg",
                "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2399566556,3920230762&fm=11&gp=0.jpg",
                "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1788884744,247153028&fm=26&gp=0.jpg",
                "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4122567880,1521119902&fm=26&gp=0.jpg",
                "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3040151922,2653840628&fm=26&gp=0.jpg",
                "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1229737269,3813877224&fm=26&gp=0.jpg",
                "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=908509453,2784387206&fm=26&gp=0.jpg",
                "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3498433983,3879845361&fm=26&gp=0.jpg",
                "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2997728635,447544785&fm=26&gp=0.jpg",
                "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=660850452,2133139857&fm=11&gp=0.jpg",
                "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=108276212,3144377336&fm=11&gp=0.jpg"
            ])
        const selectImage = async (url:string)=>{
            let imageInfo = await ModuleUtil.getAddImageInfo(url)
            console.log(imageInfo)
            store.commit('addImage',imageInfo)
        }
        return {imageList,selectImage}
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