const state = {
  warnList: []
};

const mutations = {
  CLEAR_LIST: (state) => {
    state.warnList = [];
  }
};

const actions = {
  clearList ({ commit }) {
    commit('CLEAR_LIST');
  },
  subscribe ({ commit }) {

  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
