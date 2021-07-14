<template>
  <div class="image-item" v-for="(url, index) in imageList" :key="index">
    <el-image
      @click="selectImage(url)"
      style="width: 80px; height: 80px"
      :src="url"
      fit="contain"
    ></el-image>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ModuleUtil from "@/lib/ModuleUtil";
import { useStore } from "vuex";
import { operItem } from "@/interface/module";
import { getImageList } from "@/api/api";
export default defineComponent({
  setup() {
    const store = useStore();
    onMounted(async () => {
      let res = await getImageList({ type: "img" });
      imageList.value = res.map((item) => item.image_url);
    });
    const imageList = ref([]);
    const selectImage = async (url: string) => {
      let imageInfo = <operItem>await ModuleUtil.getAddImageInfo(url);

      store.commit("addImage", imageInfo);
      store.commit("setEditModule", imageInfo.id);
      store.commit("pushBack");
    };

    return { imageList, selectImage };
  },
});
</script>

<style lang="scss" scoped>
.image-item {
  width: 80px;
  height: 80px;
  margin: 5px;
  float: left;
  border: 1px solid rgb(230, 230, 230);
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: 0.1s;
  }
}
</style>