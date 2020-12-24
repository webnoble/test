<!--
 * @Author: your name
 * @Date: 2020-05-29 10:00:05
 * @LastEditTime: 2020-05-29 10:33:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \monitor\src\views\monitor\detail\soft_detail.vue
-->
<template>
  <div class="soft_detail">
    <div class="headNav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/soft' }">应用监控软件</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.query.jappName }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button @click="$router.back(-1)">返回</el-button>
    </div>
    <div class="detail_body">
      <el-row class="detail_box run_process_box">
        <el-col :span="5">
          <div class="detail run_detail" style="margin-right: 22px;">
            <div class="title">
              <span class="box_title">运行情况</span>
            </div>
            <div>
              <div class="row row_one">
                <span>
                  运行时长 :
                  <span class="black">{{ detailData.baseResp.runningTime | timeFormatter }}</span>
                </span>
              </div>
              <div class="row row_two">
                <span>
                  运行状态：
                  <i
                    class="small_round"
                    :style="{backgroundColor: detailData.baseResp.runState === 'OK' ? runStateColor : runStopColor}"
                  ></i>
                  <span class="black">{{ detailData.baseResp.runState | SwitchStatus }}</span>
                </span>
              </div>
            </div>
            <div class="iconfont iconicon_cog"></div>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="detail process_detail">
            <div class="title">
              <span class="box_title">流程</span>
            </div>
            <div>
              <div class="row">
                <span>
                  流程总数 :
                  <span class="black">{{ processData.processResp.totalProcess }}</span>
                </span>
              </div>
              <div class="row">
                <span>
                  当前审批流程 :
                  <span class="black">{{ processData.processResp.currentProcess }}</span>
                </span>
              </div>
              <div class="row">
                <span>
                  已完成流程 :
                  <span class="black">{{ processData.processResp.finishProcess }}</span>
                </span>
              </div>
              <div class="row">
                <span>
                  已拒绝流程 :
                  <span class="black">{{ processData.processResp.rejectProcess }}</span>
                </span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="detail">
            <v-table :field-arr="fieldArr" :table-setting.sync="tableSetting" class="tables"/>
            <!-- <dynamic-table :field-arr="fieldArr" :getters="getters" :height="212" class="tables"/> -->
          </div>
        </el-col>
      </el-row>
      <el-row class="detail_box system_box">
        <el-col>
          <div class="detail run_detail" style="height:auto">
            <div class="title">
              <span class="box_title">系统</span>
              <div class="tips">
                <p>今日请求耗时详情（注：默认时间排序，点击切换耗时排序）</p>
                <div class="buttons">
                  <span>时间排序</span>
                  <span>耗时排序</span>
                </div>
              </div>
            </div>
            <div class="sysTable">
              <v-table
                :field-arr="fieldArr2"
                :table-setting.sync="tableSetting2"
                class="tables"
                style="max-height : 600px;"
              />
            </div>
            <el-row style="padding-top: 26px;border-top: 1px solid #EEEFFF;">
              <el-col :span="12">
                <div class="nums">
                  每分钟请求个数:
                  <strong>{{ chartsData.y[chartsData.y.length - 1] }}</strong>
                </div>
                <echarts-line style="height:240px" :charts-data="chartsData"></echarts-line>
              </el-col>
              <el-col :span="12">
                <div class="nums">
                  今日异常:
                  <strong>{{ exceptionData.exceptionTotal }}</strong>
                </div>
                <v-table
                  :field-arr="fieldArr3"
                  :table-setting.sync="tableSetting3"
                  class="tables"
                  style="height : 240px;"
                />
                <!-- <dynamic-table :field-arr="abnormalArr" :getters="getters" :height="240" class="tables" /> -->
              </el-col>
            </el-row>
            <!-- <div class="title">
              <span class="box_title">流程</span>
            </div>-->
          </div>
        </el-col>
      </el-row>
      <el-row class="detail_box describe_box">
        <el-col :span="24">
          <div class="detail describe_detail">
            <div class="title">
              <span class="box_title">基本信息</span>
            </div>
            <div class="information">
              <el-row>
                <el-col :span="6">
                  应用软件名称：
                  <span class="black">{{ detailData.baseResp.jappName }}</span>
                </el-col>
                <el-col :span="18">
                  所在区域：
                  <span class="black">{{ getAreaName(detailData.baseResp.areaId) }}</span>
                </el-col>
                <el-col :span="6">
                  版本号：
                  <span class="black">{{ detailData.baseResp.version }}</span>
                </el-col>
                <el-col :span="18">
                  所在服务器：
                  <span class="black">{{ detailData.baseResp.serverName }}</span>
                </el-col>
                <el-col :span="24" class="last_info">
                  <span class="title">应用软件描述：</span>
                  <span class="black content">{{ detailData.baseResp.jappDescribe || '暂无描述' }}</span>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getJapp, getJappProcess, getJappUrl, getException } from '@/api/soft';
export default {
  data () {
    return {
      timeRun: '',
      tableSetting: {
        pagination: {
          show: false,
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
        // apiUrl: 'soft/list',
        data: {
          items: []
        },
        socket: {
          url: 'http://localhost:9999/echo',
          subscribe: 'data',
          tagName: 'id'
        },
        isPoll: true,
        pollTime: 300000
      },
      tableSetting2: {
        pagination: {
          show: false,
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
        // 暂时无分页，先不使用此种方式进行获取数据
        // apiUrl: 'japp/url_details?cmId=' + this.$route.query.cmId,
        data: {
          items: []
        },
        socket: {
          url: 'http://localhost:9999/echo',
          subscribe: 'data',
          tagName: 'id'
        },
        isPoll: true,
        pollTime: 300000
      },
      tableSetting3: {
        pagination: {
          show: false,
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
        data: {
          items: []
        },
        socket: {
          url: 'http://localhost:9999/echo',
          subscribe: 'data',
          tagName: 'id'
        },
        isPoll: true,
        pollTime: 300000
      },
      fieldArr2: [
        {
          label: 'URL',
          key: 'url'
        }, {
          label: '平均耗时',
          key: 'duration',
          formatter: size => {
            return this.getTime(size)
          }
        }, {
          label: '请求次数',
          key: 'reqCount'
        }
      ],
      fieldArr3: [
        {
          label: '异常类型',
          key: 'exceptionType'
        }, {
          label: '异常发生时间',
          key: 'exceptionTime',
          formatter: {
            type: 'time'
          }
        }
      ],
      chartsData: {
        x: ['11:10', '11:20', '11:30', '11:40', '11:50', '12:00', '12:10', '12:20', '12:30', '12:40', '12:50', '13:00'],
        y: [2200, 1300, 2600, 1800, 1500, 1060, 1870, 2000, 2300, 1000, 1130, 1080, 2100],
        // markLine: { yAxis: 2000, name: 'test' },
        style: 'green'
      },
      runStateColor: '#27B102',
      runStopColor: '#ccc',
      getters: 'monitor/soft/flowList',
      // fieldArr: [
      //   {
      //     label: '流程名称',
      //     key: 'processName',
      //     width: '180'
      //   }, {
      //     label: '流程状态',
      //     key: 'processState',
      //     filters: [{ text: '进行中', value: '进行中' }, { text: '已完结', value: '已完结' }, { text: '已拒绝', value: '已拒绝' }],
      //     formatter: this.processStatus
      //     // formatter: [
      //     //   {
      //     //     key: 'COMPLETE',
      //     //     label: '运行中'
      //     //   },
      //     //   {
      //     //     key: 'EXECUTION',
      //     //     label: '已完结'
      //     //   }
      //     // ]
      //   }, {
      //     label: '发起时间',
      //     key: 'startTime',
      //     formatter: {
      //       type: 'time'
      //     }
      //   }, {
      //     label: '耗时',
      //     key: 'duration',
      //     formatter: size => {
      //       return this.getTime(size)
      //     }
      //   }
      // ],
      // 基本数据
      detailData: null,
      // 流程数据
      processData: null,
      // 异常数据
      exceptionData: {}
    }
  },
  computed: {
    getTime (size) {
      return function (size) {
        return this.$store.getters['layout/getTime'](size)
      }
    },
    getAreaName (id) {
      return function (id) {
        return this.$store.getters['layout/getAreaName'](id)
      }
    },
    processStatus () {
      return this.$store.getters['layout/processStatus']
    },
    fieldArr () {
      return [
        {
          label: '流程名称',
          key: 'processName',
          width: '180'
        }, {
          label: '流程状态',
          key: 'processState',
          filters: [{ text: '进行中', value: '进行中' }, { text: '已完结', value: '已完结' }, { text: '已拒绝', value: '已拒绝' }],
          formatter: this.processStatus
          // formatter: [
          //   {
          //     key: 'COMPLETE',
          //     label: '运行中'
          //   },
          //   {
          //     key: 'EXECUTION',
          //     label: '已完结'
          //   }
          // ]
        }, {
          label: '发起时间',
          key: 'startTime',
          formatter: {
            type: 'time'
          }
        }, {
          label: '耗时',
          key: 'duration',
          formatter: size => {
            return this.getTime(size)
          }
        }
      ]
    }
  },
  mounted () {
    this.getJappList();
    this.timeRun = setInterval(() => {
      this.getJappList();
    }, 300000)
    // this.timeRun = setInterval(() => {
    //   this.getJappList();
    // }, 8000)
  },
  destroyed () {
    window.clearInterval(this.timeRun)
  },
  methods: {
    getJappList () {
      // 获取整体详情数据
      getJapp(this.$route.query.cmId).then(res => {
        this.detailData = res;
        // this.tableSetting3.data.items = this.detailData.exceptionResp;
        this.chartsData.x = this.formatCharts(
          this.detailData.reqPerResp
        ).x;
        this.chartsData.y = this.formatCharts(
          this.detailData.reqPerResp
        ).y;
        // console.log(res);
      })
      // 获取流程列表数据
      getJappProcess(this.$route.query.cmId).then(res => {
        this.processData = res;
        this.tableSetting.data.items = this.processData.processResp.processListResp;
      })
      // 获取URL列表数据
      getJappUrl(this.$route.query.cmId).then(res => {
        this.tableSetting2.data.items = res.requestDurationResp;
      })
      // 获取今日异常数据
      getException(this.$route.query.cmId).then(res => {
        this.exceptionData = res;
        this.tableSetting3.data.items = res.exceptionResp;
      })
    },
    edit (data) {
      console.log(data)
    },
    destroyed () {
      clearInterval(this.timeRun)
    },
    formatCharts (data) {
      const x = [];
      const y = [];
      if (data && data.length > 0) {
        data.forEach(item => {
          x.push(this.$dateFormat('hh:mm', new Date(item.time)));
          y.push(item.value);
        });
      }
      return { x, y };
    }
  }
}
</script>
<style lang="scss" scoped>
.soft_detail {
  .tables {
    background-color: #ffffff;
    height: 212px;
    width: 100%;
    padding: 0px;
    overflow: auto;
  }
  // .tables >>> .el-table__header {
  //   width: calc(100% + 17px) !important;
  // }
  // .tables >>> .el-table__body {
  //   width: calc(100% + 5px) !important;
  // }
  .tips {
    font-size: 14px;
    color: #000;
    overflow: hidden;
    p {
      display: inline-block;
    }
    .buttons {
      float: right;
      span {
        display: inline-block;
        padding: 5px 10px;
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.14);
      }
    }
  }
  .nums {
    font-size: 16px;
    color: #000;
    margin-bottom: 10px;
    strong {
      font-weight: bold;
    }
  }
  .sysTable {
    margin-top: 40px;
  }
  .run_process_box {
    .detail {
      height: 240px;
    }
    .process_detail {
      .row {
        margin-bottom: 20px;
      }
    }
  }
  .system_box {
    .tables {
      height: 240px;
    }
  }
  .describe_box {
    .detail {
      height: 229px;
      .last_info {
        .content {
          width: calc(100% - 104px);
        }
      }
    }
  }
}
</style>
