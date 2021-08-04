<template>
  <div
    v-show="showImage"
    class="img-content"
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
    <div
      class="image-border"
      :style="{
        borderRadius: `${module.borderRadius}px`,
        border: `solid ${module.borderWidth}px ${module.borderColor}`,
        filter: `blur(${module.blur}px) brightness(${module.filter.brightness}%) 
                  contrast(${module.filter.contrast}%) grayscale(${module.filter.grayscale}%) 
                  hue-rotate(${module.filter.hueRotate}deg) invert(${module.filter.invert}%) 
                  saturate(${module.filter.saturate}%)  drop-shadow(${module.dropshadowX}px ${module.dropshadowY}px ${module.dropshadowBlur}px  ${module.dropshadowColor} )`,
        width: module.width + 'px',
        height: module.height + 'px',
        opacity: module.opacity,
        transform: `rotateY(${module.rotateY ? 180 : 0}deg) rotateX(${
          module.rotateX ? 180 : 0
        }deg)`,
      }"
    >
      <canvas
        v-if="pattern == 'show'"
        class="image"
        :style="{
          width: imageSize.width + 'px',
          height: imageSize.height + 'px',
        }"
        ref="imageCanvas"
      ></canvas>
      <!-- <img draggable="false" class='image' :src='module.src' :style="{  
                                        
                                       
                                        ,left:`-${module.crop.left*imageScale}px`
                                        ,top:`-${module.crop.top*imageScale}px`
                                        
                   }"/> -->
    </div>

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
import { computed, defineComponent, ref, watch } from "vue";
import regulator from "./regulator.vue";
import rotate from "./rotate.vue";
import operation from "./common/operation";
import MathUtil from "@/lib/MathUtil";
import Lock from "./lock.vue";
import FilterUtil from "@/lib/filterUtil";
export default defineComponent({
  props: {
    image: {
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
    let showImage = computed(() => {
      return !(store.state.clipOper && editModule.value.id == module.value.id);
    });
    const editModule: any = computed(() => {
      return store.state.editModule;
    });
    let imageScale = computed(() => {
      return module.value.width / module.value.crop.width;
    });
    const module: any = computed(() => {
      return props.image;
    });
    const store = useStore();
    let image = new Image();
    image.src = module.value.src;
    image.setAttribute("crossOrigin", "anonymous");
    const nature = {
      naturalWidth: 0,
      naturalHeight: 0,
    };
    image.onload = () => {
      nature.naturalWidth = image.naturalWidth;
      nature.naturalHeight = image.naturalHeight;
      draw();
    };
    let imageCanvas = ref(null as unknown as HTMLCanvasElement);
    const draw = () => {
      if (props.pattern == "edit") {
        return;
      }
      let crop = module.value.crop;
      imageCanvas.value.setAttribute("width", String(crop.width));
      imageCanvas.value.setAttribute("height", String(crop.height));
      let ctx = imageCanvas.value.getContext("2d") as CanvasRenderingContext2D;
      ctx.clearRect(0, 0, crop.width, crop.height);
      ctx.drawImage(image, -crop.left, -crop.top);
      if (module.value.mask != undefined && module.value.mask != null) {
        let maskImage = new Image();
        maskImage.src = module.value.mask.src.replace(
          "https://lp-canvas-1304910572.cos.ap-guangzhou.myqcloud.com",
          "https://lp-canvas-1304910572.file.myqcloud.com/"
        );
        maskImage.setAttribute("crossOrigin", "anonymous");
        maskImage.onload = () => {
          ctx.globalCompositeOperation = "destination-in";
          ctx.drawImage(maskImage, 0, 0, crop.width, crop.height);
        };
      }
      if (module.value.filterInfo) {
        let filterInfo = module.value.filterInfo;
        // console.log(module.value);
        switch (filterInfo.type) {
          case "blackWhite":
            FilterUtil.blackWhite(
              ctx as CanvasRenderingContext2D,
              imageCanvas.value
            );
            break;
          case "reverse":
            FilterUtil.reverse(
              ctx as CanvasRenderingContext2D,
              imageCanvas.value
            );
            break;
          case "mosaic":
            FilterUtil.mosaic(
              ctx as CanvasRenderingContext2D,
              imageCanvas.value
            );
            break;
          case "removeRed":
            FilterUtil.removeRed(
              ctx as CanvasRenderingContext2D,
              imageCanvas.value
            );
            break;
          case "removeGreen":
            FilterUtil.removeGreen(
              ctx as CanvasRenderingContext2D,
              imageCanvas.value
            );
            break;
          case "removeBlue":
            FilterUtil.removeBlue(
              ctx as CanvasRenderingContext2D,
              imageCanvas.value
            );
            break;
          case "grayscale":
            FilterUtil.grayscale(
              ctx as CanvasRenderingContext2D,
              imageCanvas.value
            );
            break;
          case "red":
            FilterUtil.red(ctx as CanvasRenderingContext2D, imageCanvas.value);
            break;
          case "green":
            FilterUtil.green(
              ctx as CanvasRenderingContext2D,
              imageCanvas.value
            );
            break;
          case "blue":
            FilterUtil.blue(ctx as CanvasRenderingContext2D, imageCanvas.value);
            break;
          case "nostalgia":
            FilterUtil.nostalgia(
              ctx as CanvasRenderingContext2D,
              imageCanvas.value
            );
            break;
          case "casting":
            FilterUtil.casting(
              ctx as CanvasRenderingContext2D,
              imageCanvas.value
            );
            break;
          case "frozen":
            FilterUtil.frozen(
              ctx as CanvasRenderingContext2D,
              imageCanvas.value
            );

            break;
          case "comicStrip":
            FilterUtil.comicStrip(
              ctx as CanvasRenderingContext2D,
              imageCanvas.value
            );

            break;
          case "brown":
            FilterUtil.brown(
              ctx as CanvasRenderingContext2D,
              imageCanvas.value
            );

            break;
          case "darktone":
            FilterUtil.darktone(
              ctx as CanvasRenderingContext2D,
              imageCanvas.value
            );

            break;

          default:
        }
      }
    };
    const imageSize = computed(() => {
      let crop = module.value.crop;
      return MathUtil.getFullSize(
        module.value.width,
        module.value.height,
        crop.width / crop.height
      );
    });
    watch(
      () => module.value.crop,
      (nv, ov) => {
        draw();
      },
      {
        immediate: false,
        deep: true,
      }
    );
    watch(
      () => module.value.src,
      (nv, ov) => {
        image.src = module.value.src;
        const nature = {
          naturalWidth: 0,
          naturalHeight: 0,
        };
        image.onload = () => {
          nature.naturalWidth = image.naturalWidth;
          nature.naturalHeight = image.naturalHeight;
        };
      },
      {
        immediate: false,
        deep: true,
      }
    );
    watch(
      () => module.value.mask,
      (nv, ov) => {
        draw();
      },
      {
        immediate: false,
        deep: true,
      }
    );
    watch(
      () => module.value.filterInfo,
      (nv, ov) => {
        draw();
      },
      {
        immediate: false,
        deep: true,
      }
    );

    const { moduleMove } = operation();
    const selectModel = () => {
      store.commit("setEditModule", module.value.id);
    };

    return {
      module,
      moduleMove,
      editModule,
      selectModel,
      imageScale,
      imageCanvas,
      imageSize,
      showImage,
    };
  },
});
</script>

<style lang="scss" scoped>
.img-content {
  position: absolute;
  display: inline-block;
  cursor: move;
  user-select: none;
}
.image-border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: content-box;
}
.image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>
