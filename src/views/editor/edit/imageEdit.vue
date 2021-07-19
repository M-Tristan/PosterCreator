<template>
  <div class="image-area">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="图片" name="1">
        <div class="oper-item">
          <div class="oper-name">模糊</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.blur"
              :min="0"
              :max="50"
            ></input-number>
            <!-- <el-input-number size="mini" :min="0" :max="50" v-model="editModule.blur"></el-input-number> -->
          </div>
        </div>
        <div class="oper-item">
          <div class="oper-name">透明度</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.opacity"
              :min="0"
              :max="1"
              :step="0.01"
            ></input-number>
            <!-- <el-input-number size="mini" :min="0" :max="1" :step="0.01"  v-model="editModule.opacity"></el-input-number> -->
          </div>
        </div>
        <div class="oper-item">
          <div class="oper-name">圆角</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.borderRadius"
              :min="0"
              :max="borderRadiusMax"
            ></input-number>
          </div>
        </div>
        <!-- <div class='oper-item'>
      <div class='oper-name'>
        翻转  
      </div>
      <div class='oper-input'>
        <div :class='["flip",{active:editModule.rotateX}]' @click="editModule.rotateX = !editModule.rotateX">
          <i class='el-icon-sort'></i>
        </div>
        <div :class='["flip",{active:editModule.rotateY}]' @click="editModule.rotateY = !editModule.rotateY">
            <i class='el-icon-sort transverse'></i>
        </div>
        
      
      </div>
    </div> -->
      </el-collapse-item>
      <el-collapse-item title="投影" name="2">
        <div class="oper-item">
          <div class="oper-name">投影颜色</div>

          <div class="oper-input">
            <el-color-picker
              @change="pushBack"
              v-model="editModule.dropshadowColor"
              size="mini"
              show-alpha
            ></el-color-picker>
          </div>
        </div>
        <div class="oper-item">
          <div class="oper-name">横向距离</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.dropshadowX"
            ></input-number>
          </div>
        </div>
        <div class="oper-item">
          <div class="oper-name">纵向距离</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.dropshadowY"
            ></input-number>
          </div>
        </div>
        <div class="oper-item">
          <div class="oper-name">模糊</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.dropshadowBlur"
            ></input-number>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="调整" name="3">
        <div class="oper-item">
          <div class="oper-name">亮度</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.filter.brightness"
              :min="0"
              :max="200"
            ></input-number>
          </div>
        </div>
        <div class="oper-item">
          <div class="oper-name">对比度</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.filter.contrast"
              :min="0"
              :max="200"
            ></input-number>
          </div>
        </div>
        <div class="oper-item">
          <div class="oper-name">灰度</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.filter.grayscale"
              :min="0"
              :max="100"
            ></input-number>
          </div>
        </div>
        <div class="oper-item">
          <div class="oper-name">色相</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.filter.hueRotate"
              :min="0"
              :max="360"
            ></input-number>
          </div>
        </div>
        <div class="oper-item">
          <div class="oper-name">反转</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.filter.invert"
              :min="0"
              :max="100"
            ></input-number>
          </div>
        </div>
        <div class="oper-item">
          <div class="oper-name">饱和度</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.filter.saturate"
              :min="0"
              :max="200"
            ></input-number>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="蒙版" name="4">
        <maskDemo
          v-for="(item, index) in maskList"
          :key="index"
          :src="item"
        ></maskDemo>
      </el-collapse-item>
      <!-- <el-collapse-item title="边框" name="3">
   <div class='oper-item'>
      <div class='oper-name'>
         颜色
      </div>
      <div class='oper-input'>
         <el-color-picker v-model="editModule.borderColor" size="mini" show-alpha></el-color-picker>
      </div>
    </div>
   <div class='oper-item'>
      <div class='oper-name'>
        大小  
      </div>
      <div class='oper-input'>
        <el-input-number size="mini" v-model="editModule.borderWidth"></el-input-number>
      </div>
    </div>
  </el-collapse-item> -->
      <el-collapse-item title="位置" name="5">
        <div class="oper-item">
          <div class="oper-name">旋转角度</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.rotate"
              :min="0"
              :max="360"
            ></input-number>
          </div>
        </div>
        <div class="oper-item">
          <div class="oper-name">左边距</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.left"
            ></input-number>
          </div>
        </div>
        <div class="oper-item">
          <div class="oper-name">上边距</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.top"
            ></input-number>
          </div>
        </div>
        <div class="oper-item">
          <div class="oper-name">宽</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.width"
            ></input-number>
          </div>
        </div>
        <div class="oper-item">
          <div class="oper-name">高</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.height"
            ></input-number>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="操作" name="6">
        <el-button type="info" plain size="mini" @click="clipImage"
          >裁剪</el-button
        >
      </el-collapse-item>
    </el-collapse>
  </div>
  <lock-mask v-if="editModule.lock"></lock-mask>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, defineComponent, onMounted, ref } from "vue";
import maskImageList from "@/lib/MaskList";
import maskDemo from "./maskDemo.vue";
import operation from "../operation/common/operation";
import LockMask from "./lockMask.vue";
import { getImageList } from "@/api/api";
export default defineComponent({
  components: {
    maskDemo,
    LockMask,
  },
  setup() {
    const store = useStore();
    const { pushBack } = operation();
    let activeNames = ref(["1"]);
    let value = ref(1);
    let color = ref("rgab(100,100,100,1)");
    const editModule: any = computed(() => {
      return store.state.editModule;
    });
    const maskList = ref([]);
    onMounted(async () => {
      let res = await getImageList({ type: "mask" });
      maskList.value = res.map((item) => item.image_url);
    });
    const borderRadiusMax = computed(() => {
      if (editModule.value.width > editModule.value.height) {
        return editModule.value.height / 2;
      } else {
        return editModule.value.width / 2;
      }
    });
    const clipImage = () => {
      let clipOper = store.state.clipOper;
      store.commit("setClipOper", !clipOper);
    };
    return {
      activeNames,
      value,
      color,
      editModule,
      borderRadiusMax,
      clipImage,
      maskList,
      pushBack,
    };
  },
});
</script>

<style lang="scss" scoped>
.oper-item {
  height: 40px;
}
.oper-name {
  width: 30%;
  float: left;
}
.oper-input {
  width: 70%;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
}
.transverse {
  transform: rotate(90deg);
}
.flip {
  border-radius: 5px;
  width: 25px;
  height: 25px;
  background-color: rgb(187, 187, 187);
  color: white;
  font-size: 20px;
  float: left;
  margin-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.active {
  color: rgb(5, 142, 255);
  background-color: rgb(0, 36, 112);
}
.image-area {
  padding-left: 10px;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
}
</style>