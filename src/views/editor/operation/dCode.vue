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
    const draw = () => {
      if (props.pattern == "edit") {
        return;
      }
      QRCode.toCanvas(
        module.value.text,
        {
          margin: 1,
          color: {
            dark: props.code.colorDark,
            light: props.code.colorLight,
          },
        },
        (err: any, canvas: any) => {
          if (err) throw err;
          code.value.append(canvas);
          var image = new Image();
          image.src = canvas.toDataURL("image/png");
          image.style.width = "100%";
          image.style.height = "100%";
          code.value.innerHTML = "";
          code.value.append(image);
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
    watch([text, colorDark, colorLight], () => {
      draw();
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