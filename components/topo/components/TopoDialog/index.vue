<template>
  <div ref="topoDialog" class="hover-dialog">
    <div class="title">{{ title }}</div>
    <div class="solt">
      <slot></slot>
    </div>
    <div class="footer">
      <el-button v-if="visableDealBtn" type="info" @click="handle">{{ handleText }}</el-button>
      <el-button type="warning" @click="close">关闭</el-button>
    </div>
  </div>
</template>
<script>
import eventBus from '&/utils/eventBus';

export default {
  name: 'TopoDialog',
  props: {
    title: {
      type: String,
      default: () => {
        return '设备信息';
      }
    },
    handleText: {
      type: String,
      default: () => {
        return '确定'
      }
    }
  },
  data () {
    return {
      visableDealBtn: true
    }
  },
  created () {
    this.bindEvent();
  },
  methods: {
    hideDealBtn () {
      this.visableDealBtn = false;
    },
    showDealBtn () {
      this.visableDealBtn = true;
    },
    onContextmenuClick (e) {
      const topoDialog = this.$refs['topoDialog'];
      if (!topoDialog) {
        return;
      }
      topoDialog.style.left = e.originalEvent.offsetX + 20 + 'px';
      topoDialog.style.top = e.originalEvent.offsetY - topoDialog.clientHeight / 2 + 'px';
      this.$emit('rightClick', e);
    },
    onMousedown () {
      if (!this.$refs['topoDialog']) {
        return;
      }
      this.close();
    },
    bindEvent () {
      const self = this;
      eventBus.$on('contextmenuClick', self.onContextmenuClick);
      eventBus.$on('mousedown', self.onMousedown);
    },
    unbindEvent () {
      eventBus.$off('contextmenuClick', self.onContextmenuClick);
      eventBus.$off('mousedown', self.onMousedown);
    },
    handle () {
      this.$emit('handle');
    },
    open (e) {
      const topoDialog = this.$refs['topoDialog'];
      if (!topoDialog) {
        return;
      }
      topoDialog.style.display = 'block';
      topoDialog.style.left = e.originalEvent.offsetX + 20 + 'px';
      topoDialog.style.top = e.originalEvent.offsetY - topoDialog.clientHeight / 2 + 'px';
    },
    close () {
      this.$refs['topoDialog'].style.display = 'none';
    }
  }
}
</script>
<style scoped lang="scss">
.hover-dialog {
  $line-height: 43px;
  display: none;
  position: absolute;
  width: 500px;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.32);
  .title {
    text-align: center;
    height: $line-height;
    line-height: $line-height;
    font-size: 20px;
    font-weight: bold;
    color: rgba(142, 132, 219, 1);
    border-bottom: 2px solid rgba(236, 236, 237, 0.62);
  }
  .solt {
    position: relative;
  }
  .footer {
    height: 97px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-width: 8px 4px;
    border-style: solid;
    border-color: transparent white white transparent;
    bottom: 0;
    top: 0;
    left: -7px;
    margin: auto;
  }
}
</style>
