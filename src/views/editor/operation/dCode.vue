<template>
  <div
    class="code-content"
    @mousedown="moduleMove(module)"
    :style="{
      width: module.width + 'px',
      height: module.height + 'px',
      left: module.left + 'px',
      top: module.top + 'px',
      transform: `rotate(${module.rotate ? module.rotate : 0}deg)`,
      zIndex: module.zindex,
    }"
  >
    <img
      class="backImage"
      draggable="false"
      v-if="module.backImage && pattern == 'show'"
      :src="module.backImage"
    />
    <div
      v-if="pattern == 'show'"
      ref="code"
      class="code"
      draggable="false"
    ></div>
    <lock
      :module="module"
      v-if="editModule.id == module.id && pattern == 'edit'"
    ></lock>
    <regulator
      :module="module"
      v-if="editModule.id == module.id && pattern == 'edit'"
    ></regulator>
    <rotate
      :module="module"
      v-if="editModule.id == module.id && pattern == 'edit'"
    ></rotate>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import regulator from "./regulator.vue";
import rotate from "./rotate.vue";
import operation from "./common/operation";
import * as QRCode from "qrcode";
import Lock from "./lock.vue";
import BaseCache from "@/lib/baseCache";
import _ from "lodash";
export default defineComponent({
  props: {
    code: {
      type: Object,
      default: new Object(),
    },
    pattern: {
      type: String,
      default: "edit",
    },
    collect: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    regulator,
    rotate,
    Lock,
  },

  setup(props) {
    const store = useStore();
    let code = ref(null as unknown as HTMLElement);
    onMounted(() => {
      draw();
    });
    let useCanvas: HTMLCanvasElement;
    let codeUrl = "";
    let codeImage: HTMLImageElement;
    const debouncePushModule = _.debounce(() => {
      BaseCache.pushModule(module.value.id, useCanvas.toDataURL());
    }, 200);
    const resetCode = () => {
      if (!useCanvas || !codeImage) {
        return;
      }
      let ctx = useCanvas.getContext("2d") as CanvasRenderingContext2D;
      ctx.clearRect(0, 0, 1000, 1000);
      ctx.drawImage(codeImage, 0, 0, 1000, 1000);
      ctx.globalCompositeOperation = "source-in";
      ctx.fillStyle = props.code.colorLight;
      ctx.fillRect(0, 0, 1000, 1000);
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = props.code.colorDark;
      ctx.fillRect(0, 0, 1000, 1000);
      if (props.collect) {
        debouncePushModule();
      }
    };
    const draw = () => {
      if (props.pattern == "edit") {
        return;
      }
      QRCode.toCanvas(
        module.value.text,
        {
          margin: 1,
          width: 1000,
          color: {
            dark: "#FFFFFF00",
            // dark: props.code.colorDark,
            // light: "#FFFFFF00",
            light: "#FFFFFF",
          },
        },
        (err: any, canvas: HTMLCanvasElement) => {
          if (err) throw err;
          code.value.innerHTML = "";
          code.value.append(canvas);
          canvas.style.width = "100%";
          canvas.style.height = "100%";
          useCanvas = canvas;
          // let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
          // ctx.globalCompositeOperation = "destination-over";
          // ctx.fillStyle = props.code.colorLight;
          // ctx.fillRect(0, 0, 1000, 1000);
          canvas.toBlob((blob) => {
            URL.revokeObjectURL(codeUrl);
            codeUrl = URL.createObjectURL(blob);
            codeImage = new Image();
            codeImage.src = codeUrl;
            codeImage.onload = () => {
              resetCode();
            };
          });

          // var image = new Image();
          // image.src = canvas.toDataURL("image/png");
          // image.style.width = "100%";
          // image.style.height = "100%";
          // code.value.innerHTML = "";
          // code.value.append(image);
        }
      );
    };

    const editModule: any = computed(() => {
      return store.state.editModule;
    });
    const module: any = computed(() => {
      return props.code;
    });
    const text: any = computed(() => {
      return module.value.text;
    });
    const colorDark: any = computed(() => {
      return module.value.colorDark;
    });
    const colorLight: any = computed(() => {
      return module.value.colorLight;
    });
    watch([text], () => {
      draw();
    });
    watch([colorDark, colorLight], () => {
      resetCode();
    });
    watch(
      () => {
        return module.value.width;
      },
      (nv, ov) => {
        module.value.height = nv;
      }
    );

    const { moduleMove } = operation();
    const selectModel = () => {
      store.commit("setEditModule", module.value.id);
    };
    return { module, moduleMove, editModule, selectModel, code };
  },
});
</script>

<style lang="scss" scoped>
.code-content {
  position: absolute;
  display: inline-block;
  cursor: move;
  user-select: none;
}
.backImage {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: -1;
}
.code {
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>