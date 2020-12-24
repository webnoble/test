/**

* 应用软件api接口字段，表示返回api的数据结构.

* @typedef {(Object)} getlist

* @property {string} id - 系统id.
* @property {string} sysNum- 序号.
* @property {string} sysName- 操作系统名称.
* @property {string} sysCategory- 系统类别.
* @property {string} runState- 运行状态.
* @property {string} memory- 内存.
* @property {string} cpu- cpu.
* @property {string} hostServer- 所在服务器.

* @typedef {(Object)} getdatbaseList

* @property {string} id - 数据库id.
* @property {string} databaseName- 数据库名称.
* @property {string} runState- 运行状态.
* @property {string} databaseFileSize- 数据库文件大小.
* @property {string} processNum- 进程数量.
* @property {string} activitySession- 活动会话.
* @property {string} audit- 审计.
* @property {string} databaseConnectionNum- 数据库连接数量.
* @property {string} area - 所在位置.
*/
import { getSysList, getSysDetail } from '@/api/monitor';

const data = [
  {
    id: '1',
    sysNum: '363',
    sysName: '操作系统名称1',
    sysCategory: 'windows操作系统',
    runState: '正常',
    disk: '正常',
    memory: '异常',
    cpu: '正常',
    hostServer: '省局服务器'
  }
]
const databaseData = [
  {
    id: '1',
    databaseName: 'oracle',
    runState: '3',
    databaseFileSize: '21G',
    processNum: '52',
    activitySession: '13',
    audit: '开启',
    databaseConnectionNum: '41',
    area: '省局服务器'
  }
]
const databaseData1 = [
  {
    id: '1',
    databaseName: 'sqlserve',
    runState: '3',
    databaseFileSize: '21G',
    processNum: '52',
    activitySession: '13',
    audit: '开启',
    databaseConnectionNum: '41',
    area: '省局服务器'
  }
]
const databaseData2 = [
  {
    id: '1',
    databaseName: 'mysql',
    runState: '3',
    databaseFileSize: '21G',
    processNum: '52',
    activitySession: '13',
    audit: '开启',
    databaseConnectionNum: '41',
    area: '省局服务器'
  }
]
// vuex的基本数据，用来存储变量
const state = {
  list: data,
  databaseList: [],
  sysDetail: '',
  oracleNum: 43,
  sqlserveNum: 50,
  msqlNum: 66
}
// 同步提交更新数据的方法
const mutations = {
  getList: (state, list) => {
    // Chanage state
    state.list = list
  },
  getSysDetail: (state, data) => {
    // Chanage state
    state.sysDetail = data
  },
  getDatabaseList: (state, databaseList) => {
    // Chanage state
    state.databaseList = databaseList
  }
}
// 异步提交更新数据的方法
const actions = {
  getList ({ commit }, parma) {
    // get api data
    getSysList(parma).then((data) => {
      commit('getList', data)
    })
  },
  getSysDetail ({ commit }, parma) {
    // get api data
    getSysDetail(parma).then((data) => {
      commit('getSysDetail', data)
    })
  },
  getDatabaseList ({ commit }, info) {
    // get api data
    console.log(info.type)
    if (info.type === 'Oracle') {
      commit('getDatabaseList', databaseData)
    }
    if (info.type === 'Sqlserver') {
      commit('getDatabaseList', databaseData1)
    }
    if (info.type === 'Mysql') {
      commit('getDatabaseList', databaseData2)
    }
  }
}
// 相当于state的计算属性
const getters = {
  list: state => state.list,
  databaseList: state => state.databaseList
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
