import { uniqueId } from '&/utils';
import eventBus from '&/utils/eventBus';

export default class Editor {
  constructor() {
    this.id = uniqueId();
  }
  getGrpah () {
    return this.graph
  }
  emit (event, params) {
    if (event === 'afterAddPage') {
      this.graph = params.graph
    }
    eventBus.$emit(event, params)
  }
  on (event) {
    switch (event) {
      case 'changeNodeData':
        this.graph.refresh()
        break
    }
  }
  add (type, item) {
    if (type === 'combo') {
      const nodes = JSON.parse(JSON.stringify(item.nodes || []));
      delete item.itemType;
      delete item.nodes;
      delete item.type;
      nodes.forEach(node => {
        this.graph.updateItem(node, { comboId: item.id });
      });
      this.graph.createCombo(item, nodes)
    } else {
      this.graph.addItem(type, item)
    }
  }
  update (item, model) {
    this.graph.update(item, model)
    if (typeof item.getModel === 'function') {
      this.graph.updateCombo(item.getModel().comboId);
    }
  }
  remove (item) {
    const node = this.graph.findById(item.id)
    this.graph.remove(node)
  }
}
