import eventBus from '&/utils/eventBus';

export default {
  getEvents () {
    return {
      'combo:mouseover': 'onMouseover',
      'combo:mouseleave': 'onMouseleave',
      'combo:mousedown': 'onMousedown',
      'contextmenu': 'onContextmenu'
    };
  },
  onContextmenu (e) {
    console.log('hover-combo->onContextmenu');
    // 解决右键点击combo时，弹出框和鼠标默认弹出菜单同时弹出问题
    e.preventDefault();
  },
  setHoverState (e, state) {
    const self = this;
    const item = e.item;
    const graph = self.graph;
    if (self.shouldUpdate(e)) {
      // 如果要设置的状态和已经设置的状态相同，则直接返回
      if ((state && item.hasState('hover')) || (!state && !item.hasState('hover'))) {
        return;
      } else {
        graph.setItemState(item, 'hover', state);
      }
    }
  },
  onMouseover (e) {
    console.log('hover-combo->onMouseover');
    this.setHoverState(e, true);
  },
  onMouseleave (e) {
    console.log('hover-combo->onMouseleave');
    this.setHoverState(e, false);
  },
  onMousedown (e) {
    console.log('hover-combo->onMousedown');
    // 鼠标右键按下
    if (e.originalEvent.button === 2) {
      eventBus.$emit('contextmenuClick', e)
    } else {
      // 鼠标左键按下
      if (e.target.get('name') === 'combo-marker-shape') {
        this.graph.collapseExpandCombo(e.item);
      } else {
        // 为了使用默认combo交互行为，屏蔽自定义交互方式
        // console.log('setMode:moveCombo');
        // this.graph.setMode('moveCombo')
      }
    }
  }
};
