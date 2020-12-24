<template>
  <div>
    <div class="body-content">
      <HeadMenu
        title="中间件监控列表"
        :search="true"
        :btnarr="btnarr"
        @getValue="searchKey"
        @getSelectId="selectIdHandle"
        @getEvent="judgeEvent"
      />
    </div>
    <el-tabs v-model="activeName" type="card" class="tab_body" @tab-click="handleClick">
      <el-tab-pane label="Apache" name="Apache" :lazy="true">
        <v-table
          :field-arr="apacheArr"
          :table-setting.sync.sync="apacheSetting"
          class="pdNone"
          @edit="edit"
        />
      </el-tab-pane>
      <!-- <el-tab-pane label="Nginx" name="Nginx" :lazy="true">
        <v-table
          :field-arr="nginkArr"
          :table-setting.sync="nginxSetting"
          class="pdNone"
          @edit="edit"
        />
      </el-tab-pane>-->
      <el-tab-pane label="Flume" name="Flume" :lazy="true">
        <v-table
          :field-arr="flumeArr"
          :table-setting.sync="flumeSetting"
          class="pdNone"
          @edit="edit"
        />
      </el-tab-pane>
      <el-tab-pane label="Redis" name="Redis" :lazy="true">
        <v-table
          :field-arr="redisArr"
          :table-setting.sync="redisSetting"
          class="pdNone"
          @edit="edit"
        />
      </el-tab-pane>
      <el-tab-pane label="JVM" name="JVM" :lazy="true">
        <v-table :field-arr="jvmArr" :table-setting.sync="jvmSetting" class="pdNone" @edit="edit"/>
      </el-tab-pane>
      <el-tab-pane label="ActiveMQ" name="ActiveMQ" :lazy="true">
        <v-table
          :field-arr="activeMQArr"
          :table-setting.sync="activeMQSetting"
          class="pdNone"
          @edit="edit"
        />
      </el-tab-pane>
      <!-- <el-tab-pane label="IIS" name="IIS" :lazy="true">
        <v-table :field-arr="iisArr" :table-setting.sync="iisSetting" class="pdNone" @edit="edit"/>
      </el-tab-pane>-->
      <el-tab-pane label="Flink" name="Flink" :lazy="true">
        <v-table
          :field-arr="flinkArr"
          :table-setting.sync="flinkSetting"
          class="pdNone"
          @edit="edit"
        />
      </el-tab-pane>
      <el-tab-pane label="Kafka" name="Kafka" :lazy="true">
        <v-table
          :field-arr="kafkaArr"
          :table-setting.sync="kafkaSetting"
          class="pdNone"
          @edit="edit"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeName: this.$route.query.type || 'Apache',
      btnarr: [
        {
          id: '1',
          value: ' 管理中间件',
          eventName: 'manageHandle',
          type: 'info'
        }
      ],
      apacheSetting: {
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
        apiUrl: '/apache/list',
        socket: {
          url: 'http://localhost:9999/echo',
          subscribe: 'data',
          tagName: 'id'
        },
        isPoll: true,
        pollTime: 300000
      },
      nginxSetting: {
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
        apiUrl: '/nginx/list',
        socket: {
          url: 'http://localhost:9999/echo',
          subscribe: 'data',
          tagName: 'id'
        },
        isPoll: true,
        pollTime: 300000
      },
      flumeSetting: {
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
        apiUrl: '/flume/list',
        socket: {
          url: 'http://localhost:9999/echo',
          subscribe: 'data',
          tagName: 'id'
        },
        isPoll: true,
        pollTime: 300000
      },
      redisSetting: {
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
        apiUrl: '/redis/list',
        socket: {
          url: 'http://localhost:9999/echo',
          subscribe: 'data',
          tagName: 'id'
        },
        isPoll: true,
        pollTime: 300000
      },
      jvmSetting: {
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
        apiUrl: '/jvm/list',
        socket: {
          url: 'http://localhost:9999/echo',
          subscribe: 'data',
          tagName: 'id'
        },
        isPoll: true,
        pollTime: 300000
      },
      activeMQSetting: {
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
        apiUrl: '/activeMq/list',
        socket: {
          url: 'http://localhost:9999/echo',
          subscribe: 'data',
          tagName: 'id'
        },
        isPoll: true,
        pollTime: 300000
      },
      iisSetting: {
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
        apiUrl: '/iis/list',
        socket: {
          url: 'http://localhost:9999/echo',
          subscribe: 'data',
          tagName: 'id'
        },
        isPoll: true,
        pollTime: 300000
      },
      flinkSetting: {
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
        apiUrl: '/flink/list',
        socket: {
          url: 'http://localhost:9999/echo',
          subscribe: 'data',
          tagName: 'id'
        },
        isPoll: true,
        pollTime: 300000
      },
      kafkaSetting: {
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
        apiUrl: '/kafka/list',
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
    runStatus (data) {
      return this.$store.getters['layout/runningState']
    },
    middleServerList () {
      return this.$store.getters['layout/middleServerList']
    },
    getStatus () {
      return this.$store.getters['layout/status']
    },
    getSize (size) {
      return function (size) {
        return this.$store.getters['layout/getSize'](size)
      }
    },
    apacheArr: function () {
      return [
        {
          label: '中间件名称',
          key: 'cmMeInfoEntity.meName',
          width: '140'
        },
        {
          label: '运行状态',
          key: 'runState',
          formatter: this.getStatus,
          filters: this.runStatus
        },
        {
          label: '总请求数',
          key: 'totalAccesses'
        },
        {
          label: '总字节数',
          key: 'totalKbytes'
        },
        {
          label: '运行线程数',
          key: 'busyWorkers'
        },
        {
          label: '数据发送速率',
          key: 'sendRate',
          formatter: (sendRate) => {
            return this.FileSize(sendRate);
          }
        },
        {
          label: '数据接收速率',
          key: 'receiveRate',
          formatter: (receiveRate) => {
            return this.FileSize(receiveRate);
          }
        },
        {
          label: '所在服务器',
          key: 'serverName',
          width: '220',
          filters: this.middleServerList
        },
        {
          label: '操作',
          key: 'operation',
          needTemp: true,
          // width: '230',
          buttons: [
            {
              label: '查看详情',
              type: 'url',
              path: '/middle_apache_detail?type=Apache',
              query: ['cmId', 'name'],
              colorType: 'tableBlue'
            }
          ]
        }
      ];
    },
    nginkArr: function () {
      return [
        {
          label: '中间件名称',
          key: 'cmMeInfoEntity.meName',
          width: '140'
        },
        {
          label: '运行状态',
          key: 'runState',
          formatter: this.getStatus,
          filters: this.runStatus
        },
        {
          label: '总请求数',
          key: 'requests'
        },
        {
          label: '当前活动连接数',
          key: 'activeConnections'
        },
        {
          label: '已接收连接总数',
          key: 'accepts'
        },
        {
          label: '已处理连接总数',
          key: 'handle'
        },
        {
          label: '当前空闲的连接数量',
          key: 'waiting'
        },
        {
          label: '所在服务器',
          key: 'serverName',
          width: '220',
          filters: this.middleServerList
        },
        {
          label: '操作',
          key: 'operation',
          needTemp: true,
          // width: '230',
          buttons: [
            {
              label: '查看详情',
              type: 'url',
              path: '/middle_apache_detail?type=Ngink',
              query: ['cmId', 'name'],
              colorType: 'tableBlue'
            }
          ]
        }
      ];
    },
    flumeArr: function () {
      return [
        {
          label: '中间件名称',
          key: 'cmMeInfoEntity.meName',
          width: '140',
          formatter: ''
        },
        {
          label: '运行状态',
          key: 'runState',
          formatter: this.getStatus,
          filters: this.runStatus
        },
        {
          label: '读取事件总数',
          key: 'appendAcceptedCount',
          formatter: ''
        },
        {
          label: '发送事件总数',
          key: 'eventTakeSuccessCount'
        },
        {
          label: '通道容量',
          key: 'channelCapacity',
          formatter: size => {
            return this.getSize(size)
          }
        },
        {
          label: '所在服务器',
          key: 'serverName',
          width: '220',
          formatter: '',
          filters: this.middleServerList
        },
        {
          label: '操作',
          key: 'operation',
          needTemp: true,
          // width: '230',
          buttons: [
            {
              label: '查看详情',
              type: 'url',
              path: '/middle_apache_detail?type=Flume',
              query: ['cmId', 'name'],
              colorType: 'tableBlue'
            }
          ]
        }
      ];
    },
    redisArr: function () {
      return [
        {
          label: '中间件名称',
          key: 'cmMeInfoEntity.meName',
          width: '140',
          formatter: ''
        },
        {
          label: '运行状态',
          key: 'runState',
          formatter: this.getStatus,
          filters: this.runStatus
        },
        {
          label: '连接客户数',
          key: 'connectedClients',
          formatter: ''
        },
        {
          label: '连接从库数',
          key: 'connectedSlaves'
        },
        {
          label: '每分钟连接数',
          key: 'connectionsPerMinute',
          formatter: '(connectionsPerMinute) / min'
        },
        {
          label: '阻塞客户数',
          key: 'blockedClients'
        },
        {
          label: '缓存命中率',
          key: 'keySpaceHitRate',
          formatter: function (num) {
            return num + '%'
          }
        },
        {
          label: '占用内存',
          key: 'usedMemoryRate',
          formatter: function (num) {
            return num + '%'
          }
        },
        {
          label: '每分钟执行命令数',
          key: 'instantaneousOpsPerMinute',
          formatter: '(instantaneousOpsPerMinute) / min'
        },
        {
          label: '所在服务器',
          key: 'serverName',
          width: '220',
          formatter: '',
          filters: this.middleServerList
        },
        {
          label: '操作',
          key: 'operation',
          needTemp: true,
          // width: '230',
          buttons: [
            {
              label: '查看详情',
              type: 'url',
              path: '/middle_apache_detail?type=Redis',
              query: ['cmId', 'name'],
              colorType: 'tableBlue'
            }
          ]
        }
      ];
    },
    jvmArr: function () {
      return [
        {
          label: '中间件名称',
          key: 'cmMeInfoEntity.meName',
          width: '140',
          formatter: ''
        },
        {
          label: '运行状态',
          key: 'runState',
          formatter: this.getStatus,
          filters: this.runStatus
        },
        {
          label: '堆内存使用百分比',
          key: 'heapUsedPercent',
          formatter: function (num) {
            return num + '%'
          }
        },
        {
          label: '线程数',
          key: 'threadCount'
        },
        {
          label: '老年代GC执行次数',
          key: 'oldGcCount'
        },
        {
          label: '年轻代GC执行次数',
          key: 'youngGcCount'
        },
        {
          label: '当前类加载数量',
          key: 'loadedClassCount'
        },
        {
          label: '所在服务器',
          key: 'serverName',
          width: '220',
          formatter: '',
          filters: this.middleServerList
        },
        {
          label: '操作',
          key: 'operation',
          needTemp: true,
          // width: '230',
          buttons: [
            {
              label: '查看详情',
              type: 'url',
              path: '/middle_apache_detail?type=JVM',
              query: ['cmId', 'name'],
              colorType: 'tableBlue'
            }
          ]
        }
      ];
    },
    activeMQArr: function () {
      return [
        {
          label: '中间件名称',
          key: 'cmMeInfoEntity.meName',
          width: '140',
          formatter: ''
        },
        {
          label: '运行状态',
          key: 'runState',
          formatter: this.getStatus,
          filters: this.runStatus
        },
        {
          label: '消费者数量',
          key: 'consumerNum',
          formatter: ''
        },
        {
          label: '生产者数量',
          key: 'producerNum'
        },
        {
          label: '未消费消息数量',
          key: 'notConsumedNum'
        },
        {
          label: '内存使用量',
          key: 'usage',
          formatter: function (num) {
            return num + '%'
          }
        },
        {
          label: '存储空间使用量',
          key: 'storeUsage',
          formatter: function (num) {
            return num + '%'
          }
        },
        {
          label: '临时空间使用量',
          key: 'tempUsage',
          formatter: function (num) {
            return num + '%'
          }
        },
        {
          label: '所在服务器',
          key: 'serverName',
          width: '220',
          formatter: '',
          filters: this.middleServerList
        },
        {
          label: '操作',
          key: 'operation',
          needTemp: true,
          // width: '230',
          buttons: [
            {
              label: '查看详情',
              type: 'url',
              path: '/middle_apache_detail?type=ActiveMQ',
              query: ['cmId', 'name'],
              colorType: 'tableBlue'
            }
          ]
        }
      ];
    },
    iisArr: function () {
      return [
        {
          label: '中间件名称',
          key: 'cmMeInfoEntity.meName',
          width: '140',
          formatter: ''
        },
        {
          label: '运行状态',
          key: 'runState',
          formatter: this.getStatus,
          filters: this.runStatus
        },
        {
          label: '当前连接数',
          key: 'currentConnections',
          formatter: ''
        },
        {
          label: '活跃请求数',
          key: 'curRequestNum'
        },
        {
          label: '文件缓存数',
          key: 'fileCacheCount'
        },
        {
          label: 'CPU使用率',
          key: 'cpuUsage',
          formatter: function (num) {
            return num * 100 + '%'
          }
        },
        {
          label: '所在服务器',
          key: 'serverName',
          width: '220',
          formatter: '',
          filters: this.middleServerList
        },
        {
          label: '操作',
          key: 'operation',
          needTemp: true,
          // width: '230',
          buttons: [
            {
              label: '查看详情',
              type: 'url',
              path: '/middle_apache_detail?type=IIS',
              query: ['cmId', 'name'],
              colorType: 'tableBlue'
            }
          ]
        }
      ];
    },
    flinkArr: function () {
      return [
        {
          label: '中间件名称',
          key: 'cmMeInfoEntity.meName',
          width: '140',
          formatter: ''
        },
        {
          label: '运行状态',
          key: 'runState',
          formatter: this.getStatus,
          filters: this.runStatus
        },
        {
          label: '堆内存使用百分比',
          key: 'heapUsage',
          formatter: function (num) {
            return num + '%'
          }
        },
        {
          label: '线程数',
          key: 'activeThreads'
        },
        {
          label: '老年代GC执行次数',
          key: 'fullGcCount'
        },
        {
          label: '年轻代GC执行次数',
          key: 'youngGcCount'
        },
        {
          label: '注册任务管理器的数量',
          key: 'numRegisteredTaskManagers'
        },
        {
          label: '可用任务槽的数量',
          key: 'taskSlotsAvailable'
        },
        {
          label: '所在服务器',
          key: 'serverName',
          width: '220',
          formatter: '',
          filters: this.middleServerList
        },
        {
          label: '操作',
          key: 'operation',
          needTemp: true,
          // width: '230',
          buttons: [
            {
              label: '查看详情',
              type: 'url',
              path: '/middle_apache_detail?type=Flink',
              query: ['cmId', 'name'],
              colorType: 'tableBlue'
            }
          ]
        }
      ];
    },
    kafkaArr: function () {
      return [
        {
          label: '中间件名称',
          key: 'cmMeInfoEntity.meName',
          width: '140',
          formatter: ''
        },
        {
          label: '运行状态',
          key: 'runState',
          formatter: this.getStatus,
          filters: this.runStatus
        },
        {
          label: '平均输入消息速率',
          key: 'msgPerSec',
          formatter: (data) => {
            return this.FileSize(data);
          }
        },
        {
          label: '平均输入字节速率',
          key: 'inPerSec',
          formatter: (data) => {
            return this.FileSize(data);
          }
        },
        {
          label: '平均输出字节速率',
          key: 'outPerSec',
          formatter: (data) => {
            return this.FileSize(data);
          }
        },
        {
          label: '平均扔掉字节速率',
          key: 'rejectPerSec',
          formatter: (data) => {
            return this.FileSize(data);
          }
        },
        {
          label: '平均失败的fetch请求率',
          key: 'fetchPerSec',
          formatter: (data) => {
            return this.FileSize(data);
          }
        },
        {
          label: '平均失败的producer请求率',
          key: 'producePerSec',
          width: 188,
          formatter: (data) => {
            return this.FileSize(data);
          }
        },
        {
          label: '所在服务器',
          key: 'serverName',
          width: '220',
          formatter: '',
          filters: this.middleServerList
        },
        {
          label: '操作',
          key: 'operation',
          needTemp: true,
          // width: 160,
          buttons: [
            {
              label: '查看详情',
              type: 'url',
              path: '/middle_apache_detail?type=Kafka',
              query: ['cmId', 'name'],
              colorType: 'tableBlue'
            }
          ]
        }
      ];
    }
  },
  created () {
    // console.log(process.env.VUE_APP_BASE_API);
    // this.$store.dispatch('monitor/soft/getList');
  },
  methods: {
    edit (data) {
      console.log(data);
    },
    handleClick () { },
    searchKey (val) {
      const searchItem = {
        field: 'meName', op: 'cn', data: val
      };
      if (this.activeName === 'Apache') {
        this.apacheSetting.param.filters.rules.forEach((item, index) => {
          if (item.field === searchItem.field) {
            this.apacheSetting.param.filters.rules.splice(index, 1);
          }
        })
        this.apacheSetting.param.filters.rules.push(searchItem);
      } else if (this.activeName === 'Flume') {
        this.flumeSetting.param.filters.rules.forEach((item, index) => {
          if (item.field === searchItem.field) {
            this.flumeSetting.param.filters.rules.splice(index, 1);
          }
        })
        this.flumeSetting.param.filters.rules.push(searchItem);
      } else if (this.activeName === 'Redis') {
        this.redisSetting.param.filters.rules.forEach((item, index) => {
          if (item.field === searchItem.field) {
            this.redisSetting.param.filters.rules.splice(index, 1);
          }
        })
        this.redisSetting.param.filters.rules.push(searchItem);
      } else if (this.activeName === 'JVM') {
        this.jvmSetting.param.filters.rules.forEach((item, index) => {
          if (item.field === searchItem.field) {
            this.jvmSetting.param.filters.rules.splice(index, 1);
          }
        })
        this.jvmSetting.param.filters.rules.push(searchItem);
      } else if (this.activeName === 'ActiveMQ') {
        this.activeMQSetting.param.filters.rules.forEach((item, index) => {
          if (item.field === searchItem.field) {
            this.activeMQSetting.param.filters.rules.splice(index, 1);
          }
        })
        this.activeMQSetting.param.filters.rules.push(searchItem);
      } else if (this.activeName === 'IIS') {
        this.iisSetting.param.filters.rules.forEach((item, index) => {
          if (item.field === searchItem.field) {
            this.iisSetting.param.filters.rules.splice(index, 1);
          }
        })
        this.iisSetting.param.filters.rules.push(searchItem);
      } else if (this.activeName === 'Flink') {
        this.flinkSetting.param.filters.rules.forEach((item, index) => {
          if (item.field === searchItem.field) {
            this.flinkSetting.param.filters.rules.splice(index, 1);
          }
        })
        this.flinkSetting.param.filters.rules.push(searchItem);
      } else if (this.activeName === 'Kafka') {
        this.kafkaSetting.param.filters.rules.forEach((item, index) => {
          if (item.field === searchItem.field) {
            this.kafkaSetting.param.filters.rules.splice(index, 1);
          }
        })
        this.kafkaSetting.param.filters.rules.push(searchItem);
      }
    },
    judgeEvent (val) {
      if (val === 'manageHandle') {
        this.$router.push('/middleManage');
      }
    },
    selectIdHandle (val) {
      console.log(val);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
