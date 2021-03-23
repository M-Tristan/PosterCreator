<template>
    <div class='InputNumber'>
        <div >
            <i class='el-icon-minus'></i>
        </div>
        <div>100%</div>
        <div>
            <i class='el-icon-plus'></i>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup () {
        

        return {}
    }
})
</script>

<style lang="scss" scoped>
.InputNumber{
      overflow: hidden;
      position: absolute;
      width: 158px;
      height: 38px;
      background: #2B2C2F;
      border-radius: 19px;
      left: 50%;
      bottom: 50px;
      transform: translateX(-50%);
      z-index: 9999;
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: white;
    }
</style>