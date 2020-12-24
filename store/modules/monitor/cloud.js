/**

* 应用软件api接口字段，表示返回api的数据结构.

* @typedef {(Object)} getSoftlist

* @property {string} id - 云平台id.
* @property {string} serialNumber- 序号.
* @property {string} host- 主机信息.
* @property {string} area- 所在区域.
* @property {string} runState- 运行状态.
* @property {string} virtualMachine- 虚拟机.
* @property {string} disk- 磁盘.
* @property {string} memory- 内存.
* @property {string} networkTraffic - 网卡流量.
*/

const data = [
  {
    id: '1',
    serialNumber: '363',
    host: '省局私有云',
    area: '锦江监狱',
    runState: '运行',
    virtualMachine: '2',
    disk: '32G / 1TB',
    memory: '32G / 1TB',
    networkTraffic: '3kb/s'
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
