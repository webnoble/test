import request from '@/utils/request';
export function getSwitchDetail (id) {
  return request({
    url: '/switch/detail?id=' + id,
    method: 'get'
  });
}
