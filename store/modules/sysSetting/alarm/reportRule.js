/**

* 应用软件api接口字段，表示返回api的数据结构.

* @typedef {(Object)} getSoftlist

* @property {string} id - 告警规则id.
* @property {string} ruleNum - 告警规则序号.
* @property {string} ruleName- 规则名称.
* @property {string} alarmSource- 告警源.
* @property {string} alarmCategory- 告警类别.
* @property {string} level- 告警级别(1.致命 2.严重 3.一般 4.提示).
* @property {string} ruleDescription- 规则描述.
* @property {string} runState- 运行状态(1.运行中 2.已停止).
*/

const data = [
  {
    id: '1',
    ruleNum: '231',
    ruleName: '大门门禁致命告警',
    alarmSource: '门禁告警一',
    alarmCategory: '安防设备',
    level: '3',
    ruleDescription: '硬盘资源（70%>X>80%',
    runState: '2'
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
