/*
 * @Author: your name
 * @Date: 2020-04-27 15:25:44
 * @LastEditTime: 2020-05-28 15:38:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \monitor\src\api\user.js
 */
import request from '@/utils/request';
import routerList from '@/router/list';
function getComponent (path) {
  const router = routerList.find((item) => { return item.path === path })
  if (router) {
    return router.component
  } else {
    return ''
  }
}
export function getRouter (json, parentId) {
  let layout;
  if (parentId) {
    layout = json.filter((item) => { return item.parent && item.parent.id === parentId });
  } else {
    layout = json.filter((item) => { return !item.parent });
  }
  // console.log(layout)
  const menus = [];
  layout.forEach((item, index) => {
    // const children = json.filter((i) => { return i.parent && item.id === i.parent.id });
    // console.log(children)
    // console.log(item)
    if (!item.parent && item.menuType === 'url') {
      menus.push({
        path: item.menuValue,
        component: 'Layout',
        name: item.menuName,
        redirect: item.menuValue,
        data: item,
        children: [{
          path: item.menuValue,
          name: item.menuName,
          component: getComponent(item.menuValue) || '/monitor/index.vue',
          children: getRouter(json, item.id)
        }]
      })
    } else {
      menus.push({
        path: item.menuType === 'directory' ? '/Layout' + index : item.menuValue,
        component: item.menuType === 'directory' ? 'Layout' : getComponent(item.menuValue) || '/monitor/index.vue',
        redirect: item.menuType === 'directory' ? 'noRedirect' : '',
        name: item.menuName,
        data: item,
        meta: { title: item.menuName, icon: item.icon },
        children: getRouter(json, item.id)
      })
    }

    menus.sort(function (a, b) {
      return a.data.pxNum - b.data.pxNum
    })
  })
  return menus
}
export function login () {
  return request({
    url: '/checkFrontSso',
    method: 'get'
  });
}

export function permitThrough () {
  return request({
    url: '/permitThrough',
    method: 'get'
  });
  // return Promise.resolve(false);
}
export function loadButton () {
  // return request({
  //   url: '/loadButton',
  //   method: 'get'
  // });
  return Promise.resolve([]);
}
export function getInfo () {
  // 因为后端暂时未提供登陆接口，暂时返回模式数据
  return new Promise((resolve, reject) => {
    request({
      url: '/loadMenu',
      method: 'get'
    }).then((data) => {
      resolve({
        introduction: '',
        avatar: 'data:image/png;base64,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',
        name: '',
        menus: getRouter(data)
      });
    });
  })
}

export function logout () {
  return request({
    url: 'logout',
    method: 'get'
  });
}
