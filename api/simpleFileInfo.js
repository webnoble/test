import request from '@/utils/request';
// const apiUrl = 'http://80.205.0.190:6691/attachment_provider/';
const apiUrl = 'http://192.168.0.209:6691/attachment_provider/';
// 上传返回fileInfo集合
export function uploadSimpleFileInfo () {
  return request({
    url: apiUrl + 'simpleFileInfo/fileInfo',
    method: 'post'
  });
}
export function apiUrlfun () {
  return apiUrl
}
export function uploadSimpleFileUrl () {
  return apiUrl + `simpleFileInfo/file/`
}
// 上传返回ID集合
export function uploadSimpleFile (businessId) {
  return request({
    url: apiUrl + `simpleFileInfo/file/${businessId}`,
    method: 'post'
  });
}
// 通过数据ID删除附件信息
export function deleteSimpleFileInfo (data) {
  return request({
    url: apiUrl + `simpleFileInfo/files/delete`,
    method: 'post',
    data: data
  });
}
// 编辑附件
export function updateSimpleFileInfo (data) {
  return request({
    url: apiUrl + `simpleFileInfo/fileInfo`,
    method: 'put',
    data: data
  });
}
// 附件分页查询
export function getSimplePageFileInfo () {
  return request({
    url: apiUrl + 'simpleFileInfo/pageFileInfo',
    method: 'get'
  });
}

// 通过数据ID返回数据
export function getSimpleFileInfo (id) {
  return request({
    url: apiUrl + `simpleFileInfo/fileInfo/${id}`,
    method: 'get'
  });
}
// 通过业务ID返回数据
export function getSimpleFileInfoList (businessId) {
  return request({
    url: apiUrl + `simpleFileInfo/fileInfoList/${businessId}`,
    method: 'get'
  });
}

// 通过 附件ID 下载并返回单个文件
export function downloadSimpleFileInfo (id) {
  return request({
    url: apiUrl + `simpleFileInfo/download`,
    method: 'get',
    params: { id: id }
  });
}
// 通过 附件ID 集合/业务ID集合下载并返回zip文件
export function downloadSimpleFileInfoList (data) {
  return request({
    url: apiUrl + 'customerFileInfo/downloadZipFile',
    method: 'get',
    data: data
  });
}
