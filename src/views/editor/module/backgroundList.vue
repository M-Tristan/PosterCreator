<template>
  <div class="color-List">
    <div
      class="color-item"
      v-for="(item, index) in colorList"
      :key="index"
      :style="{ backgroundColor: item }"
      @click="selectColor(item)"
    ></div>
    <div class="color-item">
      <el-color-picker
        v-model="backModel.color"
        size="mini"
        show-alpha
      ></el-color-picker>
    </div>
  </div>
  <div
    class="image-item"
    v-for="(url, index) in imageList"
    @click="selectBack(url)"
    :key="index"
  >
    <el-image style="width: 80px; height: 80px" :src="url" fit="contain">
    </el-image>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { useStore } from "vuex";
import ModuleUtil from "@/lib/ModuleUtil";
import { getImageList } from "@/api/api";
export default defineComponent({
  setup() {
    const store = useStore();
    const colorList = ref([
      "red",
      "green",
      "blue",
      "black",
      "white",
      "gray",
      "yellow",
      "gold",
      "greenyellow",
      "brown",
      "aqua",
    ]);
    onMounted(async () => {
      let res = await getImageList({ type: "back" });
      imageList.value = res.map((item) => item.image_url);
    });
    const imageList = ref([]);
    const selectBack = async (url: string) => {
      store.commit("setEditModuleToBack");
      let imageInfo = await ModuleUtil.getBackImageInfo(url);
      store.commit("addBackImage", imageInfo);
      backModel.value.color = undefined;
      store.commit("pushBack");
    };
    const selectColor = async (color: string) => {
      store.commit("setEditModuleToBack");
      backModel.value.image = undefined;
      backModel.value.color = color;
      store.commit("pushBack");
    };
    const backModel = computed(() => {
      return store.state.postInfo.background;
    });

    // store.commit('setEditModuleToBack')
    return { imageList, selectBack, colorList, backModel, selectColor };
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
.color-List {
  width: 100%;
  display: inline-block;
}
.color-item {
  width: 30px;
  height: 30px;
  float: left;
  margin: 5px;
  border: 1px solid gray;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>