import request from '@/utils/request';

// 拓扑图列表
export function getTopoList (id) {
  return request({
    url: '/topo/list',
    method: 'get',
    areaId: id
  });
}

// 拓扑图图元类型
export function getImageTypeList () {
  return request({
    url: '/topo/image/type',
    method: 'get'
  });

  // const temp = [];
  // for (const o in nodeData) {
  //   temp.push(nodeData[o]);
  // }

  // return Promise.resolve(temp);
}

// 拓扑图详情
export function getTopoDetail (topoId) {
  return request({
    url: `/topo/detail/${topoId}`,
    method: 'get'
  });
  // return Promise.resolve(mockData[1]);
}

// 删除拓扑图
export function deleteTopo (topoId) {
  return request({
    url: `/topo/del/${topoId}`,
    method: 'delete'
  });
}

// 新增拓扑图
export function createTopo (data) {
  return request({
    url: '/topo/add',
    method: 'post',
    data: data
  });
}

// 更新拓扑图
export function updateTopo (data) {
  return createTopo(data);
}
