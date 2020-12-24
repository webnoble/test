import { constantRoutes } from '@/router';

/**
 * 后台查询回来的菜单
 * @param menus
 */
export function filterAsyncRoutes (menus) {
  // console.log(menus);
  for (let i = 0; i < menus.length; i++) {
    const component = menus[i].component;
    if (!component) {
      continue;
    }
    menus[i].component = (resolve) => {
      let componentPath = '';
      if (component === 'Layout') {
        require(['@/layout'], resolve);
        return;
      } else {
        componentPath = component;
      }
      require([`@/views${componentPath}`], resolve);
    };

    if (menus[i].children && menus[i].children.length) {
      filterAsyncRoutes(menus[i].children);
    }
  }
}

const state = {
  routes: [],
  addRoutes: []
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  }
};

const actions = {
  generateRoutes ({ commit }, menus) {
    return new Promise(resolve => {
      filterAsyncRoutes(menus);
      commit('SET_ROUTES', menus);
      resolve(menus);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
