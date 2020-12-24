/**

* 应用软件api接口字段，表示返回api的数据结构.

* @typedef {(Object)} getSoftlist

* @property {string} id - 设备id.
* @property {string} equipmentName- 操作设备名称.
* @property {string} equipmentCategory- 设备类型.
* @property {string} gateway- 网关.
* @property {string} accessEquipment- 接入设备.
* @property {string} area- 所在区域.
* @property {string} currentArea- 当前位置.
*/

const data = [
  {
    id: '1',
    equipmentName: '省局服务器',
    equipmentCategory: '服务器',
    gateway: '网关一',
    accessEquipment: '服务器1',
    area: '锦江监狱',
    currentArea: '省局2楼机房'
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
