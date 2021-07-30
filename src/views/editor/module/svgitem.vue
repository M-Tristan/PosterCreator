<template>
  <div>
    <div @click="selectImage" ref="svgarea" class="svgarea"></div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  props: {
    src: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    let svg = ref("");

    let svgarea = ref(null as unknown as HTMLDivElement);
    onMounted(() => {
      axios.get(props.src).then((data) => {
        svg.value = data.data;
        svgarea.value.innerHTML = svg.value;
        svgarea.value.children[0].setAttribute(
          "style",
          "width:100%;height:100%"
        );
      });
    });

    const selectImage = () => {
      let pathList = svgarea.value.children[0].querySelectorAll("path");
      console.log(pathList);
      let colorList = <any>[];
      for (let index = 0; index < pathList.length; index++) {
        let path = <SVGPathElement>pathList[index];
        if (
          path.getAttribute("fill") &&
          colorList.findIndex((item) => {
            item === path.getAttribute("fill");
          }) == -1
        ) {
          colorList.push(path.getAttribute("style"));
        }
      }
      console.log(colorList);
    };
    return { svg, svgarea, selectImage };
  },
});
</script>

<style lang="scss" scoped>
.svgarea {
  width: 100%;
  height: 100%;
}
</style>