<template>
  <div align="left">
    <code-item
      v-for="(option, index) in options"
      :key="index"
      :options="option"
    ></code-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import CodeItem from "./codeItem.vue";
export default defineComponent({
  setup() {
    const options = reactive([
      {
        width: 130,
        color: {
          dark: `#000000`,
          light: `#ffffff`,
        },
      },
      {
        width: 130,
        color: {
          dark: `#ff0000`,
          light: `#ffffff`,
        },
      },
      {
        width: 130,
        color: {
          dark: `#0062ff`,
          light: `#ffffff`,
        },
      },
      {
        width: 130,
        color: {
          dark: `#06aa00`,
          light: `#ffffff`,
        },
      },
      {
        width: 130,
        color: {
          dark: `#ff000000`,
          light: `#ffffff`,
        },
        backImage:
          "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1005311525,3378555589&fm=26&gp=0.jpg",
      },
      {
        width: 130,
        color: {
          dark: `#ff000000`,
          light: `#ffffff`,
        },
        backImage:
          "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1809522521,2258770536&fm=26&gp=0.jpg",
      },
      {
        width: 130,
        color: {
          dark: `#ff000000`,
          light: `#ffffff`,
        },
        backImage:
          "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2652502567,2694672588&fm=224&gp=0.jpg",
      },
      {
        width: 130,
        color: {
          dark: `#ff000000`,
          light: `#ffffff`,
        },
        backImage:
          "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=30483879,2654665119&fm=26&gp=0.jpg",
      },
      {
        width: 130,
        color: {
          dark: `#ff000000`,
          light: `#ffffff`,
        },
        backImage:
          "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=959019894,2330780891&fm=26&gp=0.jpg",
      },
    ]);

    return { options };
  },
  components: {
    CodeItem,
  },
});
</script>

<style lang="scss" scoped>
* {
  color: #ff000000;
}
</style>