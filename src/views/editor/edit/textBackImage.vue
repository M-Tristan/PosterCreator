<template>
  <div class="image-list">
    <div
      @click="selectImage(src)"
      class="image-item"
      v-for="(src, index) in imageList"
      :key="index"
    >
      <img :src="src" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import operation from "../operation/common/operation";

export default defineComponent({
  setup() {
    const store = useStore();

    let imageList = [
      "https://lp-canvas-1304910572.cos.ap-guangzhou.myqcloud.com/aa24d266-a59f-49b5-8046-8f2b5412f436.jpeg",
      "https://lp-canvas-1304910572.cos.ap-guangzhou.myqcloud.com/14f0a1b4-c455-42c8-b7c7-c0bd041e1c11.jpeg",
      "https://lp-canvas-1304910572.cos.ap-guangzhou.myqcloud.com/f75952ad-7964-4536-8083-170649e5812d.jpeg",
      "https://lp-canvas-1304910572.cos.ap-guangzhou.myqcloud.com/ecc95708-a219-4625-a3a6-07bee5826b90.jpeg",
    ];
    const selectImage = (src) => {
      store.commit("setTextBack", src);
    };
    return { imageList, selectImage };
  },
});
</script>

<style lang="scss" scoped>
.image-item {
  width: 100px;
  height: 100px;
  float: left;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 8px rgba(163, 163, 163, 0.692);
  img {
    max-height: 100%;
    max-width: 100%;
  }
}
.image-list {
  max-height: 300px;
  overflow-y: scroll;
}
</style>