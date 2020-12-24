
import each from '@antv/util/esm/each';
import eventBus from '&/utils/eventBus';
export default {
  getEvents () {
    return {
      'edge:mouseover': 'onMouseover',
      'edge:mouseleave': 'onMouseleave',
      'edge:click': 'onClick'
    };
  },
  onMouseover (e) {
    console.log('onMouseover:hover-edge');
    const self = this;
    const item = e.item;
    const graph = self.graph;
    if (item.hasState('selected')) {
      return
    } else {
      if (self.shouldUpdate(e)) {
        graph.setItemState(item, 'hover', true);
      }
    }
    graph.paint();
  },
  onMouseleave (e) {
    console.log('onMouseleave:hover-edge');
    const self = this;
    const item = e.item;
    const graph = self.graph;
    const group = item.getContainer();
    group.find(g => {
      if (g.attrs.isInPoint || g.attrs.isOutPoint) {
        g.attr('fill', '#fff')
      }
    });
    if (self.shouldUpdate(e)) {
      if (!item.hasState('selected')) {
        graph.setItemState(item, 'hover', false);
      }
    }
    graph.paint();
  },
  onClick (e) {
    console.log('onClick:hover-edge');
    const self = this;
    const item = e.item;
    const graph = self.graph;
    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);

    const selectedCombo = graph.findAllByState('combo', 'selected');
    // 点击edge则取消所有combo的选中状态
    each(selectedCombo, combo => {
      graph.setItemState(combo, 'selected', false);
      eventBus.$emit('comboselectchange', { target: combo, select: false });
    });

    // 点击edge则取消所有node的选中状态
    const selectedNodes = graph.findAllByState('node', 'selected');
    each(selectedNodes, node => {
      graph.setItemState(node, 'selected', false);
    });

    if (!self.keydown || !self.multiple) {
      const selected = graph.findAllByState('edge', 'selected');
      each(selected, edge => {
        if (edge !== item) {
          graph.setItemState(edge, 'selected', false);
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
  }
};
