/**

* 应用软件api接口字段，表示返回api的数据结构.

* @typedef {(Object)} getlist

* @property {string} id - 应用软件id.
* @property {string} applicationName- 应用软件名称.
* @property {string} gateway- 采集网关.
* @property {string} accessApplication- 接入软件.
* @property {string} serverLocation- 所在服务器.
* @property {string} area- 所在区域.
* @property {string} applicationDescription- 软件描述.
*/

const data = [
  {
    id: '1',
    applicationName: '会见系统',
    gateway: '网关一',
    accessApplication: '应用软件1',
    serverLocation: '服务器1',
    area: '锦江监狱',
    applicationDescription: '锦江监狱会见系统'
  }
]
// vuex的基本数据，用来存储变量
const state = {
  list: data
}
// 同步提交更新数据的方法
const mutations = {

  getList: (state, list) => {
    // Chanage state
    state.list = list
  }

}
// 异步提交更新数据的方法
const actions = {
  getList ({ commit }) {
    // get api data
    commit('getList', data)
  }
}
// 相当于state的计算属性
const getters = {
  list: state => state.list
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
