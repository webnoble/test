import request from '@/utils/request';
export function getAllDropDownBox () {
  return request({
    url: '/common/getAllDropDownBox',
    method: 'get'
  });
}
