
import each from '@antv/util/esm/each';
import eventBus from '&/utils/eventBus';
export default {
  getDefaultCfg () {
    return {
      multiple: true,
      keyCode: 16
    };
  },
  getEvents () {
    return {
      'node:click': 'onClick',
      'canvas:click': 'onCanvasClick',
      'canvas:mouseover': 'onCanvasMouseover',
      keyup: 'onKeyUp',
      keydown: 'onKeyDown'
    };
  },
  onClick (e) {
    console.log('onClick:select-node');
    const self = this;
    const item = e.item;
    const graph = self.graph;
    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);

    const selected = graph.findAllByState('combo', 'selected');
    // 点击node则取消所有combo的选中状态
    each(selected, combo => {
      graph.setItemState(combo, 'selected', false);
      eventBus.$emit('comboselectchange', { target: combo, select: false });
    });
    // 点击node则取消所有edge的选中状态
    const selectedEdges = graph.findAllByState('edge', 'selected');
    each(selectedEdges, edge => {
      graph.setItemState(edge, 'selected', false);
    });
    if (!self.keydown || !self.multiple) {
      const selected = graph.findAllByState('node', 'selected');
      each(selected, node => {
        if (node !== item) {
          graph.setItemState(node, 'selected', false);
        }
      });
    }
    if (item.hasState('selected')) {
      if (self.shouldUpdate(e)) {
        graph.setItemState(item, 'selected', false);
      }

      eventBus.$emit('nodeselectchange', { target: item, select: false });
    } else {
      if (self.shouldUpdate(e)) {
        graph.setItemState(item, 'selected', true);
      }
      eventBus.$emit('nodeselectchange', { target: item, select: true });
    }
    graph.setAutoPaint(autoPaint);
    graph.paint();
  },
  onCanvasClick () {
    console.log('onCanvasClick:select-node');
    const graph = this.graph;
    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);
    const selected = graph.findAllByState('node', 'selected');
    each(selected, node => {
      graph.setItemState(node, 'selected', false);
      eventBus.$emit('nodeselectchange', { target: node, select: false });
    });

    const selectedEdges = graph.findAllByState('edge', 'selected');
    each(selectedEdges, edge => {
      graph.setItemState(edge, 'selected', false);
      eventBus.$emit('nodeselectchange', { target: edge, select: false });
    })

    graph.paint();
    graph.setAutoPaint(autoPaint);
  },
  onCanvasMouseover () {
    console.log('onCanvasMouseover:select-node');
    const graph = this.graph;
    graph.paint();
  },
  onKeyDown (e) {
    console.log('onKeyDown:select-node');
    const code = e.keyCode || e.which;
    if (code === this.keyCode) {
      this.keydown = true;
    } else {
      this.keydown = false;
    }
  },
  onKeyUp () {
    console.log('onKeyUp:select-node');
    this.keydown = false;
  }
};
