<template>
  <div>
    <v-table
      ref="table"
      :field-arr="fieldArr"
      :table-setting.sync="tableSetting"
      :show-index="true"
      class="pdNone"
      @edit="edit"
      @start="start"
      @stop="stop"
      @delete="deleteItem"
      @selection-change="handleSelectionChange"
    />
  </div>
</template>

<script>
export default {
  name: 'RuleTable3',
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
        apiUrl: '/alarm/redefine',
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
    cmMeIdAndMeNameCache: function () {
      return this.$store.getters['layout/cmMeIdAndMeNameCache'];
    },
    alarmDealStateAndName: function () {
      return this.$store.getters['layout/alarmDealStateAndName'];
    },
    fieldArr: function () {
      return [
        {
          label: '规则名称',
          key: 'ruleName',
          width: '140'
        }, {
          label: '适用设备',
          key: 'meIds',
          width: '200',
          formatter: (meIds) => {
            const arr = [];
            meIds.forEach((id) => {
              const group = this.cmMeIdAndMeNameCache.find((item) => {
                return item.value.toString() === id.toString()
              })
              arr.push(group.text)
            })
            return arr.join(',')
          }
        }, {
          label: '告警级别',
          key: 'levelIds',
          filters: this.alarmLevelAndName,
          formatter: (levelIds) => {
            const arr = [];
            levelIds.forEach((id) => {
              const group = this.alarmLevelAndName.find((item) => {
                return item.value.toString() === id.toString()
              })
              arr.push(group.text)
            })
            return arr.join(',')
          }
        }, {
          label: '重定义告警级别',
          key: 'redefineLevelId',
          formatter: this.alarmLevelAndName,
          filters: this.alarmLevelAndName
        }, {
          label: '运行状态',
          key: 'isStart',
          filters: [{ text: '运行中', value: 1 }, { text: '已停止', value: 0 }],
          formatter: (isStart) => {
            return isStart === 0 ? '已停止' : '运行中'
          }
        }, {
          label: '操作',
          key: 'operation',
          needTemp: true,
          width: '262',
          buttons: [{
            label: '停止',
            type: 'button',
            method: 'stop',
            colorType: 'runstate',
            showRule: [{
              key: 'isStart',
              value: 1
            }]
          }, {
            label: '启动',
            type: 'button',
            method: 'start',
            colorType: 'runstate',
            showRule: [{
              key: 'isStart',
              value: 0
            }]
          }, {
            label: '编辑',
            type: 'button',
            method: 'edit',
            colorType: 'edit'
          }, {
            label: '删除',
            type: 'button',
            method: 'delete',
            colorType: 'delete'
          }]
        }
      ]
    }
  },
  methods: {
    edit (data) {
      this.$emit('edit', data)
    },
    update (data) {
      const promise = new Promise((resolve, reject) => {
        console.log(this.$refs.table);
        this.$refs.table.update(data).then(() => {
          resolve();
        })
      });
      return promise;
    },
    start (data) {
      this.$request.post(`/alarm/redefine/reset?id=${data.id}&isStart=${1}`).then(() => {
        this.$refs.table.getList();
      })
    },
    stop (data) {
      this.$request.post(`/alarm/redefine/reset?id=${data.id}&isStart=${0}`).then(() => {
        this.$refs.table.getList();
      })
    },
    deleteItem (data) {
      const deleteIds = [];
      deleteIds.push(data.id);
      this.$refs.table.deleteItem(deleteIds)
    },
    remove () {
      this.$refs.table.deleteItem(this.ids)
    },
    add (data) {
      const promise = new Promise((resolve, reject) => {
        this.$refs.table.add(data).then(() => {
          resolve();
        })
      });
      return promise;
    },
    handleSelectionChange (data) {
      data.forEach((item) => {
        this.ids.push(item.id)
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
