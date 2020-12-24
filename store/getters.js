const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  menus: state => state.user.menus,
  permission_routes: state => state.permission.routes,
  title: state => state.settings.title,
  showSettings: state => state.settings.showSettings,
  errorLogs: state => state.errorLog.logs,
  warnList: state => state.socket.warnList,
  themeGroup: state => state.settings.themeGroup,
  topological: state => state.topo.topological,
  imageTypes: state => state.topo.imageTypes
}
export default getters
