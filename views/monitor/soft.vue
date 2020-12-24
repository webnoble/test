<template>
  <div>
    <HeadMenu
      title="应用软件监控列表"
      :search="true"
      :btnarr="btnarr"
      @getValue="searchKey"
      @getEvent="judgeEvent"
    />
    <v-table
      :field-arr="fieldArr"
      :table-setting.sync="tableSetting"
      class="tab_body"
      @edit="edit"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      btnarr: [{ id: '1', value: ' 管理设备', eventName: 'manageHandle', type: 'info' }],
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
        apiUrl: 'japp/list',
        socket: {
          url: 'http://localhost:9999/echo',
          subscribe: 'data',
          tagName: 'id'
        },
        isPoll: true,
        pollTime: 300000
      }
    }
  },
  computed: {
    runStatus () {
      return this.$store.getters['layout/runningState']
    },
    middleServerList () {
      return this.$store.getters['layout/middleServerList']
    },
    area () {
      return this.$store.getters['layout/area']
    },
    getStatus () {
      return this.$store.getters['layout/status']
    },
    fieldArr: function () {
      return [
        {
          label: '应用软件名称',
          key: 'jappName',
          width: '220'
        }, {
          label: '运行状态',
          key: 'runState',
          formatter: this.getStatus,
          filters: this.runStatus
        }, {
          label: '当前审批流程',
          key: 'currentProcess',
          formatter: ''
        }, {
          label: '今日访问量',
          key: 'todayAccess',
          formatter: ''
        }, {
          label: '所在区域',
          key: 'areaId',
          formatter: this.area,
          filters: this.area
          // filters: 'layout/area'
        }, {
          label: '所在服务器',
          key: 'serverName'
          // 风格和中间件不统一，暂定注释
          // filters: this.middleServerList
        }, {
          label: '操作',
          key: 'operation',
          needTemp: true,
          width: '200',
          buttons: [{
            label: '查看详情',
            type: 'url',
            path: '/soft_detail',
            query: ['cmId', 'jappName']
          }]
        }
      ]
    }
  },
  created () {
  },
  methods: {
    edit (data) {
      console.log(data)
    },
    judgeEvent (val) {
      if (val === 'manageHandle') {
        this.$router.push('/softManage')
      }
    },
    searchKey (val) {
      // this.tableSetting.param.filters.rules = [];
      const searchItem = {
        field: 'meName', op: 'cn', data: val
      };
      this.tableSetting.param.filters.rules.forEach((item, index) => {
        if (item.field === searchItem.field) {
          this.tableSetting.param.filters.rules.splice(index, 1);
        }
      })
      this.tableSetting.param.filters.rules.push(searchItem);
    }
  }
}
</script>
<style lang="scss">
@import '~@/styles/element-ui.scss';
.publicheader {
  overflow: hidden;
  padding: 10px 0;
  h2 {
    float: left;
  }
  .right-wrapper {
    float: right;
    width: 50%;
    text-align: right;
    .el-input {
      width: 200px;
    }
  }
}
</style>
