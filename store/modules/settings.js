import defaultSettings from '@/settings'
import themeStyle from '@/styles/variables.scss.js'
const { showSettings, fixedHeader, sidebarLogo, title, tagsView, theme } = defaultSettings
const state = {
  theme: theme,
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  tagsView,
  title,
  themeGroup: themeStyle[theme === '1' ? 'dark' : 'light']
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
      if (key === 'theme') {
        state.themeGroup = themeStyle[value === '1' ? 'dark' : 'light']
      }
    }
  }
}

const actions = {
  changeSetting ({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

