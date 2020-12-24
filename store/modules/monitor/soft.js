/*
 * @Author: your name
 * @Date: 2020-05-11 14:50:43
 * @LastEditTime: 2020-05-29 10:36:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \monitor\src\store\modules\monitor\soft.js
 */
/**

* 应用软件api接口字段，表示返回api的数据结构.

* @typedef {(Object)} getSoftlist

* @property {string} id - 软件id.
* @property {string} name - 应用软件名称.
* @property {string} area - 所在区域.
* @property {string} runState - 运行状态.
* @property {string} processNum - 进程数.
* @property {string} resState - 响应状态（1.正常，2。错误，3.非常慢，4.缓慢）.
*/

const data = [
  {
    id: '2',
    name: '会见系统',
    area: '所在区域',
    runState: '运行',
    num: '2',
    resState: '2',
    time: '10ms',
    reason: '数据库占用内存过大',
    err: '2'
  }
]
const flowList = [
  {
    name: '省局流程',
    state: '进行中',
    time: '2020-03-12  12:33:22',
    payTime: '2min'
  },
  {
    name: '锦江监狱数据流程',
    state: '已完结',
    time: '2020-05-11  11:53:22',
    payTime: '3min'
  }, {
    name: '邑州监狱数据流程',
    state: '已拒绝',
    time: '2020-06-12  08:33:42',
    payTime: '4min'
  },
  {
    name: '川北监狱数据流程',
    state: '进行中',
    time: '2020-06-12  11:33:22',
    payTime: '5min'
  }, {
    name: '川西监狱数据流程',
    state: '进行中',
    time: '2020-06-12  14:33:42',
    payTime: '6min'
  },
  {
    name: '乐山监狱数据流程',
    state: '进行中',
    time: '2020-07-01  19:33:22',
    payTime: '6min'
  }
]
const state = {
  list: [],
  flowList: flowList
}

const mutations = {

  getList: (state, list) => {
    // Chanage state
    state.list = list
  }

}

const actions = {
  getList ({ commit }) {
    // get api data
    commit('getList', data)
  }
}
const getters = {
  list: state => state.list,
  flowList: state => state.flowList
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
