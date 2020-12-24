<template>
  <div class="sysSetting">
    <div class="bar">
      <system-bar />
    </div>
    <div class="content">
      <div :is="componentName" />
    </div>
  </div>
</template>
<script>
import SystemBar from '@/components/SystemBar';
import LogManage from './sysManage/LogManage';
import VersionManage from './sysManage/VersionManage';
import SysInstall from './sysManage/SysInstall';
import Gateway from './deviceLayout/gateway';
import CloudManage from './deviceLayout/cloudManage';
import ItManage from './deviceLayout/itManage';
import MiddleManage from './deviceLayout/middleManage';
import Safety from './deviceLayout/safety';
import SoftManage from './deviceLayout/softManage';
import DatabaseManage from './deviceLayout/databaseManage';
import ReportVoice from './alarm/reportVoice';
import ReportRule from './alarm/reportRule';
import Performance from './performance/performance';
export default {
  components: {
    SystemBar,
    VersionManage,
    SysInstall,
    LogManage,
    Gateway,
    CloudManage,
    ItManage,
    Safety,
    SoftManage,
    DatabaseManage,
    ReportVoice,
    ReportRule,
    Performance,
    MiddleManage
  },
  data () {
    return {
      currentRoute: this.$route.path,
      componentName: this.$route.path.replace('/', '').firstUpperCase()
    }
  }
}
</script>
<style lang="scss">
.sysSetting {
  font-size: 0;
  min-height: calc(100vh - 64px);
  .bar {
    width: 200px;
    display: inline-block;
    vertical-align: top;
  }
  .content {
    display: inline-block;
    width: calc(100% - 200px);
    height: calc(100vh - 64px);
    overflow: auto;
    // background-color: #fff;
    // min-height: calc(100vh - 64px);
    vertical-align: top;
    font-size: 20px;
    padding: 10px;
    background-color: #eff0f5;
    .tab_body {
      padding: 17px 12px;
      background-color: #fff;
      .pdNone {
        padding: 0 !important;
      }
    }
  }
}
</style>
