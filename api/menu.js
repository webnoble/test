import request from '@/utils/request';
export function list (params) {
  return request({
    url: '/list',
    method: 'post',
    data: params
  });
}
export function getDetail (id) {
  return request({
    url: `/getDetail/${id}`,
    method: 'get'
  });
}
export function systemMenu (data) {
  let url;
  if (data.id) {
    url = `/systemMenu/${data.id}`
  } else {
    url = `/systemMenu`
  }
  return request({
    url: url,
    method: 'post',
    data: data
  });
}
