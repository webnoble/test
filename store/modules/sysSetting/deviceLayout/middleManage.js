/**

* 应用软件api接口字段，表示返回api的数据结构.

* @typedef {(Object)} getSoftlist

* @property {string} id -  中间件id.
* @property {string} middleName- 中间件名称.
* @property {string} middleCategory-  中间件类型.
* @property {string} accessEquipment- 接入设备.
* @property {string} gateway- 网关.
* @property {string} area- 所在区域.
* @property {string} currentServer- 所在服务器.
*/

const data = [
  {
    id: '1',
    middleName: '省局Nginx1',
    middleCategory: 'Nginx',
    gateway: '网关一',
    accessEquipment: '中间件1',
    area: '锦江监狱',
    currentServer: '省局服务器'
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
