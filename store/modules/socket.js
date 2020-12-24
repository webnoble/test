/*
 * @Author: your name
 * @Date: 2020-05-22 15:00:41
 * @LastEditTime: 2020-05-28 14:16:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hy-cli\module\src\store\socket.js
 */

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
let websocketUrl = '';
if (process.env.VUE_APP_WEBSOCKET) {
  websocketUrl = process.env.VUE_APP_WEBSOCKET;
} else {
  websocketUrl = 'http://192.168.2.130:35801/ws'
}
const state = {
  stompClient: '',
  connectState: false,
  subscribeList: {},
  waitList: []
}
const getters = {
  subscribeList: state => state.subscribeList
}
const mutations = {
  connect: (state, data) => {
    state.stompClient = data;
    state.connectState = true;
  },
  waitList: (state, data) => {
    state.waitList.push(data)
  },
  clearList: (state, dataName) => {
    state.subscribeList[dataName] = [];
    const obj = {};
    obj[dataName] = state.subscribeList[dataName];
    const someObject = Object.assign({}, state.subscribeList, obj)
    state.subscribeList = someObject;
  },
  disconnect: (state) => {
    state.stompClient.disconnect();
  },
  subscribe: (state, data) => {
    if (!state.subscribeList[data.data.dataName]) {
      state.subscribeList[data.data.dataName] = [];
    }
    state.subscribeList[data.data.dataName].push(data.message.body);
    const obj = {};
    obj[data.data.dataName] = state.subscribeList[data.data.dataName];
    const someObject = Object.assign({}, state.subscribeList, obj)
    state.subscribeList = someObject;
  },
  sendMessage: (state, data) => {
    state.stompClient.send(data.congfigUrl, {}, JSON.stringify(data.msg))
  }
}

const actions = {
  connect ({ commit }) {
    const socket = new SockJS(websocketUrl);
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      commit('connect', stompClient);
      this.state.socket.waitList.forEach((item) => {
        this.dispatch('socket/subscribe', item)
      })
    })
  },
  disconnect () {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
  },
  clearList ({ commit }, dataName) {
    commit('clearList', dataName)
  },
  subscribe ({ commit, rootGetters }, data) {
    const areaList = rootGetters['layout/area'];
    let isCommit = false;
    if (this.state.socket.connectState) {
      // setInterval(() => {
      //   const message = { body: { 'meId': 'Server_192_168_2_39', 'ackTime': null, 'esn': null, 'ackUserId': null, 'dealState': 1, 'alarmTime': 1597386665, 'alarmName': '测试告警', 'ackUser': null, 'audioFilePath': '根据附件规则查询附件位置', 'alarmDesc': null, 'areaId': '5100', 'alarmState': 1, 'redefineLevel': null, 'probableCause': '为测试而生', 'meTypeGroupId': 1005, 'isFilter': 1, 'location': '根据设备ID查询设备的位置', 'alarmLevel': 4, 'id': 'Server_192_168_2_3938691598504220000', 'sn': 159774256467391, 'categoryId': '30000001', 'clearTime': '' } }
      //   if (parseInt(Math.random() * 10) % 2) {
      //     message.body.alarmLevel = 0;
      //     message.body.categoryId = '';
      //     message.body.clearTime = Number(new Date());
      //   }
      //   message.body = JSON.stringify(message.body);
      //   const data = JSON.parse(message.body);
      //   areaList.forEach((item) => {
      //     if (item.value == data.areaId) {
      //       isCommit = true;
      //     }
      //   })
      //   commit('subscribe', { data, message })
      // }, 10000)

      this.state.socket.stompClient.subscribe(data.subscribeUrl, (message) => {
        const obj = JSON.parse(message.body);
        areaList.forEach((item) => {
          if (item.value == obj.areaId) {
            isCommit = true;
          }
        })
        if (isCommit) {
          commit('subscribe', { data, message })
        }
      })

    } else {
      commit('waitList', data)
    }
  },
  sendMessage ({ commit }, data) {
    commit('sendMessage', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
