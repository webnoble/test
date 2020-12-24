import request from '@/utils/request';
export function getSysList (params) {
  return request({
    url: '/os/metric/list',
    method: 'post',
    data: params
  });
}
export function getSysDetail (params) {
  return request({
    url: `/os/metric/detail?actualId=${params.actualId}`,
    method: 'post'
  });
}
