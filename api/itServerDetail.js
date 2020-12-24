import request from '@/utils/request';
export function getServerDetail (id) {
  return request({
    url: '/server/detail?meId=' + id,
    method: 'get'
  });
}
