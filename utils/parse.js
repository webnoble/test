import { warningLevel } from './filters';
// 组装数据，将nodes数组和edges连线打包为能描述节点间关系的一维数组
export function pack (data) {
  const nodes = data.nodes || [];
  const edges = data.edges || [];
  const groups = data.groups || [];
  const combos = data.combos || [];
  const temp = {};
  const packedNodes = [];
  // 遍历节点，将所有节点放到对象上，以便遍历连线时快速索引节点
  nodes.forEach((node, index, arr) => {
    node['target'] = [];
    node['source'] = [];
    delete node.inPoints;
    delete node.outPoints;
    delete node.label;
    delete node.style;
    delete node.size;
    temp[node.id] = node;
  });
  // 遍历连线，将连线信息放到节点上
  edges.forEach((edge, index, arr) => {
    const source = edge.source;
    const target = edge.target;
    // 只需要from便可以描述图信息
    temp[source]['target'].push({ id: target, type: edge.type });
    temp[target]['source'].push({ id: source, type: edge.type });
  });
  for (const nodeId in temp) {
    packedNodes.push(temp[nodeId]);
  }
  combos.forEach((combo) => {
    // persistenceId是解析后端数据库查回来的数据时，为了解决渲染拓扑图时在数据中带有comboId会导致combo分组无法编辑，而重命名的id
    // 如果有persistenceId则表示这条数据持久化过，需要将原来的持久化id回传给数据库
    if (data.persistenceId) {
      data.comboId = combo.persistenceId;
      delete combo.persistenceId;
    }
  });
  return {
    nodes: packedNodes,
    groups,
    combos
  };
}

function createEdge (f, target) {
  const edge = {
    id: f.id + target,
    source: f.id,
    target,
    type: f.type,
    stateColor: '#7E7C8B'
  };
  return edge;
}

// 解析数据，将带有关系属性的nodes数组解析为vg渲染所需的nodes和edges数据
export function unPack (data, mode) {
  const packedNodes = data.nodes || [];
  const nodes = [];
  const edges = [];
  let combos = data.combos || [];
  const combosObj = {};

  // 将combo转换为对象，以便后续操作
  combos.map((combo) => {
    combo.children = []; // 默认combo分组的子元素为空
    data.persistenceId = combo.comboId;
    delete combo.comboId; // comboId是后端数据库持久化时生成的唯一id，渲染拓扑图时在数据中带有comboId会导致combo分组无法编辑，所以将comboId更改为persistenceId
    combosObj[combo.id] = combo;
  });
  for (const combo in combosObj) {
    const currentComboId = combosObj[combo].id;
    const parentId = combosObj[combo].parentId;
    if (parentId) {
      combosObj[parentId].children.push({
        id: currentComboId,
        itemType: 'combo'
      });
    }
  }
  // 遍历所有的node，根据节点的source创建edge
  packedNodes.forEach((node) => {
    let source = node.source;
    node.warningList = node.warningList || []; // 目前告警消息为空时，后端返回的null，而不是[];
    node.warningList.sort((a, b) => { return b.level - a.level }); // 对告警信息来个排序，告警等级降序
    node.warning = node.warningList[0];// 取告警等级最高的信息显示
    const nodeColor = mode === 'edit' ? warningLevel('0').color : node.warning ? node.warning.level !== '0' ? warningLevel(node.warning.level).color : warningLevel('0').color : warningLevel('0').color;
    if (typeof source === 'string') {
      try {
        source = JSON.parse(source);
      } catch (error) {
        source = [];
      }
    }
    if (source && source.length) {
      for (const f in source) {
        edges.push(createEdge(source[f], node.id));
      }
    }
    if (node.comboId && combosObj[node.comboId]) {
      combosObj[node.comboId].children.push({
        id: node.id,
        itemType: 'node'
      });
    }
    node.stateColor = nodeColor;
    nodes.push(node);
  });
  // 如果不是在编辑模式下，需要根据node连接状态设置edge颜色
  if (mode !== 'edit') {
    // 所有的edge创建完成，根据所有node的connectState设置与该node相关的edge的color
    packedNodes.forEach((node) => {
      // 默认edge状态正常时颜色为#7E7C8B；如果node连接状态不OK，则需要改变node相关的edge颜色
      if (node.connectState !== 'OK') {
        edges.forEach((edge) => {
          if (edge.source === node.id || edge.target === node.id) {
            edge.stateColor = '#FF0000'
          }
        });
      }
    });
  }
  combos = [];
  for (const combo in combosObj) {
    combos.push(combosObj[combo]);
  }
  return {
    nodes,
    edges,
    groups: data.groups,
    combos: combos
  };
}

// 获取图元
export function getImages (types) {
  const temp = {};
  types.forEach((type) => {
    const items = type.items;
    items.forEach(imageItem => {
      temp[imageItem.imageTypeId] = imageItem;
    });
  })
  return temp;
}
