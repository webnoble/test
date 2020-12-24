export default {
  getEvents () {
    return {
      'combo:dragend': 'onDragend',
      'mouseup': 'onMouseup'
    };
  },
  onMouseup (e) {
    console.log('drag-combo->onMouseup');
    this.graph.setMode('default')
    console.log('setMode:default');
  },
  onDragend (e) {
    console.log('drag-combo->onDragend');
    this.graph.setMode('default');
    console.log('setMode:default');
  }
};
