/*
 * @Author: your name
 * @Date: 2020-05-18 13:53:01
 * @LastEditTime: 2020-05-28 14:23:21
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \monitor\src\main.js
 */
import Vue from 'vue'
import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import HyfeUi from 'hyfe-ui'
import 'hyfe-ui/lib/hyfe-ui.css'
import 'element-ui/lib/theme-chalk/index.css'
// import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'

// 暂时引入在线地址 后续icon更新完成统一下载到本地
// import '@/font/iconfont.css'

import i18n from './lang' // 国际化
import '@/icons' // icon
import './utils/error-log'; // error log
import './components/globalComponent'
import { dateFormat } from './utils/date-format.js'
// 引入公共方法
import common from './utils/common.js'
import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'
import { getRouter } from '@/api/user';

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */

// const { mockXHR } = require('../mock/localServer')
// mockXHR()

Vue.use(contentmenu)

var EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
  $EventBus: {
    get: function () {
      return EventBus
    }
  }
})
// set ElementUI lang to EN
Vue.use(HyfeUi, { baseUrl: process.env.VUE_APP_BASE_API })
// 使用公共方法
Vue.use(common)

Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Object.assign(Vue.prototype, { $dateFormat: dateFormat })
Vue.config.productionTip = false
Vue.filter('sizeFormatter', function (limit) {
  let size = '';
  if (limit <= 0) {
    return 0;
  } else if (limit < 0.1 * 1024) {
    size = limit.toFixed(2) + 'B';
  } else if (limit < 0.1 * 1024 * 1024) {
    size = (limit / 1024).toFixed(2) + 'K';
  } else if (limit < 0.1 * 1024 * 1024 * 1024) {
    size = (limit / (1024 * 1024)).toFixed(2) + 'M';
  } else {
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'G';
  }

  var sizeStr = size + '';
  var index = sizeStr.indexOf('.');
  var dou = sizeStr.substr(index + 1, 2);
  if (dou === '00') {
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
  }
  return size;
})
Vue.filter('timeFormatter', function (limit) {
  let time = '';
  if (limit <= 0) {
    return 0;
  } else if (limit < 1000 * 60) {
    time = Math.ceil((limit / 1000)) + '秒';
  } else if (limit < 1000 * 60 * 60) {
    time = Math.ceil((limit / 1000 / 60)) + '分';
  } else if (limit < 1000 * 60 * 60 * 24) {
    time = Math.ceil((limit / 1000 / 60 / 60)) + '小时';
  } else if (limit < 1000 * 60 * 60 * 24 * 365) {
    time = Math.ceil((limit / 1000 / 60 / 60 / 24)) + '天';
  } else {
    time = Math.ceil((limit / 1000 / 60 / 60 / 24 / 365)) + '年';
  }

  var timeStr = time + '';
  var index = timeStr.indexOf('.');
  var dou = timeStr.substr(index + 1, 2);
  if (dou === '00') {
    return timeStr.substring(0, index) + timeStr.substr(index + 3, 2);
  }
  return time;
})
Vue.filter('SwitchStatus', function (data) {
  let status = '';
  if (data === 'OK') {
    status = '正常'
  } else if (data === 'timeOut') {
    status = '断联'
  } else {
    status = '异常'
  }
  return status;
})
function FileSize (data) {
  if (!data || data <= 0) {
    return 0
  } else if (data < 1024) {
    return Math.round(data) + 'B/S'
  } else if (data < 1024 * 1024) {
    return Math.round(data / 1024) + 'KB/S'
  } else if (data < 1024 * 1024 * 1024) {
    return Math.round(data / 1024 / 1024) + 'M/S'
  } else {
    return Math.round(data / 1024 / 1024 / 1024) + 'G/S'
  }
}
Vue.prototype.FileSize = FileSize
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  beforeCreate: async function () {
    await this.$getBaseInfo().then(async (data) => {
      await store.dispatch('user/setInfo', data);
      await store.dispatch('layout/getAllDropDownBox')
      await store.dispatch('topo/getImages');
      const asyncRouters = getRouter(data.menus);
      const accessRoutes = await store.dispatch('permission/generateRoutes', asyncRouters);
      // dynamically add accessible routes
      router.addRoutes(accessRoutes);
      // 初始化链接websocket
      await store.dispatch('socket/connect');
      // 订阅告警通知
      await store.dispatch('socket/subscribe', { subscribeUrl: '/topic/monitor/alarm', dataName: 'warnList' });
    });
  },
  beforeDestroy () {
    store.dispatch('socket/disconnect');
  },
  render: h => h(App)
})
