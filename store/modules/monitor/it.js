/**

* 应用软件api接口字段，表示返回api的数据结构.

* @typedef {(Object)} getItlist

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
const switchesData = [
  {
    id: '1',
    name: '交换机1',
    area: '所在区域',
    runState: '运行',
    num: '2',
    resState: '2',
    time: '10ms',
    reason: '数据库占用内存过大',
    err: '2'
  }
]
const state = {
  list: [],
  switchesList: []
}

const mutations = {

  getList: (state, list) => {
    // Chanage state
    state.list = list
  },
  getSwitchesList: (state, list) => {
    // Chanage state
    state.switchesList = list
  }
}

const actions = {
  getList ({ commit }) {
    // get api data
    commit('getList', data)
  },
  getSwitchesList ({ commit }) {
    // get api data
    commit('getSwitchesList', switchesData)
  }
}
const getters = {
  list: state => state.list,
  switchesList: state => state.switchesList
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
