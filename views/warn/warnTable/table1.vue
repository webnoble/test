<template>
  <div>
    <v-table
      ref="table"
      :field-arr="fieldArr"
      :table-setting.sync="tableSetting"
      class="pdNone"
      @delete="deleteItem"
      @sure="sure"
      @detail="detail"
    />
    <el-dialog
      title="告警详情"
      custom-class="addHandleWidth"
      :visible.sync="dialogVisible"
      width="480px"
      style="height:100%;"
    >
      <el-row>
        <el-col>
          <span>告警源：</span>
          <p>{{ detailData.name }}</p>
        </el-col>
        <el-col>
          <span>告警描述：</span>
          <p>{{ detailData.alarmName }}</p>
        </el-col>
        <el-col>
          <span>可能原因：</span>
          <p>{{ detailData.probableCause }}</p>
        </el-col>
        <el-col>
          <span>修复建议：</span>
          <p>{{ detailData.repairSuggestion }}</p>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" class="closeBtn" @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "RuleTable1",
  props: {
    filtersParam: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      dialogVisible: false,
      detailData: "",
      tableSetting: {
        pagination: {
          show: true,
          rowsPerPage: [10, 20, 30],
        },
        param: {
          page: 1,
          rows: 10,
          sord: "desc",
          _search: false,
          filters: {
            groupOp: "AND",
            rules: [],
          },
        },
        apiUrl: "/alarm/alarmList",
        socket: {
          url: "http://localhost:9999/echo",
          subscribe: "data",
          tagName: "id",
        },
      },
      // 选中数据ID
      ids: [],
    };
  },
  computed: {
    meGroupAndName: function () {
      return this.$store.getters["layout/meGroupAndName"];
    },
    alarmLevelAndName: function () {
      return this.$store.getters["layout/alarmLevelAndName"];
    },
    warnState: function () {
      return this.$store.getters["layout/warnState"];
    },
    alarmDealStateAndName: function () {
      return this.$store.getters["layout/alarmDealStateAndName"];
    },
    cmMeIdAndMeNameCache: function () {
      return this.$store.getters["layout/cmMeIdAndMeNameCache"];
    },
    fieldArr: function () {
      return [
        {
          label: "告警编号",
          key: "sn",
        },
        {
          label: "告警源",
          key: "meId",
          formatter: this.cmMeIdAndMeNameCache,
        },
        {
          label: "告警类别",
          key: "meTypeGroupId",
          filters: [
            {
              value: "1000",
              text: "安防运维",
              isCheck: this.$route.query.filters === "1000",
            },
            {
              value: "1001",
              text: "IT设备",
              isCheck: this.$route.query.filters === "1001",
            },
            {
              value: "1002",
              text: "中间件",
              isCheck: this.$route.query.filters === "1002",
            },
            {
              value: "1003",
              text: "云平台",
              isCheck: this.$route.query.filters === "1003",
            },
            {
              value: "1004",
              text: "应用程序",
              isCheck: this.$route.query.filters === "1004",
            },
            {
              value: ["1005", "1006"],
              text: "操作系统和数据库",
              isCheck:
                this.$route.query.filters === "1005" ||
                this.$route.query.filters === "1006",
            },
          ],
          formatter: this.meGroupAndName,
        },
        {
          label: "告警级别",
          key: "alarmLevel",
          formatter: [
            {
              key: 4,
              label: "致命",
              color: "",
              className: "iconicon_close_alt",
              iconColor: "red",
            },
            {
              key: 3,
              label: "严重",
              color: "",
              className: "iconicon_Critical_warning",
              iconColor: "#FA7C00",
            },
            {
              key: 2,
              label: "一般",
              color: "",
              className: "iconicon_minus_alt",
              iconColor: "#FFC600",
            },
            {
              key: 1,
              label: "提示",
              color: "",
              className: "iconicon_info",
              iconColor: "#A09116",
            },
          ],
          filters: [
            {
              value: "1",
              text: "提示",
              isCheck: this.$route.query.filters === 1,
            },
            {
              value: "2",
              text: "一般",
              isCheck: this.$route.query.filters === 2,
            },
            {
              value: "3",
              text: "严重",
              isCheck: this.$route.query.filters === 3,
            },
            {
              value: "4",
              text: "致命",
              isCheck: this.$route.query.filters === 4,
            },
          ],
        },
        {
          label: "告警名称",
          key: "alarmName",
        },
        {
          label: "告警时间",
          key: "alarmTime",
          formatter: {
            type: "time",
          },
        },
        {
          label: "告警状态",
          key: "alarmState",
          formatter: this.warnState,
          filters: this.warnState,
        },
        {
          label: "确认时间",
          key: "ackTime",
          formatter: {
            type: "time",
          },
        },
        {
          label: "处理状态",
          key: "dealState",
          filters: this.alarmDealStateAndName,
          formatter: this.alarmDealStateAndName,
        },
        {
          label: "操作",
          key: "operation",
          needTemp: true,
          width: 240,
          buttons: [
            {
              label: "确认",
              type: "button",
              method: "sure",
              query: ["id", "name"],
              colorType: "edit",
              showRule: [
                {
                  key: "alarmState",
                  value: 1,
                },
              ],
            },
            {
              label: "工单详情",
              type: "button",
              method: "turnOrder",
              query: ["id", "name"],
              colorType: "edit",
              showRule: [
                {
                  key: "state",
                  value: 4,
                },
                {
                  key: "dealState",
                  value: 2,
                },
              ],
            },
            {
              label: "转工单",
              type: "button",
              method: "turnOrder",
              query: ["id", "name"],
              colorType: "edit",
              showRule: [
                {
                  key: "state",
                  value: 1,
                },
                {
                  key: "dealState",
                  value: 1,
                },
              ],
            },
            {
              label: "清除",
              type: "button",
              method: "delete",
              colorType: "delete",
            },
            {
              label: "详情",
              type: "button",
              method: "detail",
              colorType: "detail",
            },
          ],
        },
      ];
    },
  },
  watch: {
    filtersParam: {
      handler(val) {
        // console.log(val);
        this.tableSetting.param = val;
      },
      deep: true,
    },
  },
  methods: {
    deleteItem(data) {
      const param = {
        id: data.id,
        operStatus: 2,
        alarmType: 2,
      };
      this.$request.post("/alarm/confirmByAlarmById", param).then((res) => {
        this.$refs.table.getList();
      });
    },
    remove() {
      this.$refs.table.deleteItem(this.ids);
    },
    detail(data) {
      const param = {
        id: data.id,
        operStatus: 5,
        alarmType: 2,
      };
      this.$request.post("/alarm/confirmByAlarmById", param).then((res) => {
        // this.$refs.table.getList();
        const cm = this.cmMeIdAndMeNameCache.find((item) => {
          return item.value == res.meId;
        });
        // console.log(cm);
        this.detailData = res;
        this.detailData.name = cm.text;
        this.dialogVisible = true;
        // this.detail.name =
      });
    },
    sure(data) {
      const param = {
        id: data.id,
        operStatus: 1,
        alarmType: 2,
      };
      this.$request.post("/alarm/confirmByAlarmById", param).then((res) => {
        this.$refs.table.getList();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.pdNone {
  padding: 0 !important;
}
.pdNone >>> .el-table {
  .el-table__body {
    .dynamicTable__operation {
      text-align: left;
      .el-button--medium {
        padding: 0;
        width: 80px;
        padding-left: 10px;
      }
      .el-button--medium:nth-last-child(1) {
        width: auto;
      }
    }
  }
}
.addHandleWidth {
  .el-col {
    margin-bottom: 20px;
    span {
      display: inline-block;
      vertical-align: top;
      width: 100px;
      text-align: right;
    }
    p {
      display: inline-block;
      vertical-align: top;
      width: calc(100% - 120px);
    }
  }
}
</style>

