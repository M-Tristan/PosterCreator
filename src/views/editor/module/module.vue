<template>
    <div class='module'>
       <div class='module-item active'>
           <i class='iconfont icon-background modelu-icon'></i>
           <span class='module-name'>背景</span>
       </div>
       <div class='module-item '>
            <i class='iconfont icon-wenben modelu-icon'></i>
            <span class='module-name'>文字</span>
       </div>
       <div class='module-item '>
            <i class='iconfont icon-tupian modelu-icon'></i>
            <span class='module-name'>图片</span>
       </div>
       <div class='module-item '>
            <i class='iconfont icon-erweima modelu-icon'></i>
            <span class='module-name'>二维码</span>
        </div>
        <div class='module-material'>
            <background-list></background-list>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import backgroundList from './backgroundList.vue'
export default defineComponent({
    components:{
        backgroundList
    },  
    setup () {
        

        return {}
    }
})
</script>

<style lang="scss" scoped>
    .module{
        position: relative;
        height: 100%;
    }
    .module-material{
        z-index: 1000;
        width: 280px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 100%;
        border-right: 1px solid rgb(235, 235, 235);
        // background-color: aqua;
    }
.module-item{
    position: relative;
    cursor: pointer;
    width: 65px;
    height: 65px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .modelu-icon{
        font-size: 25px;
    }  
    .module-name{
        font-size: 12px;
    }
    &:hover{
        color: rgb(0, 162, 255);
    }
}
.active{
   &::after{
       content: " ";
       display: inline-block;
       width: 3px;
       height: 100%;
       background-color: rgb(0, 174, 255);
       position: absolute;
       top: 0;
       right: 0;
   }
}
</style>