import request from '@/utils/request';
export function getSystem (id) {
  return request({
    url: '/system/detail?id=' + id,
    method: 'get'
  });
}
export function getOracle (id) {
  return request({
    url: '/oracle/detail?id=' + id,
    method: 'get'
  });
}
export function getSqlserver (id) {
  return request({
    url: '/sqlserver/detail?id=' + id,
    method: 'get'
  });
}
export function getMysql (id) {
  return request({
    url: '/mysql/detail?id=' + id,
    method: 'get'
  });
}
