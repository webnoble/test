<template>
  <div class="body-content">
    <HeadMenu
      title="操作系统和数据库监控列表"
      :search="true"
      :btnarr="btnarr"
      @getValue="searchKey"
      @getEvent="managementHandle"
    />
    <el-tabs v-model="activeName" type="card" class="tab_body" @tab-click="handleClick">
      <el-tab-pane label="操作系统" name="first">
        <v-table
          v-if="activeName=='first'"
          :field-arr="fieldArr"
          :table-setting.sync="tableSetting"
          class="pdNone"
        />
      </el-tab-pane>
      <el-tab-pane label="数据库" name="second">
        <div class="database-filter">
          <!-- <span
            :class="{'filter-active':filterName==='Oracle'}"
            @click="filterTab('Oracle')"
          >Oracle {{ oracleCount }}({{ $refs.oracle && $refs.oracle.tableData && $refs.oracle.tableData.totalRows ? $refs.oracle.tableData.totalRows : '0' }})</span>-->
          <span
            :class="{'filter-active':filterName==='Oracle'}"
            @click="filterTab('Oracle')"
          >Oracle ({{ oracleCount }})</span>
          <span
            :class="{'filter-active':filterName==='Sqlserver'}"
            @click="filterTab('Sqlserver')"
          >sqlserver ({{ sqlserverCount }})</span>
          <span
            :class="{'filter-active':filterName==='Mysql'}"
            @click="filterTab('Mysql')"
          >Mysql ({{ mysqlCount }})</span>
        </div>
        <v-table
          v-show="filterName==='Mysql' && activeName=='second'"
          ref="mysql"
          :field-arr="mysqlFieldArr"
          :table-setting.sync="mysqlSetting"
          class="pdNone"
          @edit="edit"
          @listData="getData3"
        />
        <v-table
          v-show="filterName==='Oracle' && activeName=='second'"
          ref="oracle"
          :field-arr="oracleFieldArr"
          :table-setting.sync="oracleSetting"
          class="pdNone"
          @edit="edit"
          @listData="getData"
        />
        <v-table
          v-show="filterName==='Sqlserver' && activeName=='second'"
          ref="sqlserver"
          :field-arr="sqlserverFieldArr"
          :table-setting.sync="sqlserverSetting"
          class="pdNone"
          @edit="edit"
          @listData="getData2"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      getters: 'monitor/system/list',
      databaseGetters: 'monitor/system/databaseList',
      activeName: this.$route.query.type === '2' ? 'second' : 'first',
      // 选中的过滤器名
      filterName: 'Oracle',
      oracleCount: 0,
      sqlserverCount: 0,
      mysqlCount: 0,
      btnarr: [
        {
          id: '1',
          value: ' 管理系统和数据库',
          eventName: 'manageHandle',
          type: 'info'
        }
      ],
      tableSetting: {
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
        apiUrl: '/os/list',
        socket: {
          url: 'http://localhost:9999/echo',
          subscribe: 'data',
          tagName: 'id'
        },
        isPoll: true,
        pollTime: 300000
      },
      mysqlSetting: {
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
        apiUrl: '/mysql/list',
        socket: {
          url: 'http://localhost:9999/echo',
          subscribe: 'data',
          tagName: 'id'
        },
        isPoll: true,
        pollTime: 300000
      },
      oracleSetting: {
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
        apiUrl: '/oracle/list',
        socket: {
          url: 'http://localhost:9999/echo',
          subscribe: 'data',
          tagName: 'id'
        },
        isPoll: true,
        pollTime: 300000
      },
      sqlserverSetting: {
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
        apiUrl: '/sqlserver/list',
        socket: {
          url: 'http://localhost:9999/echo',
          subscribe: 'data',
          tagName: 'id'
        },
        isPoll: true,
        pollTime: 300000
      }
    };
  },
  computed: {
    runState: function () {
      return this.$store.getters['layout/runningState'];
    },
    middleServerList () {
      return this.$store.getters['layout/middleServerList']
    },
    getStatus () {
      return this.$store.getters['layout/status']
    },
    serverList () {
      return this.$store.getters['layout/serverList']
    },
    getSize (size) {
      return function (size) {
        return this.$store.getters['layout/getSize'](size)
      }
    },
    fieldArr: function () {
      return [
        {
          label: '操作系统名称',
          key: 'meName',
          formatter: ''
        },
        {
          label: '系统类别',
          key: 'meModel',
          width: '200',
          filters: [
            { text: 'Windows', value: 'Windows' },
            { text: 'Liunx', value: 'Linux' }
          ]
        },
        {
          label: '运行状态',
          key: 'runState',
          filters: this.runState,
          formatter: this.getStatus
        },
        {
          label: '硬盘状态',
          key: 'diskState',
          // formatter: [{ label: '正常', key: 1 }, { label: '异常', key: 0 }],
          filters: this.runState,
          formatter: this.runState
        },
        {
          label: '内存状态',
          key: 'memoryState',
          // formatter: [{ label: '正常', key: 1 }, { label: '异常', key: 0 }],
          filters: this.runState,
          formatter: this.runState
        },
        {
          label: 'cpu负载',
          key: 'cpuState',
          // formatter: [{ label: '正常', key: 1 }, { label: '异常', key: 0 }],
          filters: this.runState,
          formatter: this.runState
        },
        {
          label: '所在服务器',
          key: 'linkId',
          width: '220'
        },
        {
          label: '操作',
          key: 'operation',
          width: '200px',
          buttons: [
            {
              label: '查看详情',
              type: 'url',
              path: '/system_detail?type=1',
              query: ['meId', 'meName', 'meModel'],
              colorType: 'tableBlue'
            }
          ]
        }
      ]
    },
    oracleFieldArr: function () {
      return [
        {
          label: '数据库名称',
          key: 'name',
          formatter: ''
        },
        {
          label: '运行状态',
          key: 'runState',
          formatter: this.getStatus,
          filters: this.runState
        },
        {
          label: '数据库文件大小',
          key: 'totalSize',
          formatter: size => {
            return this.getSize(size)
          }
        },
        {
          label: '进程数量',
          key: 'processNum',
          formatter: ''
        },
        {
          label: '活动对话',
          key: 'userActiveSession',
          formatter: ''
        },
        {
          label: '审计',
          key: 'auditStatus',
          formatter: [
            {
              key: 'true',
              label: '开启'
            },
            {
              key: 'false',
              label: '关闭'
            }
          ]
        },
        {
          label: '系统会话',
          key: 'dbSystemSession',
          formatter: ''
        },
        {
          label: '所在服务器',
          key: 'linkId',
          width: '220',
          filters: this.middleServerList,
          formatter: this.serverList
        },
        {
          label: '操作',
          key: 'operation',
          width: '200px',
          buttons: [
            {
              label: '查看详情',
              type: 'url',
              path: '/system_detail?type=2&filterName=Oracle',
              query: ['id', 'name'],
              colorType: 'tableBlue'
            }
          ]
        }
      ];
    },
    sqlserverFieldArr: function () {
      return [
        {
          label: '数据库名称',
          key: 'name',
          formatter: ''
        },
        {
          label: '运行状态',
          key: 'runState',
          formatter: this.getStatus,
          filters: this.runState
        },
        {
          label: '每秒批处理请求数量',
          key: 'batchRequestSec',
          formatter: ''
        },
        {
          label: '每秒全表扫描数量',
          key: 'fullScansSec',
          formatter: ''
        },
        {
          label: '临时表数量',
          key: 'tempTableCreateSec',
          formatter: ''
        },
        {
          label: '线程获取闩的平均等待时间',
          key: 'latchWaitTime',
          formatter: ''
        },
        {
          label: '所在服务器',
          key: 'linkId',
          width: '220',
          filters: this.middleServerList,
          formatter: this.serverList
        },
        {
          label: '操作',
          key: 'operation',
          width: '200px',
          buttons: [
            {
              label: '查看详情',
              type: 'url',
              path: '/system_detail?type=2&filterName=Sqlserver',
              query: ['id', 'name'],
              colorType: 'tableBlue'
            }
          ]
        }
      ];
    },
    mysqlFieldArr: function () {
      return [
        {
          label: '数据库名称',
          key: 'name',
          formatter: ''
        },
        {
          label: '运行状态',
          key: 'runState',
          formatter: this.getStatus,
          filters: this.runState
        },
        {
          label: '当前线程活跃数',
          key: 'threadRunning',
          formatter: ''
        },
        {
          label: '每秒事务数（tps)',
          key: 'tps',
          formatter: ''
        },
        {
          label: '线程缓存命中个数',
          key: 'qcacheHits',
          formatter: ''
        },
        {
          label: '被创建的线程个数',
          key: 'threadsCreated',
          formatter: ''
        },
        {
          label: '慢查询',
          key: 'slowQueryNum',
          formatter: ''
        },
        {
          label: '所在服务器',
          key: 'linkId',
          width: '220',
          filters: this.middleServerList,
          formatter: this.serverList
        },
        {
          label: '操作',
          key: 'operation',
          width: '200px',
          buttons: [
            {
              label: '查看详情',
              type: 'url',
              path: '/system_detail?type=2&filterName=Mysql',
              query: ['id', 'name'],
              colorType: 'tableBlue'
            }
          ]
        }
      ];
    }
  },
  mounted () {
  },
  methods: {
    handleClick () { },
    searchKey (val) {
      const searchItem = {
        field: 'meName', op: 'cn', data: val
      };
      if (this.activeName === 'first') {
        this.tableSetting.param.filters.rules.forEach((item, index) => {
          if (item.field === searchItem.field) {
            this.tableSetting.param.filters.rules.splice(index, 1);
          }
        })
        this.tableSetting.param.filters.rules.push(searchItem);
      } else if (this.activeName === 'second' && this.filterName === 'Oracle') {
        this.oracleSetting.param.filters.rules.forEach((item, index) => {
          if (item.field === searchItem.field) {
            this.oracleSetting.param.filters.rules.splice(index, 1);
          }
        })
        this.oracleSetting.param.filters.rules.push(searchItem);
      } else if (this.activeName === 'second' && this.filterName === 'Sqlserver') {
        this.sqlserverSetting.param.filters.rules.forEach((item, index) => {
          if (item.field === searchItem.field) {
            this.sqlserverSetting.param.filters.rules.splice(index, 1);
          }
        })
        this.sqlserverSetting.param.filters.rules.push(searchItem);
      } else if (this.activeName === 'second' && this.filterName === 'Mysql') {
        this.mysqlSetting.param.filters.rules.forEach((item, index) => {
          if (item.field === searchItem.field) {
            this.mysqlSetting.param.filters.rules.splice(index, 1);
          }
        })
        this.mysqlSetting.param.filters.rules.push(searchItem);
      }
    },
    managementHandle (val) {
      if (val === 'manageHandle') {
        this.$router.push('/databaseManage');
      }
    },
    edit (data) {
      console.log(data);
    },
    filterTab (val) {
      this.filterName = val;
      // console.log(this.filterName);
    },
    getData (val) {
      this.oracleCount = val.totalRows;
    },
    getData2 (val) {
      this.sqlserverCount = val.totalRows;
    },
    getData3 (val) {
      this.mysqlCount = val.totalRows;
    }
  }
};
</script>

<style lang="scss" scoped>
.database-filter {
  width: 100%;
  height: 56px !important;
  background-color: rgba(201, 203, 245, 0.2);
  font-size: 14px;
  border-bottom: 3px solid #c1c5ff;
  span {
    display: block;
    float: left;
    width: 205px;
    height: 56px;
    line-height: 56px;
    text-align: center;
    box-sizing: border-box;
    color: #888888;
    cursor: pointer;
  }
  .filter-active {
    position: relative;
    color: #38ace1;
    border-bottom: 3px solid #5466e0;
  }
  .filter-active:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    background-color: transparent;
    border: 6px solid;
    border-color: transparent transparent #5466e0;
  }
  span:after {
    content: "";
    width: 1px;
    height: 17px;
    display: block;
    float: right;
    margin-top: 20px;
    background-color: #dddee0;
  }
  span:nth-last-child(1):after {
    content: "";
    width: 0;
    height: 0;
  }
}
</style>
