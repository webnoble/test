<template>
  <div v-if="update" class="content">
    <div class="headMenu">
      <el-row>
        <el-col :span="2">
          <HeadMenu title="今日新增" class="headMenuLeft" />
        </el-col>
        <el-col :span="22">
          <el-row class="headMenuRight">
            <el-col :span="4">
              <div class="alarm-event" @click="filterList('alarm')">
                <span class="alarm-event-text">告警</span>
                <span class="alarm-event-num">{{ headInfo.todayAlarm }}</span>
                <i class="iconfont iconicon_call_police before" />
              </div>
            </el-col>
            <el-col :span="4">
              <div class="alarm-event" @click="filterList('event')">
                <span class="alarm-event-text">事件</span>
                <span class="alarm-event-num">{{ headInfo.todayEvent }}</span>
                <i class="iconfont iconshijian before" />
              </div>
            </el-col>
            <el-col :span="16">
              <div class="alarm-level">
                <span class="untreated" @click="filterList('untreated')">
                  <span>未处理告警:</span>
                  <span>{{ headInfo.undealAlarm }}</span>
                </span>
                <span class="iconBox deadly" @click="filterList('level',4)">
                  <i class="iconfont iconicon_close_alt" />
                  <span>致命</span>
                  <span>{{ headInfo.fatalAlarm }}</span>
                </span>
                <span class="iconBox serious" @click="filterList('level',3)">
                  <i class="iconfont iconicon_Critical_warning" />
                  <span>严重</span>
                  <span>{{ headInfo.severeAlarm }}</span>
                </span>
                <span class="iconBox general" @click="filterList('level',2)">
                  <i class="iconfont iconicon_minus_alt" />
                  <span>一般</span>
                  <span>{{ headInfo.generalAlarm }}</span>
                </span>
                <span class="iconBox prompt" @click="filterList('level',1)">
                  <i class="iconfont iconicon_info" />
                  <span>提示</span>
                  <span>{{ headInfo.promptAlarm }}</span>
                </span>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div
      v-if="warnList && warnList.length"
      class="new-warn"
      @click="updateList"
    >你有{{ warnList.length }}条新的告警</div>
    <div class="tabs-body">
      <HeadMenu class="tabs-right-head" :search="true" @getValue="searchKey" />
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="告警列表" name="first">
          <table1 ref="table1" />
        </el-tab-pane>
        <el-tab-pane label="事件列表" name="second">
          <table2 ref="table2" />
        </el-tab-pane>
        <el-tab-pane label="智能告警" name="three">
          <table3 ref="table3" :filters-param="param" />
        </el-tab-pane>
        <el-tab-pane label="历史告警" name="four">
          <table4 ref="table4" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      title="新增一条致命告警"
      class="alarmDialag"
      :visible.sync="alarmDialogVisible"
      width="480px"
      :before-close="alarmHandleClose"
      style="height:100%;"
    >
      <el-row>
        <el-col :span="16" style="float:left;">
          <span>
            告警源：
            <span style="color : red;">甘孜监狱-大门门禁</span>
          </span>
        </el-col>
        <el-col :span="8" style="float:right;">
          <span>
            告警级别：
            <span style="color : red;">致命</span>
          </span>
        </el-col>
        <el-col :span="24">
          <span>告警描述：大门长时间未关闭</span>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="confirmBtn" @click="dealAlarm">立即处理</el-button>
        <el-button type="warning" class="closeBtn" @click="alarmDialogVisible = false">暂不处理</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import table1 from "./warnTable/table1";
import table2 from "./warnTable/table2";
import table3 from "./warnTable/table3";
import table4 from "./warnTable/table4";
export default {
  name: "Warn",
  components: {
    table1,
    table2,
    table3,
    table4,
  },
  data() {
    return {
      activeName: this.$route.query.filters ? "three" : "first",
      update: true,
      headInfo: "",
      // dialogVisible: false,
      alarmDialogVisible: false,
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
    };
  },
  computed: {
    warnList() {
      let list = [];
      if (this.$store.state.socket.subscribeList.warnList) {
        list = this.$store.state.socket.subscribeList.warnList;
        list = list.filter((item) => {
          return !JSON.parse(item).clearTime;
        });
      }
      return list;
      // console.log(this.$store.state.socket.subscribeList);
    },
  },
  created() {
    this.getHeadInfo();
    this.$store.dispatch("socket/clearList", "warnList");
  },
  mounted() {
    // var valueType = typeof this.$route.query.filters;
    // if (this.$route.query.filters && valueType === 'string') {
    //   this.param.filters.rules = [{ field: 'meTypeGroupId', 'op': 'eq', data: this.$route.query.filters }];
    // } else if (this.$route.query.filters && valueType === 'number') {
    //   this.param.filters.rules = [{ field: 'alarmLevel', 'op': 'eq', data: this.$route.query.filters.toString() }];
    // } else if (this.$route.query.filters && valueType === 'object') {
    //   this.param.filters.groupOp = 'OR';
    //   this.$route.query.filters.forEach((item, index) => {
    //     this.param.filters.rules.push({ field: 'meTypeGroupId', 'op': 'eq', data: this.$route.query.filters[index] })
    //   })
    // }
  },
  methods: {
    getHeadInfo() {
      this.$request.get("/alarm/getHeaderInfo").then((res) => {
        this.headInfo = res;
        console.log(this.headInfo);
      });
    },
    updateList() {
      this.$store.dispatch("socket/clearList", "warnList");
      this.update = false;
      this.$nextTick(() => {
        this.update = true;
      });
      this.$forceUpdate();
    },
    handleClick() {
      // this.param = {
      //   page: 1,
      //   rows: 10,
      //   sord: 'desc',
      //   _search: false,
      //   filters: {
      //     groupOp: 'AND',
      //     rules: []
      //   }
      // }
    },
    // pagination (val) {
    //   this.listQuery.page = val.page;
    //   this.listQuery.limit = val.limit;
    // },
    searchKey(val) {
      let table;
      const searchItem = {
        field: "alarmName",
        op: "cn",
        data: val,
      };
      if (this.activeName === "first") {
        table = this.$refs.table1;
      }
      if (this.activeName === "second") {
        table = this.$refs.table2;
      }
      if (this.activeName === "three") {
        table = this.$refs.table3;
      }
      if (this.activeName === "four") {
        table = this.$refs.table4;
      }
      table.tableSetting.param.filters.rules.forEach((item, index) => {
        if (item.field === searchItem.field) {
          table.tableSetting.param.filters.rules.splice(index, 1);
        }
      });
      table.tableSetting.param.filters.rules.push(searchItem);
    },
    turnOrder(data) {
      this.ruleForm.alarmSource = data.alarmSource;
      this.dialogVisible = true;
      console.log(data);
    },
    // 触发关闭弹窗事件
    handleClose(done) {
      this.dialogVisible = false;
    },
    alarmHandleClose(done) {
      this.alarmDialogVisible = false;
    },
    // 提交表单
    onSubmit() {
      this.dialogVisible = false;
    },
    dealAlarm() {
      this.alarmDialogVisible = false;
    },
    filterList(val, num) {
      console.log(val);
      // const date = new Date().getTime();
      // if (val === 'alarm') {
      //   this.$refs.table1.tableSetting.param.filters.rules = [{ key: 'alarmTime', filter: date }];
      //   this.activeName = 'first';
      // } else if (val === 'event') {
      //   this.$refs.table2.tableSetting.param.filters.rules = [{ key: 'alarmTime', filter: date }];
      //   this.activeName = 'second'
      // } else if (val === 'untreated') {
      //   this.param.filters.rules = [{ key: 'untreated', filter: 1 }];
      //   this.activeName = 'three'
      // } else if (val === 'level') {
      //   this.param.filters.rules = [{ field: 'alarmLevel', op: 'eq', data: num + '' }];
      //   this.activeName = 'three'
      // }
    },
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  font-size: 14px;
  padding: 22px 10px;
  padding-bottom: 0;
  box-sizing: border-box;
  background-color: #eeeff4;
  .new-warn {
    width: 100%;
    text-align: center;
    margin-bottom: 15px;
    text-decoration: underline;
    color: #5466e0;
    cursor: pointer;
  }
  .tabs-body {
    display: inline-block;
    width: 100%;
    height: calc(100vh - 164px);
    overflow: auto;
  }
  .headMenu {
    height: 60px;
    overflow: hidden;
    margin-bottom: 20px;
    .headMenuLeft {
      color: #0d0d0d;
      height: 60px;
      line-height: 60px;
      padding: 0;
    }
    .headMenuRight {
      vertical-align: top;
      .alarm-event,
      .alarm-level {
        height: 60px;
        line-height: 60px;
        background-color: #fff;
        box-sizing: border-box;
        color: #0d0d0d;
        margin-right: 15px;
        cursor: pointer;
        .alarm-event-text {
          font-size: 14px;
          vertical-align: middle;
          padding-left: 15%;
        }
        .alarm-event-num {
          font-size: 18px;
          color: #5466e0;
          padding-left: 15%;
          vertical-align: middle;
        }
        i {
          padding-left: 26px;
          color: #d9d9d9;
          font-size: 35px;
          vertical-align: middle;
          opacity: 85%;
        }
        .before {
          float: right;
          padding-left: 0;
          margin-right: 15px;
        }
        // 防止盒子内元素下掉
        @media screen and (max-width: 1650px) {
          .alarm-event-text,
          .alarm-event-num {
            padding-left: 5%;
          }
          i {
            padding-left: 8%;
          }
        }
      }
      .alarm-level {
        margin-right: 0;
        width: 100%;
        .untreated {
          width: 24%;
          float: left;
          span:nth-child(1) {
            font-size: 16px;
            color: #0d0d0d;
            vertical-align: middle;
          }
          span:nth-child(2) {
            font-size: 18px;
            color: #5466e0;
            padding-left: 1%;
            vertical-align: middle;
          }
        }
        .untreated:before {
          content: "";
          width: 4px;
          height: 10px;
          display: inline-block;
          background-color: #5466e0;
          margin-left: 15%;
          margin-right: 4px;
          vertical-align: middle;
        }
        .deadly {
          color: red;
          i {
            color: red;
          }
        }
        .serious {
          color: #fa7c00;
          i {
            color: #fa7c00;
          }
        }
        .general {
          color: #ffc600;
          i {
            color: #ffc600;
          }
        }
        .prompt {
          color: #a09116;
          i {
            color: #a09116;
          }
        }
        .iconBox {
          width: 19%;
          float: left;
          i {
            font-size: 14px;
            margin-right: 4px;
            vertical-align: middle;
          }
          span:nth-of-type(1) {
            font-size: 14px;
            padding-right: 8%;
            vertical-align: middle;
            color: #b2b2b2;
          }
          span:nth-of-type(2) {
            font-size: 18px;
            vertical-align: middle;
          }
        }
        .iconBox:before {
          content: "";
          float: left;
          width: 1px;
          height: 36px;
          margin-top: 12px;
          background-color: #eeeeee;
        }
      }
    }
  }
  .tabs-body {
    position: relative;
    padding: 18px 10px;
    background-color: #fff;
    .tabs-right-head {
      position: absolute;
      top: 6px;
      right: 10px;
      z-index: 99;
    }
  }
  .dialog-from >>> .el-input--prefix {
    .el-input__inner {
      padding-left: 5px;
    }
    .el-input__prefix {
      font-size: 16px;
      color: #9599eb;
      left: 100%;
      transform: translateX(-100%);
    }
  }
  .dialog-footer {
    .confirmBtn,
    .closeBtn {
      height: 34px;
      padding: 0 26px;
      border-radius: 4px;
      font-size: 14px;
      background-color: #5466e0;
    }
    .closeBtn {
      background-color: #f89744;
    }
  }
}
// 记得把当前致命告警抽离出去
.alarmDialag >>> .el-dialog {
  .el-dialog__header {
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(to right, #f74545, #f74545);
    padding: 0;
    .el-dialog__title {
      color: #fff;
      font-size: 20px;
      display: flex;
    }
    .el-dialog__title:before {
      content: "\e7a0";
      font-size: 64px;
      font-family: "iconfont";
      margin-right: 10px;
      align-items: center;
    }
    .el-dialog__headerbtn {
      top: 0;
      right: 0;
      .el-dialog__close {
        color: #fff;
        font-size: 16px;
        opacity: 67%;
      }
    }
  }
  .el-dialog__body {
    color: #999999;
    font-size: 16px;
    line-height: 40px;
    .el-col {
      margin-bottom: 20px;
    }
  }
  .dialog-footer {
    .confirmBtn,
    .closeBtn {
      height: 34px;
      padding: 0 26px;
      border-radius: 4px;
      font-size: 14px;
      background-color: #5466e0;
    }
    .closeBtn {
      background-color: #f89744;
    }
  }
}
</style>
