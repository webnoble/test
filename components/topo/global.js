/**
 * @fileOverview global config
 */

export default {
  version: '0.0.1-beat',
  rootContainerClassName: 'root-container',
  nodeContainerClassName: 'node-container',
  edgeContainerClassName: 'edge-container',
  groupContainerClassName: 'group-container',
  defaultNode: {
    shape: 'circle',
    style: {
      fill: '#fff'
    },
    size: 40,
    color: '#333'
  },
  defaultEdge: {
    shape: 'line',
    style: {},
    size: 1,
    color: '#333'
  },
  nodeLabel: {
    style: {
      fill: '#595959',
      textAlign: 'center',
      textBaseline: 'middle'
    },
    offset: 5 // 节点的默认文本不居中时的偏移量
  },
  edgeLabel: {
    style: {
      fill: '#595959',
      textAlign: 'center',
      textBaseline: 'middle'
    }
  },
  // 节点应用状态后的样式，默认仅提供 active 和 selected 用户可以自己扩展
  nodeStateStyle: {
    active: {
      fillOpacity: 0.8
    },
    selected: {
      lineWidth: 2
    }
  },
  edgeStateStyle: {
    active: {
      strokeOpacity: 0.8
    },
    selected: {
      lineWidth: 2
    }
  },
  loopPosition: 'top',
  delegateStyle: {
    fill: '#F3F9FF',
    fillOpacity: 0.5,
    stroke: '#1890FF',
    strokeOpacity: 0.9,
    lineDash: [5, 5]
  },
  // 默认分组样式
  defaultCombo: {
    type: 'customCombo',
    style: {
      lineWidth: 1,
      // lineAppendWidth: 2,
      lineDash: [5, 5],
      stroke: '#4d52e8'
    },
    labelCfg: {
      refY: -18,
      refX: 0,
      position: 'top',
      style: {
        fontSize: 16
      }
    }
  },
  // 交互状态下分组样式
  comboStateStyles: {
    hover: {
      opacity: 0.5,
      cursor: 'grab'
    },
    selected: {
      stroke: '#6ab7ff',
      lineDash: [1, 0]
    },
    dragenter: {
      stroke: '#FE9797'
    }
  },
  nodeToolTip: {
    type: 'tooltip', // 提示框
    formatText (model) {
      // 提示框文本内容
      const text = '设备: ' + model.label + '<br/> 描述: ' + model.warning.description;
      return text;
    }
  },
  edgeToolTip: {
    type: 'edge-tooltip', // 边提示框
    formatText (data) {
      // 边提示框文本内容
      const text =
        '从: ' +
        data.source._cfg.model.label +
        '<br/> 到: ' +
        data.target._cfg.model.label;
      return text;
    }
  }
};
