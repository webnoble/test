import request from '@/utils/request'

/**
 * @description 创建/批量创建
 * @param {*} params
 */
export function addArticles(params) {
  return request({
    url: '/V03R00C028B001/articleService/articles',
    method: 'post',
    data: {
      items: params,
      method: 'create'
    }
  })
}

/**
 * @description 批量删除
 * @param {*} params
 */
export function deleteArticles(params) {
  return request({
    url: '/V03R00C028B001/articleService/articles',
    method: 'post',
    data: {
      items: params,
      method: 'delete'
    }
  })
}

/**
 * @description 删除
 * @param {*} params
 */
export function deleteArticle(id) {
  return request({
    url: `/V03R00C028B001/articleService/articles/${id}`,
    method: 'delete'
  })
}

/**
 * @description 修改/批量修改
 * @param {*} params
 */
export function updateArticles(params) {
  return request({
    url: '/V03R00C028B001/articleService/articles',
    method: 'put',
    data: {
      items: params
    }
  })
}

/**
 * @description 查询详情
 * @param {*} params
 */
export function getArticle(id) {
  return request({
    url: `/V03R00C028B001/articleService/articles/${id}`,
    method: 'get'
  })
}

/**
 * @description 查询列表
 * @param {*} params
 */
export function getArticles(params) {
  const defaultParam = {
    page: 1,
    row: 10
  }
  return request({
    url: '/V03R00C028B001/articleService/articles',
    method: 'get',
    params: {
      ...defaultParam,
      ...params
    }
  })
}
