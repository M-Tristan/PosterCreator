<template>
  <div class="textList">
    <div class="text-item" @click="addText">
      <i class="el-icon-plus"></i>添加文字
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import ModuleUtil from '@/lib/ModuleUtil'
export default {
  setup () {
    const store = useStore()
    const addText = async () => {
      let textInfo = await ModuleUtil.getAddTextInfo('双击修改文字')
      store.commit('addText', textInfo)
      store.commit('setEditModule', textInfo.id)
      store.commit('pushBack');
    }
    return {
      addText
    }
  }
}
</script>

<style lang="scss" scoped>
.text-item {
  font-size: 20px;
  width: 100%;
  cursor: pointer;
  &:hover {
    color: rgb(0, 162, 255);
  }
}
</style>