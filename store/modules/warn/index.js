/**

* 应用软件api接口字段，表示返回api的数据结构.

* @typedef {(Object)} getSoftlist

* @property {string} id - 告警id.
* @property {string} serialNumber- 序号.
* @property {string} alarmSource- 告警源.
* @property {string} alarmCategory- 告警类别.
* @property {string} alarmLevel- 告警级别.
* @property {string} alarmDescription- 告警描述.
* @property {string} alarmTime- 告警时间.
* @property {string} alarmState- 告警状态.
* @property {string} setTime- 确认时间.
* @property {string} dealState - 处理状态.
*/

const data = [
  {
    id: '1',
    serialNumber: '231',
    alarmSource: '甘孜监狱-大门门禁',
    alarmCategory: '安防设备',
    alarmLevel: '1',
    alarmDescription: '大门长时间未关闭',
    alarmTime: '2020/04/15  09:01:23',
    alarmState: '未确认',
    setTime: '2020/04/15  09:11:23',
    dealState: '待处理'
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
