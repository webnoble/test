<template>
  <div class="toolbar">
    <span class="topo-name">{{ name }}</span>
    <div id="topoToolbarContainer" class="topoToolbarContainer"></div>
    <i
      class="command iconfont iconicon_cursor"
      title="指针工具"
      :class="pointerState === 'pointer' ? 'actived' : 'disable'"
      @click="handlePointer"
    ></i>
    <i
      class="command iconfont iconarrow_expand_alt"
      title="连接线"
      style="transform: rotate(90deg);"
      :class="pointerState === 'linker' ? 'actived' : 'disable'"
      @click="handleLink"
    ></i>
    <i
      class="command iconfont icon-undo"
      title="撤销"
      :class="undoStackEnable?'':'disable'"
      @click="handleUndo"
    ></i>
    <i
      class="command iconfont icon-redo"
      title="重做"
      :class="redoStackEnable?'':'disable'"
      @click="handleRedo"
    ></i>
    <span class="separator"></span>
    <!-- <i data-command="copy" class="command iconfont icon-copy-o disable" title="复制"></i>
    <i data-command="paste" class="command iconfont icon-paster-o disable" title="粘贴"></i>-->
    <i
      data-command="delete"
      class="command iconfont icon-delete-o"
      title="删除"
      :class="selectedItem?'':'disable'"
      @click="handleDelete"
    ></i>
    <span class="separator"></span>
    <i
      data-command="zoomIn"
      class="command iconfont icon-zoom-in-o"
      title="放大"
      @click="handleZoomIn"
    ></i>
    <i
      data-command="zoomOut"
      class="command iconfont icon-zoom-out-o"
      title="缩小"
      @click="handleZoomOut"
    ></i>
    <i
      data-command="autoZoom"
      class="command iconfont icon-fit"
      title="适应画布"
      @click="handleAutoZoom"
    ></i>
    <i
      data-command="resetZoom"
      class="command iconfont icon-actual-size-o"
      title="实际尺寸"
      @click="handleResetZoom"
    ></i>
    <span class="separator"></span>
    <i
      data-command="toBack"
      class="command iconfont icon-to-back"
      :class="selectedItem?'':'disable'"
      title="层级后置"
      @click="handleToBack"
    ></i>
    <i
      data-command="toFront"
      class="command iconfont icon-to-front"
      :class="selectedItem?'':'disable'"
      title="层级前置"
      @click="handleToFront"
    ></i>
    <span class="separator"></span>
    <span class="separator"></span>
    <i
      data-command="multiSelect"
      class="command iconfont icon-select"
      :class="multiSelect?'disable':''"
      title="多选"
      @click="handleMuiltSelect"
    ></i>
    <i
      data-command="addGroup"
      class="command iconfont icon-group"
      title="成组"
      :class="addGroup?'':'disable'"
      @click="handleAddGroup"
    ></i>
    <i
      data-command="unGroup"
      class="command iconfont icon-ungroup"
      title="解组"
      :class="unGroup?'':'disable'"
      @click="handleUnGroup"
    ></i>
    <el-button type="primary" @click="consoleData">保存</el-button>
  </div>
</template>

<script>
import eventBus from '&/utils/eventBus';
import Util from '@antv/g6/es/util';
import G6 from '@antv/g6';
import { uniqueId, getBox } from '&/utils';

export default {
  name: 'Toolbar',
  props: {
    name: {
      type: String,
      default: () => {
        return '新建拓扑图'
      }
    }
  },
  data () {
    return {
      pointerState: 'pointer',
      page: {},
      graph: {},
      redoList: [],
      undoList: [],
      editor: null,
      command: null,
      selectedItem: null,
      multiSelect: false,
      addGroup: false,
      unGroup: false,
      toolbar: null
    };
  },
  computed: {
    redoStackEnable: function () {
      return this.graph.redoStack ? Boolean(this.graph.redoStack.length) : false;
    },
    undoStackEnable: function () {
      return this.graph.undoStack ? Boolean(this.graph.undoStack.length) : false;
    }
  },
  watch: {
    selectedItem (val) {
      if (val && val.length > 1 && val[0]._cfg.type === 'node') {
        this.addGroup = true;
      } else {
        this.addGroup = false;
      }
      if (val && val.length && val[0]._cfg.type === 'combo') {
        this.unGroup = true;
      } else {
        this.unGroup = false;
      }
    }
  },
  created () {
    this.init();
    this.bindEvent();
  },
  beforeDestroy () {
    this.unbindEvent();
  },
  methods: {
    createToolbar () {
      return new Promise((resolve, reject) => {
        this.toolbar = new G6.ToolBar();
        resolve(this.toolbar);
      });
    },
    init () {
      const { editor, command } = this.$parent;
      this.editor = editor;
      this.command = command;
    },
    onAfterAddPage (page) {
      this.page = page;
      this.graph = page.graph;
      this.createToolbar().then((toolbar) => {
        this.graph.addPlugin(toolbar);
      });
    },
    onBeforeDestory () {
      this.graph.removePlugin(this.toolbar)
      this.toolbar = null;
    },
    onAdd (data) {
      this.redoList = data.redoList;
      this.undoList = data.undoList;
    },
    onUpdate (data) {
      this.redoList = data.redoList;
      this.undoList = data.undoList;
    },
    onDelete (data) {
      this.redoList = data.redoList;
      this.undoList = data.undoList;
    },
    onUpdateItem (item) {
      this.command.executeCommand('update', [item]);
    },
    onAddItem (item) {
      this.command.executeCommand('add', [item]);
    },
    onNodeselectchange () {
      this.selectedItem = this.graph.findAllByState('node', 'selected');
      this.selectedItem = this.selectedItem.concat(
        ...this.graph.findAllByState('edge', 'selected')
      );
    },
    onComboselectchange () {
      const selectedCombo = this.graph.findAllByState('combo', 'selected');
      this.selectedItem = selectedCombo;
    },
    onDeleteItem () {
      this.handleDelete();
    },
    onMuliteSelectEnd () {
      this.multiSelect = false;
      const nodes = this.graph.findAllByState('node', 'selected');
      const temp = [];
      // 不允许选中分组里的节点，以避免选中分组中节点后再拖动到其它分组，导致分组逻辑bug
      nodes.forEach((node) => {
        const model = node.getModel();
        if (!model.comboId) {
          temp.push(node);
        } else {
          this.graph.setItemState(node, 'selected', false);
        }
      })
      if (temp.length) {
        this.selectedItem = temp;
      }
    },
    bindEvent () {
      const self = this;
      eventBus.$on('afterAddPage', self.onAfterAddPage);
      eventBus.$on('add', self.onAdd);
      eventBus.$on('update', self.onUpdate);
      eventBus.$on('delete', self.onDelete);
      eventBus.$on('updateItem', self.onUpdateItem);
      eventBus.$on('addItem', self.onAddItem);
      eventBus.$on('nodeselectchange', self.onNodeselectchange);
      eventBus.$on('comboselectchange', self.onComboselectchange);
      eventBus.$on('deleteItem', self.onDeleteItem);
      eventBus.$on('muliteSelectEnd', self.onMuliteSelectEnd);
      eventBus.$on('beforeDestory', this.onBeforeDestory);
    },
    unbindEvent () {
      eventBus.$off('afterAddPage', this.onAfterAddPage);
      eventBus.$off('add', this.onAdd);
      eventBus.$off('update', this.onUpdate);
      eventBus.$off('delete', this.onDelete);
      eventBus.$off('updateItem', this.onUpdateItem);
      eventBus.$off('addItem', this.onAddItem);
      eventBus.$off('nodeselectchange', this.onNodeselectchange);
      eventBus.$off('comboselectchange', this.onComboselectchange);
      eventBus.$off('deleteItem', this.onDeleteItem);
      eventBus.$off('muliteSelectEnd', this.onMuliteSelectEnd);
      eventBus.$off('beforeDestory', this.onBeforeDestory);
    },
    handlePointer () {
      this.pointerState = 'pointer';
      this.graph.setMode('default')
    },
    handleLink () {
      this.pointerState = 'linker';
      this.graph.setMode('addEdge')
    },
    handleUndo () {
      if (this.undoStackEnable) {
        this.toolbar.undo();
      }
    },
    handleRedo () {
      if (this.redoStackEnable) {
        this.toolbar.redo();
      }
    },
    handleDelete () {
      if (this.selectedItem && this.selectedItem.length > 0) {
        this.command.executeCommand('delete', this.selectedItem);
        this.selectedItem = null;
      }
    },
    getFormatPadding () {
      return Util.formatPadding(this.graph.get('fitViewPadding'));
    },
    getViewCenter () {
      const padding = this.getFormatPadding();
      const graph = this.graph;
      const width = this.graph.get('width');
      const height = graph.get('height');
      return {
        x: (width - padding[2] - padding[3]) / 2 + padding[3],
        y: (height - padding[0] - padding[2]) / 2 + padding[0]
      };
    },
    handleZoomIn () {
      const currentZoom = this.graph.getZoom();
      this.graph.zoomTo(currentZoom + 0.5, this.getViewCenter());
      eventBus.$emit('redrawCanvas');
    },
    handleZoomOut () {
      const currentZoom = this.graph.getZoom();
      this.graph.zoomTo(currentZoom - 0.5, this.getViewCenter());
      eventBus.$emit('redrawCanvas');
    },
    handleToBack () {
      if (this.selectedItem && this.selectedItem.length > 0) {
        this.selectedItem.forEach(item => {
          item.toBack();
          this.graph.paint();
        });
      }
    },
    handleToFront () {
      if (this.selectedItem && this.selectedItem.length > 0) {
        this.selectedItem.forEach(item => {
          if (item.getType() === 'edge') {
            // const nodeGroup = this.graph.get('nodeGroup');
            // const edgeGroup = item.get('group');
            // nodeGroup.toFront();
            // edgeGroup.toFront()
          } else {
            item.toFront();
          }
          this.graph.paint();
        });
      }
    },
    handleAutoZoom () {
      this.graph.fitView(20);
      eventBus.$emit('redrawCanvas');
    },
    handleResetZoom () {
      this.graph.zoomTo(1, this.getViewCenter());
      eventBus.$emit('redrawCanvas');
    },
    handleMuiltSelect () {
      this.multiSelect = true;
      this.graph.setMode('mulitSelect');
      console.log('setMode:mulitSelect');
    },
    handleAddGroup () {
      if (!this.addGroup) {
        return false;
      }
      // 将选中的节点组成分组
      // 1、创建combo model
      const model = {
        label: '新建分组',
        type: 'customCombo',
        itemType: 'combo',
        nodes: []
      };
      // 2、获得被选中的节点id
      this.selectedItem.forEach((node, index, arr) => {
        model.nodes.push(node._cfg.id);
      });
      // 3、添加分组到画布
      this.command.executeCommand('add', [model]);
      // 节点成组后取消所有节点的选中状态
      this.$nextTick((e) => {
        if (this.selectedItem && this.selectedItem.length) {
          this.selectedItem.forEach((combo) => {
            this.graph.setItemState(combo, 'selected', false);
          })
        }
        // 添加分组后将分组的数组置空
        this.selectedItem = null;
      });
    },
    // 解散组合
    handleUnGroup () {
      if (!this.unGroup) {
        return false;
      }
      this.command.executeCommand('unGroup', this.selectedItem);
      // 解散组合后将可以解组的分组置空
      this.selectedItem = null;
      this.graph.paint();
    },
    getPosition (items) {
      const boxList = [];
      items.forEach(item => {
        const box = item.getBBox();
        boxList.push(getBox(box.x, box.y, box.width, box.height));
      });
      let minX1, minY1, MaxX2, MaxY2;
      boxList.forEach(box => {
        if (typeof minX1 === 'undefined') {
          minX1 = box.x1;
        }
        if (typeof minY1 === 'undefined') {
          minY1 = box.y1;
        }
        if (typeof MaxX2 === 'undefined') {
          MaxX2 = box.x2;
        }
        if (typeof MaxY2 === 'undefined') {
          MaxY2 = box.y2;
        }
        if (minX1 > box.x1) {
          minX1 = box.x1;
        }
        if (minY1 > box.y1) {
          minY1 = box.y1;
        }
        if (MaxX2 < box.x2) {
          MaxX2 = box.x2;
        }
        if (MaxY2 < box.y2) {
          MaxY2 = box.y2;
        }
      });
      const width = MaxX2 - minX1;
      const height = MaxY2 - minY1;
      const x = minX1 + width / 2;
      const y = minY1 + height / 2;
      const id = 'team' + uniqueId();
      const model = {
        id: id,
        width,
        height,
        x,
        y,
        shape: 'teamNode'
      };
      this.command.executeCommand('add', model);
    },

    consoleData () {
      const data = this.graph.save()
      console.log(data);
      this.$emit('save', data);
    }
  }
};
</script>

<style lang="scss">
.toolbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;
  width: 100%;
  border: 1px solid #e9e9e9;
  height: 42px;
  z-index: 3;
  box-shadow: 0px -1px 4px #909090;
  position: absolute;
  text-align: right;
  .topo-name {
    position: absolute;
    left: 20px;
    font-size: 16px;
    color: #333333;
    font-weight: 800;
  }
  .command {
    box-sizing: border-box;
    width: 27px;
    height: 27px;
    margin: 0px 6px;
    border-radius: 2px;
    display: inline-block;
    border: 1px solid rgba(2, 2, 2, 0);
    color: #333333;
    text-align: center;
    &.actived {
      background-color: #e3e3e3;
    }
    &:nth-of-type(1) {
      margin-left: 24px;
    }
    &::before {
      line-height: 27px;
    }
    &:hover {
      cursor: pointer;
      border: 1px solid #e9e9e9;
    }
  }
  .disable {
    color: rgba(0, 0, 0, 0.25);
  }
  .separator {
    margin: 4px;
    border-left: 1px solid #e9e9e9;
  }
}
</style>
