import request from '@/utils/request';
export function getJapp (cmId) {
  return request({
    url: '/japp/details?cmId=' + cmId,
    method: 'get'
  });
}

export function getJappProcess (cmId) {
  return request({
    url: '/japp/process_details?cmId=' + cmId,
    method: 'get'
  });
}

export function getJappUrl (cmId) {
  return request({
    url: '/japp/url_details?cmId=' + cmId,
    method: 'get'
  });
}

export function getException (cmId) {
  return request({
    url: '/japp/exception_details?cmId=' + cmId,
    method: 'get'
  });
}
