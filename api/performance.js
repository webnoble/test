import request from '@/utils/request';
// 查询门限
export function getPerformance (id) {
  return request({
    url: '/alarm/performance/list/?groupId=' + id,
    method: 'get'
  });
}
// 更新门限
export function editPerformance (params) {
  return request({
    url: `/alarm/performance/update`,
    method: 'put',
    data: params
  });
}
