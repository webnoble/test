import { getImages } from '@/utils/parse';
import { getImageTypeList } from '@/api/topo';

const state = {
  topological: {},
  imageTypes: {}
}

const mutations = {
  SET_TOPO: (state, data) => {
    state.topological = data;
  },
  SET_Image_TYPES: (state, data) => {
    state.imageTypes = data;
  }
}

const actions = {
  setTopo ({ commit }, data) {
    commit('SET_TOPO', data)
  },
  setImageTypes ({ commit }, data) {
    commit('SET_Image_TYPES', data)
  },
  getImages ({ commit }) {
    getImageTypeList().then((res) => {
      const temp = getImages(res);
      commit('SET_Image_TYPES', temp);
    });
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

