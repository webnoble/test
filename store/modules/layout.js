/*
 *                        .::::.
 *                      .::::::::.
 *                     :::::::::::
 *                  ..:::::::::::'
 *               '::::::::::::'
 *                 .::::::::::
 *            '::::::::::::::..
 *                 ..::::::::::::.
 *               ``::::::::::::::::
 *                ::::``:::::::::'        .:::.
 *               ::::'   ':::::'       .::::::::.
 *             .::::'      ::::     .:::::::'::::.
 *            .:::'       :::::  .:::::::::' ':::::.
 *           .::'        :::::.:::::::::'      ':::::.
 *          .::'         ::::::::::::::'         ``::::.
 *      ...:::           ::::::::::::'              ``::.
 *     ````':.          ':::::::::'                  ::::..
 *                        '.:::::'                    ':'````..
 */
import { getAllDropDownBox } from '@/api/common';
function mapToArray (mapObj) {
  if (!mapObj) return [];
  const keys = Object.keys(mapObj);
  const arr = [];
  keys.forEach((item) => {
    arr.push({
      value: item,
      text: mapObj[item]
    })
  })
  return arr;
}
const state = {
  allDropDownBox: [],
  status: [
    {
      key: 'OK',
      label: '正常',
      color: '#15B000',
      className: 'iconicon_successfully',
      iconColor: '#15B000'
    },
    {
      key: 'ERROR',
      label: '异常',
      color: '#f00',
      className: 'iconicon_error-triangle',
      iconColor: '#f00'
    },
    {
      key: 'timeOut',
      label: '断连',
      color: '#999999',
      className: 'iconicon_power_failure',
      iconColor: '#626262'
    }
  ],
  processStatus: [
    {
      key: 'SUCCESS',
      label: '已完结'
    },
    {
      key: 'REJECT',
      label: '已拒绝'
    },
    {
      key: 'RUNNING',
      label: '进行中'
    }
  ]
  // area: [
  //   {
  //     value: '1',
  //     text: '锦江监狱'
  //   },
  //   {
  //     value: '2',
  //     text: '邑州监狱'
  //   },
  //   {
  //     value: '3',
  //     text: '川西监狱'
  //   },
  //   {
  //     value: '4',
  //     text: '川北监狱'
  //   },
  //   {
  //     value: '5',
  //     text: '乐山监狱'
  //   }
  // ],
  // deviceType2: [
  //   {
  //     value: '1',
  //     text: '门禁'
  //   },
  //   {
  //     value: '2',
  //     text: '报警'
  //   },
  //   {
  //     value: '3',
  //     text: '周边电网'
  //   },
  //   {
  //     value: '4',
  //     text: '广播'
  //   }, {
  //     value: '5',
  //     text: '监控对讲'
  //   }, {
  //     value: '6',
  //     text: '摄像头'
  //   }
  // ],
  // runState: [
  //   {
  //     value: '1',
  //     text: '正常'
  //   },
  //   {
  //     value: '2',
  //     text: '异常'
  //   },
  //   {
  //     value: '3',
  //     text: '维护中'
  //   }
  // ],
  // runState2: [
  //   {
  //     value: '1',
  //     text: '正常'
  //   },
  //   {
  //     value: '2',
  //     text: '异常'
  //   },
  //   {
  //     value: '3',
  //     text: '断连'
  //   }
  // ],
  // state: [
  //   {
  //     value: '1',
  //     text: '正常'
  //   },
  //   {
  //     value: '2',
  //     text: '异常'
  //   }
  // ]
  // server: [
  //   { text: '锦江一体化平台数据服务器', value: '锦江一体化平台数据服务器' },
  //   { text: '邑州体罚系统运行服务器', value: '邑州体罚系统运行服务器' },
  //   { text: '乐山应急指挥平台数据服务器', value: '乐山应急指挥平台数据服务器' },
  //   { text: '川北OA系统运行服务器', value: '川北OA系统运行服务器' },
  //   { text: '川西数据备份系统服务器', value: '川西数据备份系统服务器' }
  // ]
}

const mutations = {
  getAllDropDownBox: (state, data) => {
    state.allDropDownBox = data
  }
  // getStatus: (state, list) => {
  //   // Chanage state
  //   state.status = list
  // }
  // getArea: (state, list) => {
  //   // Chanage state
  //   state.area = list
  // },
  // getDeviceType: (state, list) => {
  //   state.deviceType2 = list
  // },
  // getRunState: (state, list) => {
  //   state.runState = list
  // },
  // getRunState2: (state, list) => {
  //   state.runState2 = list
  // },
  // getState: (state, list) => {
  //   state.state = list;
  // }

}

const actions = {
  getAllDropDownBox ({ commit }) {
    return new Promise((resolve, reject) => {
      getAllDropDownBox().then(data => {
        commit('getAllDropDownBox', data);
        resolve()
      })
    })
  },
  setAllDropDownBox ({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      commit('getAllDropDownBox', data);
      resolve();
    })
  }
  // getStatus ({ commit }) {
  //   // get api data
  //   commit('getStatus')
  // }
  // getArea ({ commit }) {
  //   // get api data
  //   commit('getArea')
  // },
  // getDeviceType ({ commit }) {
  //   // get api data
  //   commit('getDeviceType')
  // },
  // getRunState ({ commit }) {
  //   // get api data
  //   commit('getRunState')
  // },
  // getRunState2 ({ commit }) {
  //   // get api data
  //   commit('getRunState2')
  // },
  // getState ({ commit }) {
  //   // get api data
  //   commit('getState')
  // }
}
const getters = {
  // area: state => state.area,
  // deviceType2: state => state.deviceType2,
  // runState2: state => state.runState2,
  status: state => state.status,
  processStatus: state => state.processStatus,
  area: (state) => {
    const areaMap = state.allDropDownBox.areaIdAndName;
    const arr = [];
    areaMap.forEach((item) => {
      // 暂时过滤
      if (item.areaId.length === 4) {
        arr.push({
          value: item.areaId,
          text: item.areaName
        })
      }
    })
    return arr
  },
  // 所有网关
  allGatewayIdAndName: (state) => {
    return mapToArray(state.allDropDownBox.gatewayIdAndName)
  },
  // 获取设备分组下得所有网关
  allGateway: (state) => (id) => {
    const deviceArr = state.allDropDownBox.allMeTypeUnderGroup[id];
    const allGateway = [];
    deviceArr.forEach((deviceId) => {
      const gatewayArr = state.allDropDownBox.meTypeIdAndGatewayIdAndMeId[deviceId];
      if (gatewayArr) {
        Object.keys(gatewayArr).forEach((item) => {
          const index = allGateway.findIndex((i) => {
            return i.value === item
          })
          if (index === -1) {
            allGateway.push({
              value: item,
              text: state.allDropDownBox.gatewayIdAndName[item]
            })
          }
        })
      }
    })
    return allGateway;
  },
  getarea: (state) => (gatewayId) => {
    const areaId = state.allDropDownBox.gatewayIdAndAreaIdCache[gatewayId];
    // console.log(areaId);
    const obj = state.allDropDownBox.areaIdAndName.find((item) => {
      return item.areaId === areaId
    })
    // console.log(obj);
    return obj
  },
  // 通过后台传入的的位置ID获取对应的位置Name
  getAreaName: (state) => (gatewayId) => {
    if (!gatewayId) return [];
    return state.allDropDownBox.allAreaIdAndName[gatewayId]
  },
  // 通过后台传入的的类型ID获取对应的类型名称
  getTypeName: (state) => (id) => {
    if (!id) return [];
    return state.allDropDownBox.allMeTypeAndName[id]
  },
  // 通过后台传入的的文件大小返回对应的转换大小
  getSize: () => (limit) => {
    limit = Number(limit) || 0;
    let size = '';
    if (limit <= 0) {
      return 0;
    } else if (limit < 0.1 * 1024) {
      size = limit.toFixed(2) + 'B';
    } else if (limit < 0.1 * 1024 * 1024) {
      size = (limit / 1024).toFixed(2) + 'K';
    } else if (limit < 0.1 * 1024 * 1024 * 1024) {
      size = (limit / (1024 * 1024)).toFixed(2) + 'M';
    } else {
      size = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'G';
    }

    var sizeStr = size + '';
    var index = sizeStr.indexOf('.');
    var dou = sizeStr.substr(index + 1, 2);
    if (dou === '00') {
      return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
    }
    return size;
  },
  // 通过后台传入的毫秒返回对应的时间
  getTime: () => (limit) => {
    let time = '';
    if (limit <= 0) {
      return 0;
    } else if (limit < 1000 * 60) {
      time = Math.ceil((limit / 1000)) + '秒';
    } else if (limit < 1000 * 60 * 60) {
      time = Math.ceil((limit / 1000 / 60)) + '分';
    } else if (limit < 1000 * 60 * 60 * 24) {
      time = Math.ceil((limit / 1000 / 60 / 60)) + '小时';
    } else if (limit < 1000 * 60 * 60 * 24 * 365) {
      time = Math.ceil((limit / 1000 / 60 / 60 / 24)) + '天';
    } else {
      time = Math.ceil((limit / 1000 / 60 / 60 / 24 / 365)) + '年';
    }

    var timeStr = time + '';
    var index = timeStr.indexOf('.');
    var dou = timeStr.substr(index + 1, 2);
    if (dou === '00') {
      return timeStr.substring(0, index) + timeStr.substr(index + 3, 2);
    }
    return time;
  },
  // 判断后台数据是否精确为小数
  getNumber: () => (num) => {
    let newNum = 0;
    // 判断是否为数字类型('1'默认让其为数字类型)
    if (num === '' || num === null || typeof num === 'object' || isNaN(num)) {
      newNum = num;
      return newNum
    }
    newNum = num + '';
    if (newNum.indexOf('.') === -1) {
      return newNum;
    } else {
      const count = newNum.length - newNum.indexOf('.') + 1;
      if (count <= 2) {
        newNum = (newNum - 0).toFixed(count)
      } else {
        newNum = (newNum - 0).toFixed(2)
      }
    }
    return newNum;
  },
  // 设备类型
  deviceType: (state) => (id) => {
    const deviceArr = state.allDropDownBox.allMeTypeUnderGroup[id];
    const deviceObjArr = [];
    if (!deviceArr) return [];
    deviceArr.forEach((item) => {
      deviceObjArr.push({
        value: item,
        text: state.allDropDownBox.allMeTypeAndName[item]
      })
    })
    return deviceObjArr
  },
  // 网关
  gatewayIdAndName: (state) => (deviceId) => {
    const gatewayArr = state.allDropDownBox.meTypeIdAndGatewayIdAndMeId[deviceId];
    const gatewayObjArr = [];
    if (!gatewayArr) return [];
    Object.keys(gatewayArr).forEach((item) => {
      gatewayObjArr.push({
        value: item,
        text: state.allDropDownBox.gatewayIdAndName[item]
      })
    })
    return gatewayObjArr
  },
  cmMeIdAndMeNameCache: (state) => {
    return mapToArray(state.allDropDownBox.cmMeIdAndMeNameCache)
  },
  // 设备
  gatewayIdAndMeIdAndName: (state) => (deviceId, gatewayId) => {
    const gatewayArr = state.allDropDownBox.meTypeIdAndGatewayIdAndMeId[deviceId];
    if (!gatewayArr) return [];
    const deviceArr = gatewayArr[gatewayId];
    const deviceObjArr = [];
    if (!deviceArr) return [];
    deviceArr.forEach((item) => {
      deviceObjArr.push({
        value: item,
        text: state.allDropDownBox.meIdAndAliasCache[item]
      })
    })
    return deviceObjArr
  },
  serverObj: (state) => (meId) => {
    const middlewareServer = state.allDropDownBox.middlewareServer;
    const serverObj = {};
    Object.keys(middlewareServer).forEach((item) => {
      if (middlewareServer[item].includes(meId)) {
        serverObj.linkId = item;
        serverObj.linkName = state.allDropDownBox.cmMeIdAndMeNameCache[item]
      }
    })
    return serverObj;
  },
  // 服务器
  serverList: (state) => (meId) => {
    return state.allDropDownBox.cmMeIdAndMeNameCache[meId]
  },
  // 服务器过滤
  middleServerList: (state) => {
    const serverList = [];
    Object.keys(state.allDropDownBox.middlewareServer).forEach((item) => {
      serverList.push({
        value: item,
        text: state.allDropDownBox.cmMeIdAndMeNameCache[item] ? state.allDropDownBox.cmMeIdAndMeNameCache[item] : item
      })
    })
    return serverList;
  },
  // 告警级别
  alarmLevelAndName: (state) => {
    return mapToArray(state.allDropDownBox.alarmLevelAndName)
  },
  AllMeIdAndModel: (state) => {
    return mapToArray(state.allDropDownBox.AllMeIdAndModel)
  },
  // 告警类别
  meGroupAndName: (state) => {
    return mapToArray(state.allDropDownBox.meGroupAndName)
  },
  // 告警状态
  warnState: (state) => {
    return mapToArray(state.allDropDownBox.alarmStateAndName)
  },
  // 告警处理状态
  alarmDealStateAndName: (state) => {
    return mapToArray(state.allDropDownBox.alarmDealStateAndName)
  },
  // 运行状态
  runningState: (state) => {
    return mapToArray(state.allDropDownBox.runningState)
  },
  // 采集网关
  collectorSource: (state) => {
    return mapToArray(state.allDropDownBox.collectorSource)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
