<template>
  <div>
    <v-table
      ref="table"
      :field-arr="fieldArr"
      :table-setting.sync="tableSetting"
      class="pdNone"
      @delete="deleteItem"
    />
  </div>
</template>

<script>
export default {
  name: 'RuleTable4',
  props: {
    filtersParam: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
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
        apiUrl: '/alarm/historyAlarmList',
        socket: {
          url: 'http://localhost:9999/echo',
          subscribe: 'data',
          tagName: 'id'
        }
      },
      // 选中数据ID
      ids: []
    }
  },
  computed: {
    meGroupAndName: function () {
      return this.$store.getters['layout/meGroupAndName'];
    },
    alarmLevelAndName: function () {
      return this.$store.getters['layout/alarmLevelAndName'];
    },
    warnState: function () {
      return this.$store.getters['layout/warnState'];
    },
    alarmDealStateAndName: function () {
      return this.$store.getters['layout/alarmDealStateAndName'];
    },
    cmMeIdAndMeNameCache: function () {
      return this.$store.getters['layout/cmMeIdAndMeNameCache'];
    },
    fieldArr: function () {
      return [
        {
          label: '告警编号',
          key: 'sn'
        },
        {
          label: '告警源',
          key: 'meId',
          formatter: this.cmMeIdAndMeNameCache
        }, {
          label: '告警类别',
          key: 'meTypeGroupId',
          filters: this.meGroupAndName,
          formatter: this.meGroupAndName
        }, {
          label: '告警级别',
          key: 'alarmLevel',
          formatter: [{
            key: 4,
            label: '致命',
            color: '',
            className: 'iconicon_close_alt',
            iconColor: 'red'
          }, {
            key: 3,
            label: '严重',
            color: '',
            className: 'iconicon_Critical_warning',
            iconColor: '#FA7C00'
          }, {
            key: 2,
            label: '一般',
            color: '',
            className: 'iconicon_minus_alt',
            iconColor: '#FFC600'
          }, {
            key: 1,
            label: '提示',
            color: '',
            className: 'iconicon_info',
            iconColor: '#A09116'
          }],
          filters: this.alarmLevelAndName
        }, {
          label: '告警名称',
          key: 'alarmName'
        }, {
          label: '告警时间',
          key: 'alarmTime',
          formatter: {
            type: 'time'
          }
        }, {
          label: '告警状态',
          key: 'alarmState',
          formatter: this.warnState,
          filters: this.warnState
        }, {
          label: '清除时间',
          key: 'clearTime',
          formatter: {
            type: 'time'
          }
        }, {
          label: '清除人',
          key: 'clearUser'
        }, {
          label: '处理状态',
          key: 'dealState',
          filters: this.alarmDealStateAndName,
          formatter: this.alarmDealStateAndName
        }
        // , {
        //   label: '操作',
        //   key: 'operation',
        //   needTemp: true,
        //   buttons: [
        //     {
        //       label: '确认',
        //       type: 'button',
        //       method: 'turnOrder',
        //       query: ['id', 'name'],
        //       colorType: 'edit',
        //       showRule: [{
        //         key: 'state',
        //         value: 2
        //       }, {
        //         key: 'dealState',
        //         value: 1
        //       }]
        //     },
        //     {
        //       label: '工单详情',
        //       type: 'button',
        //       method: 'turnOrder',
        //       query: ['id', 'name'],
        //       colorType: 'edit',
        //       showRule: [{
        //         key: 'state',
        //         value: 4
        //       }, {
        //         key: 'dealState',
        //         value: 2
        //       }]
        //     }, {
        //       label: '转工单',
        //       type: 'button',
        //       method: 'turnOrder',
        //       query: ['id', 'name'],
        //       colorType: 'edit',
        //       showRule: [{
        //         key: 'state',
        //         value: 1
        //       }, {
        //         key: 'dealState',
        //         value: 1
        //       }]
        //     }, {
        //       label: '清除',
        //       type: 'button',
        //       method: 'delete',
        //       colorType: 'delete'
        //     }]
        // }
      ]
    }
  },
  watch: {
    filtersParam: {
      handler (val) {
        this.tableSetting.param = val;
      },
      deep: true
    }
  },
  methods: {
    deleteItem (data) {
      const param = {
        id: data.id,
        operStatus: 2,
        alarmType: 3
      }
      this.$request.post('/alarm/confirmByAlarmById', param).then((res) => {
        this.$refs.table.getList();
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pdNone {
  padding: 0 !important;
}
</style>
