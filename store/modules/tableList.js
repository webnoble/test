const state = {
  dataObj: {
    data: {},
    currentPage: 1,
    total: 10
  }
}

const mutations = {

  getArea: (state, list) => {
    // Chanage state
    state.area = list
  },
  getDeviceType: (state, list) => {
    state.deviceType = list
  }

}

const actions = {
  getList ({ commit }, data) {
    // get api data
    commit('getList')
  },
  updateData ({ commit }) {
    // get api data
    commit('getDeviceType')
  }
}
const getters = {
  area: state => state.area,
  deviceType: state => state.deviceType
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
