<template>
  <div class="page">
    <div :id="pageId" ref="graphContainer" class="graph-container" style="position: relative;"></div>
    <slot></slot>
  </div>
</template>

<script>
import G6 from '@antv/g6';
import { initBehavors } from '&/behavior';
import eventBus from '&/utils/eventBus';
import global from '&/global.js';

export default {
  name: 'Page',
  props: {
    height: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    data: {
      type: Object,
      default: () => {
        return {
          nodes: [],
          edges: [],
          combos: [],
          groups: []
        };
      }
    },
    mode: {
      type: String,
      default: () => {
        return 'view'
      }
    }
  },
  data () {
    return {
      pageId: 'graph-container',
      graph: null,
      defaultBehavors: [
        'drag-canvas',
        'zoom-canvas',
        // 'hover-node',
        // 'collapse-expand-combo', // 默认的折叠/展开行为无法监听事件，导致无法执行折叠其他分组的逻辑
        'select-node',
        'select-combo',
        'hover-edge',
        'hover-combo',
        'keyboard',
        'add-menu',
        'drag-combo',
        'drag-node',
        'drag-canvas'
      ],
      grid: null
    };
  },
  watch: {
    data (newTopoData, oldTopoData) {
      if (!newTopoData) {
        return;
      }
      this.destoryPage().then(() => {
        this.init();
      });
    }
  },
  created () {
    this.bindEvent();
    // 预览模式下显示tooltip
    if (this.mode === 'view') {
      this.defaultBehavors = this.defaultBehavors.concat([{
        type: 'tooltip', // 提示框
        formatText (model) {
          // 提示框文本内容
          const deviceName = model.imageName || '';
          const description = model.warning ? model.warning.description ? model.warning.description : '无' : '无';
          const text = '设备: ' + deviceName + '<br/> 描述: ' + description;
          return text;
        }
      },
      {
        type: 'edge-tooltip', // 边提示框
        formatText (data) {
          // 边提示框文本内容
          let sourceName = '';
          let targetName = '';
          let source = null;
          let target = null;
          if (typeof data.source === 'object') {
            source = data.source;
            target = data.source;
          } else {
            source = this.graph.findById(data.source);
            target = this.graph.findById(data.target);
          }
          sourceName = source.getModel().imageName || '';
          targetName = target.getModel().imageName || '';
          return '从: ' + sourceName + '<br/> 到: ' + targetName;
        }
      }]);
    } else {
      this.defaultBehavors.push('hover-node');
    }
    initBehavors();
  },
  beforeDestroy () {
    this.unbindEvent();
  },
  methods: {
    init (topo) {
      const height = this.height;
      const width = this.width;

      this.graph = new G6.Graph({
        container: 'graph-container',
        height: height,
        width: width,
        // fitView: true, // 设置是否将图适配到画布中
        fitViewPadding: [20, 20, 20, 20], // 画布上四周的留白宽度
        // fitCenter: true,
        animate: false, // 是否启用图的动画
        // 设置为true，启用 redo & undo 栈功能
        enabledStack: true,
        modes: {
          // 支持的 behavior
          default: this.defaultBehavors,
          mulitSelect: ['mulit-select'],
          addEdge: ['add-edge'],
          moveNode: [
            'drag-item'
          ],
          moveCombo: [
            'drag-combo-custom',
            'drag-combo'
          ]
        },
        // layout: {
        //   type: 'force',
        //   center: [0, 0],
        //   preventOverlap: true,
        //   nodeSize: 30
        // },
        groupByTypes: false,
        defaultCombo: global.defaultCombo,
        comboStateStyles: global.comboStateStyles
      });
      const { editor, command } = this.$parent;
      editor.emit('afterAddPage', { graph: this.graph, command });

      this.readData(topo);
    },
    reDraw (data) {
      this.destoryPage().then(() => {
        this.init(data);
      });
    },
    readData (topo) {
      if (topo) {
        this.graph.read(topo);
      } else if (this.data) {
        const temp = this.data;
        this.graph.read(temp);
      }
    },
    destoryPage () {
      const self = this;
      return new Promise((resolve, reject) => {
        if (self.graph) {
          eventBus.$emit('beforeDestory');
          self.$nextTick(() => {
            self.graph.destroy();
            self.graph = null;
            self.$refs['graphContainer'].innerHTML = '';
            resolve();
          });
        } else {
          resolve();
        }
      });
    },
    onRedrawCanvas () {
      this.updateGrid();
    },
    onAfterAddPage () {
      this.grid = new G6.Grid();
      this.graph.addPlugin(this.grid);
      this.bindGraphEvent();
    },
    onBeforeDestory () {
      if (this.grid) {
        this.graph.removePlugin(this.grid);
        this.unbindGraphEvent();
        this.grid = null;
      }
    },
    onAfterlayout (e) {
      const graph = this.graph;
      // this.graph.fitView();
      const width = graph.get('width');
      const height = graph.get('height');
      const group = graph.get('group');
      group.resetMatrix();
      const bbox = group.getCanvasBBox();

      if (bbox.width === 0 || bbox.height === 0) return;
      const viewCenter = {
        x: width / 2,
        y: height / 2
      };

      const groupCenter = {
        x: bbox.x + bbox.width / 2,
        y: bbox.y + bbox.height / 2
      };
      graph.translate(viewCenter.x - groupCenter.x, viewCenter.y - groupCenter.y);
    },
    onItemCollapsed (e) {
      alert(e.name);
    },
    bindGraphEvent () {
      this.graph.on('redrawCanvas', this.onRedrawCanvas);
      this.graph.on('afterlayout', this.onAfterlayout);
      this.graph.on('itemcollapsed', this.onItemCollapsed);
    },
    unbindGraphEvent () {
      this.graph.off('redrawCanvas', this.onRedrawCanvas);
      this.graph.off('afterlayout', this.onAfterlayout);
      this.graph.off('itemcollapsed', this.onItemCollapsed);
    },
    bindEvent () {
      eventBus.$on('afterAddPage', this.onAfterAddPage);
      eventBus.$on('beforeDestory', this.onBeforeDestory);
    },
    unbindEvent () {
      eventBus.$off('afterAddPage', this.onAfterAddPage);
      eventBus.$off('beforeDestory', this.onBeforeDestory);
    },
    updateGrid () {
      this.onBeforeDestory();
      this.grid = new G6.Grid();
      this.graph.addPlugin(this.grid);
    }
  }
};
</script>

<style scoped>
.page {
  position: relative;
}
</style>
