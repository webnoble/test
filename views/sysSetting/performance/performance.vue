<template>
  <div class="body-content">
    <HeadMenu title="性能门限设置" />
    <el-tabs v-model="activeName" type="card" class="tabs-body" @tab-click="handleClick">
      <HeadMenu class="tabs-right-head" :btnarr="btnarr" @getEvent="judgeEvent" />
      <el-tab-pane label="服务器" name="1006">
        <Server ref="server" :table-data="tableList.serverData" :disabled-status="disabledStatus" />
      </el-tab-pane>
      <el-tab-pane label="交换机" name="1002">
        <Interchanger ref="switch" :table-data="tableList.switchData" :disabled-status="disabledStatus" />
      </el-tab-pane>
      <!-- <el-tab-pane label="防火墙" name="3">防火墙</el-tab-pane> -->
      <!-- <el-tab-pane label="存储" name="4">存储</el-tab-pane> -->
      <el-tab-pane label="中间件" name="1003">
        <Middle ref="middle" :table-data="tableList.middleData" :disabled-status="disabledStatus" />
      </el-tab-pane>
      <el-tab-pane label="应用软件" name="1004">
        <Soft ref="soft" :table-data="tableList.softData" :disabled-status="disabledStatus" />
      </el-tab-pane>
      <el-tab-pane label="操作系统" name="1001">
        <System ref="system" :table-data="tableList.systemData" :disabled-status="disabledStatus" />
      </el-tab-pane>
      <el-tab-pane label="数据库" name="1005">
        <Database ref="database" :table-data="tableList.databaseData" :disabled-status="disabledStatus" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getPerformance, editPerformance } from '@/api/performance';
import Server from './tabs/server'
import Interchanger from './tabs/interchanger'
import Database from './tabs/database'
import Middle from './tabs/middle'
import System from './tabs/system'
import Soft from './tabs/soft'
export default {
  components: { Server, Interchanger, Database, Middle, System, Soft },
  data () {
    return {
      // 列表查询
      activeName: '1006',
      btnarr: [{ id: '1', value: '修改门限', eventName: 'editHandle', type: 'success' }],
      // 是否禁止输入
      disabledStatus: true,
      // 返回的列表数据集合
      tableList: {
        serverData: [],
        switchData: [],
        databaseData: [],
        middleData: [],
        systemData: [],
        softData: []
      },
      // 请求列表ID集合
      requestList: [1002, 1003, 1005, 1006, 1001, 1004],
      // 修改数据集合
      dataCount: []
    }
  },
  created () {
    this.getList();
  },
  methods: {
    getList () {
      this.requestList.forEach(item => {
        getPerformance(item).then(res => {
          if (item === 1006) {
            this.tableList.serverData = res;
          } else if (item === 1002) {
            this.tableList.switchData = res;
          } else if (item === 1003) {
            this.tableList.middleData = res;
          } else if (item === 1005) {
            this.tableList.databaseData = res;
          } else if (item === 1001) {
            this.tableList.systemData = res;
          } else if (item === 1004) {
            this.tableList.softData = res;
          }
        })
      })
    },
    judgeEvent (event) {
      this.disabledStatus = !this.disabledStatus;
      if (this.disabledStatus) {
        this.btnarr[0].value = '修改门限';
        // console.log(this.$refs.server.serverData);
        // console.log(this.$refs.switch.switchData);
        // console.log(this.$refs.database.databaseData);
        this.dataCount = this.dataCount.concat(this.$refs.server.serverData).concat(this.$refs.switch.switchData).concat(this.$refs.database.databaseData).concat(this.$refs.middle.middleData).concat(this.$refs.system.systemData).concat(this.$refs.soft.softData);
        // console.log(this.dataCount);
        editPerformance(this.dataCount).then(res => {
          this.getList();
          this.$message({
            message: '修改门限成功',
            type: 'success'
          });
        })
      } else {
        this.btnarr[0].value = '保存';
      }
    },
    handleClick () {
    }
  }
}
</script>

<style lang="scss" scoped>
// .tab_body {
//   padding: 17px 12px;
//   background-color: #fff;
// }
.tabs-body {
  position: relative;
  padding: 18px 10px;
  background-color: #fff;
  >>> .el-tabs__content {
    position: static;
  }
  .tabs-right-head {
    position: absolute;
    top: 6px;
    right: 10px;
    z-index: 99;
  }
}
</style>
