import request from '@/utils/request';

// 查询设备列表
export function getDeviceList (params) {
  return request({
    url: '/cmMe/list',
    method: 'get',
    params
  });
}
