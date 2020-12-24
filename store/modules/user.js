import { login, logout, getInfo, permitThrough } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';
import { resetRouter } from '@/router';

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  menus: []
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus;
  }
};

const actions = {
  // user login
  login ({ commit }) {
    return new Promise((resolve, reject) => {
      login().then(token => {
        commit('SET_TOKEN', token);
        setToken(token);
        resolve(token);
      }).catch(error => {
        reject(error);
      });
    });
  },

  permitThrough ({ commit }) {
    return new Promise((resolve, reject) => {
      permitThrough().then(token => {
        commit('SET_TOKEN', token);
        setToken(token);
        resolve(token);
      }).catch(error => {
        reject(error);
      });
    });
  },

  // get user info
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(data => {
        if (!data) {
          reject('Verification failed, please Login again.');
        }

        const { menus, name, avatar, introduction } = data;

        commit('SET_MENUS', menus);
        commit('SET_NAME', name);
        commit('SET_AVATAR', avatar);
        commit('SET_INTRODUCTION', introduction);
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  },

  setInfo ({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit('SET_MENUS', data.menus);
      commit('SET_NAME', data.name);
      commit('SET_AVATAR', data.headPic);
      commit('SET_INTRODUCTION', data.introduction);
      resolve();
    });
  },

  // user logout
  logout ({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then((data) => {
        commit('SET_TOKEN', '');
        commit('SET_MENUS', []);
        removeToken();
        resetRouter();
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  },

  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '');
      commit('SET_MENUS', []);
      removeToken();
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
