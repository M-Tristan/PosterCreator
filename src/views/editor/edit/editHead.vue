<template>
  <div class="edit-head">
    <div class="logo">LOGO</div>
    <div class="history-area">
      <div class="reverse">
        <i
          :class="[
            'icon',
            'iconfont',
            'icon-chexiaoyou',
            'icon-history',
            { disabled: backList.length <= 1 },
          ]"
          @click="back"
        ></i>
      </div>
      <i
        :class="[
          'icon',
          'iconfont',
          'icon-chexiaoyou',
          'icon-history',
          { disabled: nextList.length < 1 },
        ]"
        @click="next"
      ></i>
    </div>
    <div class="operation">
      <el-popover
        placement="bottom"
        :width="200"
        trigger="click"
        v-if="canDelete"
      >
        <template #reference>
          <div class="positionAjust">位置调整</div>
        </template>
        <div @click="positionAjust('left')" class="position-item">左对齐</div>
        <div @click="positionAjust('right')" class="position-item">右对齐</div>
        <div @click="positionAjust('horizontally')" class="position-item">
          水平居中
        </div>
        <div @click="positionAjust('verticalcenter')" class="position-item">
          垂直居中
        </div>
        <div @click="positionAjust('top')" class="position-item">顶部对齐</div>
        <div @click="positionAjust('bottom')" class="position-item">
          底部对齐
        </div>
        <div v-if="distribution">
          <div
            @click="positionAjust('verticaldistribution')"
            class="position-item"
          >
            垂直分布
          </div>
          <div
            @click="positionAjust('horizontaldistribution')"
            class="position-item"
          >
            水平分布
          </div>
        </div>
      </el-popover>
      <div class="space" v-if="canDelete">|</div>
      <el-popover
        placement="bottom"
        :width="100"
        trigger="click"
        v-if="canDelete"
      >
        <template #reference>
          <div class="layerAjust">
            <i class="icon iconfont icon-tuceng1"></i>
          </div>
        </template>
        <div @click="layerAdjustment('up')" class="layer-item">上移</div>
        <div @click="layerAdjustment('down')" class="layer-item">下移</div>
        <div @click="layerAdjustment('top')" class="layer-item">置顶</div>
        <div @click="layerAdjustment('bottom')" class="layer-item">置底</div>
      </el-popover>

      <div class="lockAjust" v-if="canLock" @click="lock">
        <i class="icon el-icon-unlock"></i>
      </div>
      <div class="lockAjust" v-if="editModule.lock" @click="unlock">
        <i class="icon el-icon-lock"></i>
      </div>
      <div class="deleteAjust" v-if="canDelete" @click="deletelayer">
        <i class="icon el-icon-delete"></i>
      </div>
      <div class="deleteAjust" v-if="canCopy" @click="copy">
        <i class="icon el-icon-document-copy"></i>
      </div>
    </div>

    <div class="download">
      <i class="icon iconfont icon-xiazai" @click="download"></i>
    </div>
  </div>
  <el-dialog title="生成中..." v-model="downloadDialog" width="70%" center>
    <el-progress :percentage="percentage"></el-progress>
  </el-dialog>
</template>

<script lang="ts">
import { useStore } from "vuex";
import {
  ComponentInternalInstance,
  computed,
  defineComponent,
  getCurrentInstance,
  ref,
} from "vue";
import operation from "../operation/common/operation";
import DesignToCanvas from "@/lib/designToCanvas";
export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const store = useStore();
    const { pushBack } = operation();
    const backList = computed(() => {
      return store.state.backList;
    });
    const nextList = computed(() => {
      return store.state.nextList;
    });
    const back = () => {
      if (backList.value.length <= 1) {
        return;
      }
      store.commit("back");
      store.commit("setEditModuleToBack");
    };
    const next = () => {
      if (nextList.value.length < 1) {
        return;
      }
      store.commit("next");
      store.commit("setEditModuleToBack");
    };
    const positionAjust = (type) => {
      let group = store.state.group;
      if (group && !group.id) {
        if (group.rotate !== 0) {
          store.commit("initAlignGroupSize");
          proxy?.$emitter.emit("resetOperItems");
        }
      }

      store.commit("positionAdjustment", type);
      if (group && !group.id) {
        store.commit("initAlignGroupSize");
        proxy?.$emitter.emit("resetOperItems");
      }
      // store.commit("pushBack");
    };
    const layerAdjustment = (type) => {
      store.commit("layerAdjustment", type);
      store.commit("pushBack");
    };
    const editModule: any = computed(() => {
      return store.state.editModule;
    });
    const lock = () => {
      store.commit("lock");
      store.commit("pushBack");
    };
    const unlock = () => {
      store.commit("unlock");
      store.commit("pushBack");
    };
    const deletelayer = () => {
      store.commit("delete");
      store.commit("pushBack");
    };
    const copy = () => {
      store.commit("copy");
      store.commit("paste");
      store.commit("pushBack");
    };
    const download = () => {
      percentage.value = 0;
      downloadDialog.value = true;
      let t = setInterval(() => {
        percentage.value += 1;
        if (percentage.value == 99) {
          clearInterval(t);
        }
      }, 50);
      setTimeout(async () => {
        await DesignToCanvas.downLoadALL();
        clearInterval(t);
        percentage.value = 100;
        setTimeout(() => {
          downloadDialog.value = false;
        }, 1000);
      });
    };
    const canCopy = computed(() => {
      return store.getters.canCopy;
    });
    const canDelete = computed(() => {
      return store.getters.canDelete;
    });
    const canLock = computed(() => {
      return store.getters.canLock;
    });
    const distribution = computed(() => {
      return store.getters.distribution;
    });
    const downloadDialog = ref(false);
    const percentage = ref(0);
    return {
      backList,
      nextList,
      back,
      next,
      pushBack,
      positionAjust,
      layerAdjustment,
      editModule,
      lock,
      unlock,
      deletelayer,
      download,
      canCopy,
      copy,
      canDelete,
      canLock,
      distribution,
      downloadDialog,
      percentage,
    };
  },
});
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.edit-head {
  user-select: none;
  width: 100%;
  height: 50px;
  background-color: rgb(0, 225, 255);
  background-image: linear-gradient(90deg, rgb(0, 234, 255), rgb(89, 0, 255));
}
.logo {
  width: 200px;
  height: 50px;
  line-height: 50px;
  display: inline-block;
  float: left;
  font-size: 40px;
  color: rgb(255, 255, 255);
  font-weight: 900;
  background-image: -webkit-linear-gradient(
    bottom,
    rgb(224, 224, 224),
    #ffffff,
    rgb(224, 224, 224)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.history-area {
  display: inline-block;
  float: left;
  height: 50px;
  width: 100px;
  line-height: 50px;
  color: white;
  user-select: none;
}

.icon-history {
  font-size: 25px;
  cursor: pointer;
}

.reverse {
  transform: rotateY(180deg);
  display: inline-block;
  margin-right: 20px;
}
.disabled {
  color: #8f8f8f;
}
.operation {
  float: left;
  height: 50px;
  width: 300px;
  user-select: none;
}
.positionAjust {
  float: left;
  line-height: 40px;
  width: 80px;
  color: white;
  font-size: 16px;
  font-family: SourceHanSansCN-Regular;
  cursor: pointer;
  padding: 5px;
  font-weight: 900;
  user-select: none;
  &:hover {
    background-color: #8f8f8f5d;
  }
}
.layerAjust {
  float: left;
  line-height: 40px;
  height: 50px;
  width: 40px;
  color: white;
  cursor: pointer;
  padding: 5px;
  user-select: none;
  // font-weight: 900;
  &:hover {
    background-color: #8f8f8f5d;
  }
  .icon {
    font-size: 25px;
  }
}
.lockAjust {
  float: left;
  line-height: 45px;
  height: 50px;
  width: 40px;
  color: white;
  cursor: pointer;
  padding: 5px;
  user-select: none;
  // font-weight: 900;
  &:hover {
    background-color: #8f8f8f5d;
  }
  .icon {
    font-size: 20px;
  }
}
.deleteAjust {
  float: left;
  line-height: 45px;
  height: 50px;
  width: 40px;
  color: white;
  cursor: pointer;
  padding: 5px;
  user-select: none;
  // font-weight: 900;
  &:hover {
    background-color: #8f8f8f5d;
  }
  .icon {
    font-size: 20px;
  }
}
.position-item {
  width: 100px;
  float: left;
  color: black;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  font-weight: 900;
  user-select: none;
  &:hover {
    background-color: #8f8f8f32;
  }
}
.layer-item {
  width: 70px;
  float: left;
  color: black;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  font-weight: 900;
  user-select: none;
  &:hover {
    background-color: #8f8f8f32;
  }
}
.space {
  color: white;
  font-weight: 900;
  width: 10px;
  line-height: 50px;
  float: left;
  user-select: none;
}
.download {
  width: 50px;
  float: right;
  line-height: 50px;
  cursor: pointer;
  color: white;
  user-select: none;
  .icon {
    font-size: 30px;
  }
  &:hover {
    color: aqua;
  }
}
</style>
