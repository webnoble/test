/**

* 应用软件api接口字段，表示返回api的数据结构.

* @typedef {(Object)} getSoftlist

* @property {string} id - 系统id.
* @property {string} cloudName- 云平台名称.
* @property {string} access- 接入方式.
* @property {string} gateway- 网关.
* @property {string} equipmentId- 设备ID.
* @property {string} area- 所在区域.
* @property {string} describe- 云平台描述.
*/

const data = [
  {
    id: '1',
    cloudName: 'sdd-343-434',
    access: '网关接入',
    gateway: '网关一',
    equipmentId: '34343D',
    area: '锦江监狱',
    describe: '云平台描述'
  }
]
// vuex的基本数据，用来存储变量
const state = {
  list: []
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
