import G6 from '@antv/g6';
import hoverNode from './hover-node'
import addLine from './add-edge'
import dragItem from './drag-item';
import dragCombo from './drag-combo';
import selectNode from './select-node'
import hoverEdge from './hover-edge';
import hoverCombo from './hover-combo'
import keyboard from './keyboard'
import mulitSelect from './mulit-select'
import addMenu from './add-menu'
import selectCombo from './select-combo';

const behavors = {
  'hover-node': hoverNode,
  'add-edge': addLine,
  'drag-item': dragItem,
  'drag-combo-custom': dragCombo,
  'select-node': selectNode,
  'select-combo': selectCombo,
  'hover-edge': hoverEdge,
  'hover-combo': hoverCombo,
  'keyboard': keyboard,
  'mulit-select': mulitSelect,
  'add-menu': addMenu
}

export function initBehavors () {
  for (const key in behavors) {
    G6.registerBehavior(key, behavors[key])
  }
}
