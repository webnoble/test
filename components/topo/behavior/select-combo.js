
import each from '@antv/util/esm/each';
import eventBus from '&/utils/eventBus';
export default {
  // 默认配置
  getDefaultCfg () {
    return {
      keyCode: 16,
      multiple: false
    };
  },
  getEvents () {
    return {
      'combo:click': 'onClick',
      'canvas:click': 'onCanvasClick',
      'canvas:mouseover': 'onCanvasMouseover',
      keyup: 'onKeyUp',
      keydown: 'onKeyDown'
    };
  },
  // 点击combo
  onClick (e) {
    console.log('select-combo->onClick');
    const self = this;
    const item = e.item;
    const graph = self.graph;
    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);

    // 取消所有edge selected状态
    const selectedEdges = graph.findAllByState('edge', 'selected');
    each(selectedEdges, edge => {
      graph.setItemState(edge, 'selected', false);
    });

    // 取消所有node selected状态
    const selectedNodes = graph.findAllByState('node', 'selected');
    each(selectedNodes, node => {
      graph.setItemState(node, 'selected', false);
    });

    // 取消其他combo的选中状态
    if (!self.keydown || !self.multiple) {
      const selectedCombo = graph.findAllByState('combo', 'selected');
      each(selectedCombo, combo => {
        if (combo !== item) {
          graph.setItemState(combo, 'selected', false);
        }
      });
    }

    // 如果当前combo已经是选中状态则，重置为未选中状态；否则将combo设置为选中状态
    if (item.hasState('selected')) {
      if (self.shouldUpdate(e)) {
        graph.setItemState(item, 'selected', false);
      }
      eventBus.$emit('comboselectchange', { target: item, select: false });
    } else {
      if (self.shouldUpdate(e)) {
        graph.setItemState(item, 'selected', true);
      }
      eventBus.$emit('comboselectchange', { target: item, select: true });
    }
    graph.setAutoPaint(autoPaint);
    graph.paint();
  },
  // canvas点击事件
  onCanvasClick () {
    console.log('select-combo->onCanvasClick');
    const graph = this.graph;
    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);

    const selected = graph.findAllByState('combo', 'selected');
    // 点击画布则取消所有combo的选中状态
    each(selected, combo => {
      graph.setItemState(combo, 'selected', false);
      eventBus.$emit('comboselectchange', { target: combo, select: false });
    });

    // 点击画布则取消所有edge的选中状态
    const selectedEdges = graph.findAllByState('edge', 'selected');
    each(selectedEdges, edge => {
      graph.setItemState(edge, 'selected', false);
      eventBus.$emit('comboselectchange', { target: edge, select: false });
    })

    // 取消所有node selected状态
    const selectedNodes = graph.findAllByState('node', 'selected');
    each(selectedNodes, node => {
      graph.setItemState(node, 'selected', false);
    });

    graph.paint();
    graph.setAutoPaint(autoPaint);
  },
  onCanvasMouseover () {
    console.log('select-combo->onCanvasMouseover');
    const graph = this.graph;
    graph.paint();
  },
  onKeyDown (e) {
    console.log('select-combo->onKeyDown');
    const code = e.keyCode || e.which;
    if (code === this.keyCode) {
      this.keydown = true;
    } else {
      this.keydown = false;
    }
  },
  onKeyUp () {
    console.log('select-combo->onKeyUp');
    this.keydown = false;
  }
};
