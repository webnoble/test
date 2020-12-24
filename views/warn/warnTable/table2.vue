<template>
  <div>
    <v-table :field-arr="fieldArr" :table-setting.sync="tableSetting" class="pdNone"/>
  </div>
</template>

<script>
export default {
  name: 'RuleTable2',
  props: {
    filtersParam: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  computed: {
    fieldArr: function () {
      return [
        {
          label: '事件编号',
          key: 'eventCode'
        }, {
          label: '事件源',
          key: 'meId',
          formatter: this.cmMeIdAndMeNameCache
        }, {
          label: '事件时间',
          key: 'eventTime',
          formatter: {
            type: 'time'
          }
        }, {
          label: '事件描述',
          key: 'eventDesc'
        }
      ]
    },
    cmMeIdAndMeNameCache: function () {
      return this.$store.getters['layout/cmMeIdAndMeNameCache'];
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
        apiUrl: '/alarm/alarmEventList',
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
  watch: {
    filtersParam: {
      handler (val) {
        this.tableSetting.param = val;
      },
      deep: true
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.pdNone {
  padding: 0 !important;
}
</style>
