<!--
 * @Author: your name
 * @Date: 2020-05-28 15:57:00
 * @LastEditTime: 2020-05-28 19:32:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \monitor\src\views\monitor\index.vue
-->
<template>
  <div class="monitor">
    <div class="bar">
      <monitor-bar />
    </div>
    <div class="main-content">
      <div :is="componentName" />
    </div>
  </div>
</template>
<script>
import MonitorBar from '@/components/MonitorBar';
import './detail/style.scss';
function changeStr (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
const requireComponent = require.context('./', true, /\.vue$/)
const obj = { 'MonitorBar': MonitorBar }
requireComponent.keys().forEach(fileName => {
  if (fileName.indexOf('topo') !== -1) {
    return;
  }
  const config = requireComponent(fileName)
  const componentName = changeStr(
    fileName.replace(/^\.\//, '').replace(/\.\w+$/, '').replace('detail/', '')
  )
  obj[componentName] = config.default || config
})
// console.log(obj)
export default {
  components: obj,
  data () {
    return {
      currentRoute: this.$route.path,
      componentName: this.$route.path.replace('/', '').firstUpperCase()
    }
  }
}
</script>
<style lang="scss">
.monitor {
  font-size: 0;
  background-color: #eff0f5;
  width: 100%;
  height: 100%;
  .bar {
    width: 120px;
    display: inline-block;
    height: 100%;
    vertical-align: top;
    font-size: 14px;
  }
  .main-content {
    display: inline-block;
    position: relative;
    width: calc(100% - 120px);
    height: calc(100vh - 64px);
    overflow: auto;
    vertical-align: top;
    font-size: 14px;
    padding: 10px;
    // box-sizing: border-box;
    background-color: #eff0f5;
    .tab_body {
      padding: 17px 12px;
      // padding-bottom: 0;
      background-color: #fff;
      // .pdNone {
      //   padding: 0 !important;
      // }
    }
  }
}
</style>
