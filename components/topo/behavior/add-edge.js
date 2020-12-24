
import eventBus from '&/utils/eventBus';
import { uniqueId } from '&/utils';

let startPoint = null
let startItem = null
let endPoint = {}
let activeItem = null
export default {
  getEvents () {
    return {
      'edge:click': 'onEdgeClick',
      'node:mousedown': 'onMousedown',
      'mousemove': 'onMousemove',
      'node:mouseover': 'onMouseover',
      'node:mouseleave': 'onMouseleave'
    };
  },
  /**
   * @description 显示连接线的节点
   * @param { string } inOutFlag 标志位：in、out，代表操作连线接入节点/连线接出节点
   * @param { object } node 选填参数，操作的节点，不传入则表示操作画布上所有的节点
   */
  showPoint (inOutFlag, node) {
    if (node) {
      const group = node.get('group')
      const children = group.cfg.children
      children.map(child => {
        if (inOutFlag === 'in' ? child.attrs.isInPointOut : child.attrs.isOutPointOut) {
          child.attr('opacity', '0.3')
        }
        if (inOutFlag === 'in' ? child.attrs.isInPoint : child.attrs.isOutPoint) {
          child.attr('opacity', '0.3')
        }
      });
      return;
    }
    this.graph.find('node', node => {
      const group = node.get('group')
      const children = group.cfg.children
      children.map(child => {
        if (inOutFlag === 'in' ? child.attrs.isInPointOut : child.attrs.isOutPointOut) {
          child.attr('opacity', '0.3')
        }
        if (inOutFlag === 'in' ? child.attrs.isInPoint : child.attrs.isOutPoint) {
          child.attr('opacity', '0.3')
        }
      })
    })
  },
  /**
   * @description 隐藏连接线的节点
   * @param { string } inOutFlag 标志位：in、out，代表操作连线接入节点/连线接出节点
   * @param { object } node 选填参数，操作的节点，不传入则表示操作画布上所有的节点
   */
  hidePoint (inOutFlag, node) {
    if (node) {
      const group = node.get('group')
      const children = group.cfg.children
      children.map(child => {
        if (inOutFlag === 'in' ? child.attrs.isInPointOut : child.attrs.isOutPointOut) {
          child.attr('opacity', '0')
        }
        if (inOutFlag === 'in' ? child.attrs.isInPoint : child.attrs.isOutPoint) {
          child.attr('opacity', '0')
        }
      });
      return;
    }
    this.graph.find('node', node => {
      const group = node.get('group')
      const children = group.cfg.children
      children.map(child => {
        if (inOutFlag === 'in' ? child.attrs.isInPointOut : child.attrs.isOutPointOut) {
          child.attr('opacity', '0')
        }
        if (inOutFlag === 'in' ? child.attrs.isInPoint : child.attrs.isOutPoint) {
          child.attr('opacity', '0')
        }
      })
    })
  },
  resetState () {
    // 重置所有状态
    this.edge = null;
    startPoint = null;
    startItem = null;
    endPoint = {};
    activeItem = null;
    // 隐藏节点接入/接出节点样式
    this.hidePoint('in');
    this.hidePoint('out');
    // 重绘画面，避免画面马赛克
    this.graph.paint();
  },
  onEdgeClick (ev) {
    console.log('add-edge->onEdgeClick');
    const currentEdge = ev.item;
    if (startItem && this.edge === currentEdge) {
      this.graph.removeItem(this.edge);
      this.resetState();
    }
  },
  onMousedown (e) {
    console.log('add-edge->onMousedown');
    const { item } = e;
    // 判断鼠标按下时,触发mousedown的元素是否是node，
    if (item && item.getType() !== 'node') {
      // 如果不是node,判断引导线是否存在，不存在则不执行任何操作，
      if (this.edge) {
        this.graph.removeItem(this.edge);
      }
    } else {
      // 判断鼠标按下时起始节点是否存在
      if (!startItem) {
        // 点击事件可能会在node节点内的任何元素上
        const nodeGroup = item.getContainer();
        const nodeChildren = nodeGroup.cfg.children;
        let model = null;
        nodeChildren.map(child => {
          // 找到node连线接出节点
          if (child.attrs.isOutPoint) {
            // 如果起始节点不存在，将节点作为起始节点，并绘制引导线
            const startX = parseInt(child.attrs.x)
            const startY = parseInt(child.attrs.y)
            startPoint = { x: startX, y: startY };
            startItem = item;
            model = {
              source: startItem,
              target: startItem,
              start: startPoint,
              end: startPoint,
              type: 'customEdge'
            };
          }
        });
        // 选择好连出节点后，显示所有连入节点样式
        this.showPoint('in');
        // 自己不能连自己,节点本身的连入节点
        this.hidePoint('in', item);
        // 在画布上添加一条引导线，起点为触发mouseup事件的元素
        this.edge = this.graph.addItem('edge', model);
        // 在添加了引导线后将所有的node节点放到画布最高层，以解决使用combo而配置的groupByTypes为false，使edge层级在node层级之上，而导致的无法在node上触发mouseup事件无法连线的问题
        this.edge.toBack();
        // 更改层级后需要重新绘制图
        this.graph.paint();
      } else {
        // 如果结束节点时本身，则不作任何事情
        if (startItem._cfg.model.id === item._cfg.model.id) {
          return;
        }
        // 如果起始节点存在，则将节点作为终点，移除引导线、重置起始节点，重绘画面(此时仍在【连线】交互模式)
        const group = item.getContainer()
        const children = group.cfg.children
        children.map(child => {
          if (child.attrs.isInPoint) {
            activeItem = child;
          }
        })
        if (activeItem) {
          const endX = parseInt(activeItem.attrs.x)
          const endY = parseInt(activeItem.attrs.y)
          endPoint = { x: endX, y: endY };
          if (this.edge) {
            this.graph.removeItem(this.edge);
            const model = {
              id: 'edge' + uniqueId(),
              source: startItem,
              target: item,
              sourceId: startItem._cfg.id,
              targetId: item._cfg.id,
              start: startPoint,
              end: endPoint,
              type: 'customEdge',
              itemType: 'edge'
            }
            // this.graph.addItem('edge', model);
            eventBus.$emit('addItem', model)
          }
        } else {
          if (this.edge) {
            this.graph.removeItem(this.edge);
          }
        }
        this.resetState();
      }
    }
  },
  onMousemove (e) {
    console.log('add-edge->onMousemove');
    // 判断起始节点是否存在
    // 如果startPoint不为空则表示当前以及连接了起点，正在寻找终点，根据当前鼠标位置重绘引导线
    const point = { x: e.x, y: e.y };
    if (this.edge) {
      // 新增边的过程中，移动时边跟着移动
      this.graph.updateItem(this.edge, {
        //  start: startPoint,
        target: point
      });
    }
  },
  onMouseover (e) {
    console.log('add-edge->onMouseover');
    // 判断起始节点是否存在
    const { item } = e;
    if (item && startItem) {
      this.graph.setItemState(item, 'hover', true);
    } else {
      const group = item.get('group')
      const children = group.cfg.children
      children.map(child => {
        if (child.attrs.isOutPointOut) {
          child.attr('opacity', '0.3')
        }
        if (child.attrs.isOutPoint) {
          child.attr('opacity', '1')
        }
      })
    }
  },
  onMouseleave (e) {
    console.log('add-edge->onMouseleave');
    // 判断起始节点是否存在
    const { item } = e;
    if (item && startItem) {
      this.graph.setItemState(item, 'hover', false);
    } else {
      const group = item.get('group')
      const children = group.cfg.children
      children.map(child => {
        if (child.attrs.isOutPointOut) {
          child.attr('opacity', '0')
        }
        if (child.attrs.isOutPoint) {
          child.attr('opacity', '0')
        }
      })
    }
    // 隐藏触发museover元素的inPoint
  }
}
