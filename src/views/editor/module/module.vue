<template>
  <div class="module">
    <div
      :class="['module-item', { active: moduleId == 1 }]"
      @click="moduleId = 1"
    >
      <i class="iconfont icon-wenben modelu-icon"></i>
      <span class="module-name">文字</span>
    </div>
    <div
      :class="['module-item', { active: moduleId == 2 }]"
      @click="moduleId = 2"
    >
      <i class="iconfont icon-tupian modelu-icon"></i>
      <span class="module-name">图片</span>
    </div>
    <div
      :class="['module-item', { active: moduleId == 3 }]"
      @click="moduleId = 3"
    >
      <i class="iconfont icon-erweima modelu-icon"></i>
      <span class="module-name">二维码</span>
    </div>
    <div
      :class="['module-item', { active: moduleId == 4 }]"
      @click="moduleId = 4"
    >
      <i class="el-icon-star-off modelu-icon"></i>
      <span class="module-name">素材</span>
    </div>
    <div
      :class="['module-item', { active: moduleId == 5 }]"
      @click="moduleId = 5"
    >
      <i class="iconfont icon-background modelu-icon"></i>
      <span class="module-name">背景</span>
    </div>
    <div
      :class="['module-item', { active: moduleId == 5 }]"
      @click="moduleId = 6"
    >
      <i class="el-icon-film modelu-icon"></i>
      <span class="module-name">导航器</span>
    </div>
    <div class="module-material">
      <background-list v-if="moduleId == 5"></background-list>
      <image-list v-if="moduleId == 2"></image-list>
      <text-list v-if="moduleId == 1"></text-list>
      <qr-code-list v-if="moduleId == 3"></qr-code-list>
      <material-list v-if="moduleId == 4"></material-list>
      <canvas-list v-if="moduleId == 6"></canvas-list>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ComponentInternalInstance,
  ComponentPublicInstance,
  defineComponent,
  getCurrentInstance,
  ref,
} from "vue";
import backgroundList from "./backgroundList.vue";
import imageList from "./imageList.vue";
import QrCodeList from "./qrCodeList.vue";
import textList from "./textList.vue";
import materialList from "./materialList.vue";
import canvasList from "./canvasList.vue";
export default defineComponent({
  components: {
    backgroundList,
    imageList,
    textList,
    QrCodeList,
    materialList,
    canvasList,
  },
  setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    proxy?.$emitter.on("selectModule", (index) => {
      moduleId.value = index;
    });
    let moduleId = ref(1);
    return { moduleId };
  },
});
</script>

<style lang="scss" scoped>
.module {
  position: relative;
  height: 100%;
}
.module-material {
  z-index: 2000;
  width: 280px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 100%;
  border-right: 1px solid rgb(235, 235, 235);

  background-color: rgb(255, 255, 255);
}
.module-item {
  position: relative;
  cursor: pointer;
  width: 65px;
  height: 65px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .modelu-icon {
    font-size: 25px;
  }
  .module-name {
    font-size: 12px;
  }
  &:hover {
    color: rgb(0, 162, 255);
  }
}
.active {
  &::after {
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