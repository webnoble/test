<template>
  <div ref="itempannel" class="itempannel">
    <div class="content" :class="toggle ? '': 'noWidth'">
      <div class="pannel-top">
        <div class="select">
          <span class="icon iconfont iconicon_click" />
          <span>图元选择</span>
        </div>
        <div class="close">
          <span class="icon iconfont iconicon_close" @click="toggleFold()" />
        </div>
      </div>
      <div class="pannel-body">
        <item
          v-for="(item, index) in deviceList"
          :key="index"
          :name="item.topoTypeName"
          :item-list="item.items"
        />
      </div>
    </div>
    <div class="item-pannel-container">
      <div class="toggle-btn" @click="toggleFold()">
        <div :class="toggle ? 'pack-up': 'un-fold'" />
      </div>
    </div>
  </div>
</template>

<script>
import Item from './item';
import eventBus from '&/utils/eventBus';
import { getImageTypeList } from '@/api/topo'

export default {
  name: 'ItemPanel',
  components: { Item },
  props: {
    editNodeItem: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data () {
    return {
      toggle: true, // 开关状态，true表示侧边栏打开，false表示侧边栏关闭
      page: null,
      command: null,
      exampleItem: {
        name: '测试节点',
        label: '测试节点',
        size: '170*34',
        type: 'node',
        x: 0,
        y: 0,
        shape: 'customNode',
        color: '#1890ff',
        image:
          'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
        stateImage: null, // 图片
        inPoints: [[0, 0.5]],
        outPoints: [[1, 0.5]]
      },
      deviceList: []
    };
  },
  watch: {
    editNodeItem (newVal, oldVal) {
      this.deviceList = newVal;
    }
  },
  created () {
    getImageTypeList().then((data) => {
      console.log(data);
    });
    this.bindEvent();
  },
  beforeDestroy () {
    this.unbindEvent();
  },
  methods: {
    toggleFold (event) {
      this.toggle = !this.toggle;
      this.$nextTick(() => {
        this.$emit('toggleItempanel', this.page.graph.save());
      });
    },
    onAfterAddPage (page) {
      this.page = page;
    },
    bindEvent () {
      eventBus.$on('afterAddPage', this.onAfterAddPage);
    },
    unbindEvent () {
      eventBus.$off('afterAddPage', this.onAfterAddPage);
    },
    setClass (item) {
      const obj = {};
      obj[item] = true;
      return obj;
    }
  }
};
</script>

<style scoped lang="scss">
@mixin scrollBar {
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #535353;
  }
  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px linear-gradient(-90deg, #2f3548, #252a39);
    border-radius: 10px;
    background: #ededed;
  }
}
.noWidth {
  width: 0px !important;
}
.itempannel {
  $toggleWidth: 12px;
  z-index: 2;
  min-width: $toggleWidth;
  height: 100%;
  background: rgba(246, 245, 254, 1);
  box-sizing: border-box;
  .content {
    position: relative;
    width: 300px;
    height: 100%;
    margin-left: $toggleWidth;
    // transition: width 0.1s ease-in;
    overflow: hidden;
    .pannel-top {
      display: flex;
      justify-content: space-between;
      padding-top: 12px;
      padding-bottom: 12px;
      .select {
        flex: 0 0 50%;
        font-size: 0px;
        text-align: left;
        span:nth-child(1) {
          display: inline-block;
          margin-left: 10px;
          width: 18px;
          height: 18px;
          color: #7667df;
        }
        span:nth-child(2) {
          font-size: 16px;
          font-weight: bold;
          color: rgba(48, 47, 71, 1);
          line-height: 18px;
          margin-left: 12px;
        }
      }
      .close {
        flex: 0 0 50%;
        text-align: right;
        span {
          margin-right: 18px;
          color: black;
          font-size: 20px;
          font-weight: bold;
          opacity: 0.6;
        }
      }
    }
    .pannel-body {
      position: absolute;
      height: calc(100% - 47px);
      min-width: 300px;
      padding: 10px 10px 10px 10px;
      overflow-y: scroll;
      @include scrollBar;
    }
  }
  .item-pannel-container {
    position: absolute;
    width: $toggleWidth;
    height: 100%;
    background-color: #ededed;
    top: 0;
    bottom: 0;
    left: 0;
    .toggle-btn {
      position: absolute;
      width: $toggleWidth;
      height: 105px;
      margin-top: auto;
      margin-bottom: auto;
      top: 0;
      bottom: 0;
      left: 0;
      background-color: #5466e0;
      div {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        border-style: solid;
        border-width: 5px 5px 5px 5px;
        width: 0px;
        height: 0px;
      }
      .pack-up {
        left: -2px;
        border-color: transparent #fff transparent transparent;
      }
      .un-fold {
        right: -2px;
        border-color: transparent transparent transparent #fff;
      }
    }
  }
}
</style>
