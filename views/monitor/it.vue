<template>
  <div>
    <div class="body-content">
      <HeadMenu
        title="IT设备监控列表"
        :search="true"
        :btnarr="btnarr"
        @getValue="searchKey"
        @getSelectId="selectIdHandle"
        @getEvent="judgeEvent"
      />
    </div>
    <div class="tab_body">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="服务器" name="服务器" :lazy="true">
          <v-table
            :field-arr="fieldArr"
            :table-setting.sync="serverSetting"
            class="pdNone"
            @edit="edit"
          />
        </el-tab-pane>
        <el-tab-pane label="交换机" name="交换机" :lazy="true">
          <v-table
            :field-arr="switchesFieldArr"
            :table-setting.sync="switchSetting"
            class="pdNone"
            @edit="edit"
          />
        </el-tab-pane>
        <!-- <el-tab-pane label="防火墙" name="防火墙">
        </el-tab-pane>-->
        <!-- <el-tab-pane label="存储" name="存储">
          <v-table :field-arr="storageFieldArr" :table-setting.sync="storageSetting" class="pdNone" @edit="edit" />
        </el-tab-pane>-->
      </el-tabs>
      <!-- <v-table v-show="activeName === '防火墙'" :field-arr="firewallFieldArr" :table-setting.sync="firewallSetting" class="pdNone" @edit="edit" /> -->
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      serverSetting: {
        pagination: {
          show: true,
          rowsPerPage: [10, 20, 30]
        },
        param: {
          page: 1,
          rows: 10,
          sord: 'desc',
          _search: false,
          filters: {
            groupOp: 'AND',
            rules: []
          }
        },
        apiUrl: 'server/list',
        socket: {
          url: 'http://localhost:9999/echo',
          subscribe: 'data',
          tagName: 'id'
        },
        isPoll: true,
        pollTime: 300000
      },
      switchSetting: {
        pagination: {
          show: true,
          rowsPerPage: [10, 20, 30]
        },
        param: {
          page: 1,
          rows: 10,
          sord: 'desc',
          _search: false,
          filters: {
            groupOp: 'AND',
            rules: []
          }
        },
        apiUrl: 'switch/list',
        socket: {
          url: 'http://localhost:9999/echo',
          subscribe: 'data',
          tagName: 'id'
        },
        isPoll: true,
        pollTime: 300000
      },
      firewallSetting: {
        pagination: {
          show: true,
          rowsPerPage: [10, 20, 30]
        },
        param: {
          page: 1,
          rows: 10,
          sord: 'desc',
          _search: false,
          filters: {
            groupOp: 'AND',
            rules: []
          }
        },
        apiUrl: 'firewall/list',
        socket: {
          url: 'http://localhost:9999/echo',
          subscribe: 'data',
          tagName: 'id'
        },
        isPoll: true,
        pollTime: 300000
      },
      storageSetting: {
        pagination: {
          show: true,
          rowsPerPage: [10, 20, 30]
        },
        param: {
          page: 1,
          rows: 10,
          sord: 'desc',
          _search: false,
          filters: {
            groupOp: 'AND',
            rules: []
          }
        },
        apiUrl: 'interchanger/list',
        socket: {
          url: 'http://localhost:9999/echo',
          subscribe: 'data',
          tagName: 'id'
        },
        isPoll: true,
        pollTime: 300000
      },
      activeName: this.$route.query.type || '服务器',
      btnarr: [{ id: '1', value: ' 管理设备', eventName: 'manageHandle', type: 'info' }],
      options: [{ selectId: '1', label: '锦江监狱' }, { selectId: '2', label: '邑州监狱' }, { selectId: '3', label: '川西监狱' }, { selectId: '4', label: '川北监狱' }, { selectId: '5', label: '乐山监狱' }]
    }
  },
  computed: {
    runState: function () {
      return this.$store.getters['layout/runningState'];
    },
    area: function () {
      return this.$store.getters['layout/area'];
    },
    getStatus () {
      return this.$store.getters['layout/status']
    },
    fieldArr: function () {
      return [
        {
          label: '服务器名称',
          key: 'meName',
          width: '220'
        }, {
          label: '运行状态',
          key: 'runState',
          filters: this.runState,
          formatter: this.getStatus
        }, {
          label: 'IP地址',
          key: 'ip'
        }, {
          label: '硬盘状态',
          key: 'diskState',
          filters: this.runState,
          formatter: this.runState
        }, {
          label: '风扇状态',
          key: 'fanState',
          filters: this.runState,
          formatter: this.runState
        }, {
          label: '内存状态',
          key: 'memoryState',
          filters: this.runState,
          formatter: this.runState
        }, {
          label: '电源状态',
          key: 'batteryState',
          filters: this.runState,
          formatter: this.runState
        }, {
          label: 'cpu温度',
          key: 'cpuTemperatureState',
          filters: this.runState,
          formatter: this.runState
        }, {
          label: 'cpu负载',
          key: 'cpuState',
          filters: this.runState,
          formatter: this.runState
        }, {
          label: '所在区域',
          key: 'areaId',
          filters: this.area,
          formatter: this.area
        }, {
          label: '所在位置',
          key: 'location'
        }, {
          label: '操作',
          key: 'operation',
          width: '100px',
          buttons: [{
            label: '查看详情',
            type: 'url',
            path: '/it_detail?type=服务器',
            query: ['meId', 'meName'],
            colorType: 'tableBlue'
          }]
        }
      ]
    },
    switchesFieldArr: function () {
      return [
        {
          label: '交换机名称',
          key: 'name',
          width: '220'
        }, {
          label: '运行状态',
          key: 'runState',
          formatter: this.getStatus,
          filters: this.runState
        }, {
          label: '端口数量',
          key: 'portsNumber'
        }, {
          label: 'cpu负载',
          key: 'currentCpuLoad',
          formatter: this.runState,
          filters: this.runState
        }, {
          label: '内存利用率',
          key: 'currentMemoryUsage',
          formatter: this.runState,
          filters: this.runState
        }, {
          label: '所在区域',
          key: 'area',
          formatter: this.area,
          filters: this.area
        }, {
          label: '所在位置',
          key: 'location',
          width: '140'
        }, {
          label: '操作',
          key: 'operation',
          width: '200px',
          buttons: [{
            label: '查看详情',
            type: 'url',
            path: '/it_detail?type=交换机',
            query: ['id', 'name'],
            colorType: 'tableBlue'
          }]
        }
      ]
    },
    firewallFieldArr: function () {
      return [
        {
          label: '防火墙主机IP',
          key: 'ip',
          formatter: '192.168.34.(ip)',
          width: '160'
        }, {
          label: '运行状态',
          key: 'runState',
          formatter: [{
            key: 1,
            label: '正常',
            color: '#15B000',
            className: 'iconicon_successfully',
            iconColor: '#15B000'
          }, {
            key: 2,
            label: '异常',
            color: '#f00',
            className: 'iconicon_error-triangle',
            iconColor: '#f00'
          }, {
            key: 3,
            label: '断连',
            color: '#999999',
            className: 'iconicon_power_failure',
            iconColor: '#626262'
          }],
          filters: 'layout/runState2'
        }, {
          label: '硬盘状态',
          key: 'diskState',
          formatter: '(diskState)TB'
        }, {
          label: 'ping服务器状态',
          key: 'pingState',
          formatter: [{ label: '正常', key: 1 }, { label: '异常', key: 2, color: '#f00' }]
        }, {
          label: '内存使用',
          key: 'memory',
          formatter: '(memory)G/1TB',
          width: '120'
        }, {
          label: '内存利用率',
          key: 'memoryPrecent'
        }, {
          label: 'cpu使用率',
          key: 'cpuPrecent'
        }, {
          label: '会话状态',
          key: 'sessionState',
          formatter: [{ label: '正常', key: 1 }, { label: '异常', key: 2, color: '#f00' }]
        }, {
          label: '接口状态',
          key: 'apiState',
          formatter: [{ label: '正常', key: 1 }, { label: '异常', key: 2, color: '#f00' }]
        }, {
          label: '流量统计',
          key: 'flow',
          formatter: '(flow)m/s'
        }, {
          label: '数据包状态',
          key: 'dataState',
          formatter: [{ label: '正常', key: 1 }, { label: '异常', key: 2, color: '#f00' }]
        }, {
          label: '操作',
          key: 'operation',
          width: '200px',
          buttons: [{
            label: '查看详情',
            type: 'url',
            path: '/it_detail?type=服务器',
            query: ['id'],
            colorType: 'tableBlue'
          }]
        }
      ]
    },
    storageFieldArr: function () {
      return [
        {
          label: '存储标识',
          key: 'name'
        }, {
          label: '运行状态',
          key: 'runstate',
          formatter: [{
            key: 1,
            label: '正常',
            color: '#15B000',
            className: 'iconicon_successfully',
            iconColor: '#15B000'
          }, {
            key: 2,
            label: '异常',
            color: '#f00',
            className: 'iconicon_error-triangle',
            iconColor: '#f00'
          }, {
            key: 3,
            label: '断连',
            color: '#999999',
            className: 'iconicon_power_failure',
            iconColor: '#999999'
          }],
          filters: 'layout/runState'
        }, {
          label: '存储大小',
          key: 'portNum',
          formatter: '(portNum)TB'
        }, {
          label: '配置信息',
          key: 'cpuLoad',
          formatter: [{ label: '正常', key: 1 }, { label: '异常', key: 2, color: '#f00' }],
          filters: 'layout/state'
        }, {
          label: '控制机柜',
          key: 'cpuMemory',
          formatter: [{ label: '正常', key: 1 }, { label: '异常', key: 2, color: '#f00' }],
          filters: 'layout/state'
        }, {
          label: '矩阵机柜',
          key: 'area',
          filters: 'layout/area'
        }, {
          label: 'trap事件历史',
          key: 'position'
        }, {
          label: '操作',
          key: 'operation',
          width: '200px',
          buttons: [{
            label: '查看详情',
            type: 'url',
            path: '/it_detail?type=存储',
            query: ['id', 'name'],
            colorType: 'tableBlue'
          }]
        }
      ]
    }
  },
  created () {
    // console.log(this.$route.query.type);
  },
  methods: {
    edit (data) {
      console.log(data)
    },
    searchKey (val) {
      const searchItem = {
        field: 'meName', op: 'cn', data: val
      };
      if (this.activeName === '服务器') {
        this.serverSetting.param.filters.rules.forEach((item, index) => {
          if (item.field === searchItem.field) {
            this.serverSetting.param.filters.rules.splice(index, 1);
          }
        })
        this.serverSetting.param.filters.rules.push(searchItem);
      } else if (this.activeName === '交换机') {
        this.switchSetting.param.filters.rules.forEach((item, index) => {
          if (item.field === searchItem.field) {
            this.switchSetting.param.filters.rules.splice(index, 1);
          }
        })
        // this.switchSetting.param.filters.rules = [];
        this.switchSetting.param.filters.rules.push(searchItem);
      }
    },
    selectIdHandle (id) {
      console.log(id);
    },
    handleClick () {

    },
    judgeEvent (val) {
      if (val === 'manageHandle') {
        this.$router.push('/itManage')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.tab_body {
  padding: 17px 12px;
  background-color: #fff;
  .pdNone {
    padding: 0 !important;
  }
}
</style>
