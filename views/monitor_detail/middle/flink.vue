<template>
  <div class="detail_body">
    <el-row class="detail_box run_count_box" :gutter="20">
      <el-col :span="4">
        <div class="detail run_detail">
          <div class="title">
            <span class="box_title">运行状态</span>
          </div>
          <div class="main detail_info">
            <!-- <div class="row ">
              <span class="">
                运行时长：
                <span class="black">{{ detailData.runTime }}</span>
              </span>
            </div>-->
            <div class="row row_two">
              <span class="">
                运行状态：
                <i
                  class="small_round"
                  :style="{backgroundColor: detailData.runState === 'OK' ? runStateColor : runStopColor}"
                ></i>
                <span class="black">{{ detailData.runState | SwitchStatus }}</span>
              </span>
            </div>
          </div>
          <div class="iconfont iconicon_cog"></div>
        </div>
      </el-col>
      <el-col :span="8" class="count_box" style="padding-right: 0;">
        <div class="detail count_detail">
          <div class="title">
            <span class="box_title">统计</span>
          </div>
          <div class="main detail_info">
            <div class="row">
              <span class="">
                注册任务管理器数：
                <span class="black">{{ detailData.numRegisteredTaskManagers }}</span>
              </span>
            </div>
            <div class="row row_two">
              <span class="">
                正在运行的作业数量：
                <span class="black">{{ detailData.numRunningJobs }}</span>
              </span>
            </div>
            <div class="row row_three">
              <span class="">
                任务槽的总数：
                <span class="black">{{ detailData.taskSlotsTotal }}</span>
              </span>
            </div>
            <div class="row row_four">
              <span class="">
                可用任务槽数量：
                <span class="black">{{ detailData.taskSlotsAvailable }}</span>
              </span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="lineChart_box" style="padding-left: 0;">
        <div class="detail lineChart_detail">
          <div class="lineChart">
            <div class="lineChart_title">近段时间io读写速率(kb/s)</div>
            <div class="lineChart_body">
              <div class="lineChart_title">(个)</div>
              <div class="box">
                <echarts-line style="height:200px" :charts-data="chartsData" class="echarts"></echarts-line>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="detail_box memory_active_box" :gutter="20">
      <el-col :span="12">
        <div class="detail lineChart_detail">
          <div class="title">
            <span class="box_title">堆内存</span>
            <span class="info two">
              堆内存使用率：
              <span class="title_yellow">{{ $common.getNumber(detailData.heapUsage) }}%</span>
            </span>
            <span class="info three">
              堆内存已使用：
              <span class="title_blue">{{ detailData.heapUsed | sizeFormatter }}</span>
            </span>
            <span class="info four">
              堆内存最大可用：
              <span class="title_blue">{{ detailData.heapCommitted | sizeFormatter }}</span>
            </span>
          </div>
          <div class="lineChart">
            <div class="lineChart_title">
              <span>(%)</span>
            </div>
            <div class="lineChart_body">
              <echarts-line style="height:230px" :charts-data="chartsData2" class="echarts"></echarts-line>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="detail lineChart_detail">
          <div class="title">
            <span class="box_title">活动线程数</span>
            <span class="box_title_center">
              当前活动线程数：
              <span class="title_blue">{{ detailData.activeThreadsPerMin }}个</span>
            </span>
          </div>
          <div class="lineChart">
            <div class="lineChart_title">
              <span>(个)</span>
            </div>
            <div class="lineChart_body">
              <echarts-line style="height:230px" :charts-data="chartsData3" class="echarts"></echarts-line>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="detail_box gc_box">
      <el-col :span="12">
        <div class="detail lineChart_detail one">
          <div class="title">
            <span class="box_title">GC</span>
            <span class="box_title_center">
              近段时间老年代GC执行次数:
              <span class="title_blue">{{ detailData.fullGcCountPerMin }}次/秒</span>
            </span>
          </div>
          <div class="lineChart">
            <div class="lineChart_title">
              <span>近段时间老年代GC执行次数(次)</span>
            </div>
            <div class="lineChart_body">
              <echarts-line style="height:260px" :charts-data="chartsData4" class="echarts"></echarts-line>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="detail lineChart_detail two">
          <div class="title">
            <span class="box_title_center">
              年轻代GC执行次数：
              <span class="title_blue">{{ detailData.youngGcCountPerMin }}次/秒</span>
            </span>
          </div>
          <div class="lineChart">
            <div class="lineChart_title">
              <span class="box_title">近段时间年轻代GC执行次数（次）</span>
            </div>
            <div class="lineChart_body">
              <echarts-line style="height:260px" :charts-data="chartsData5" class="echarts"></echarts-line>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="detail_box describe_box">
      <el-col :span="24">
        <div class="describe_detail">
          <div class="detail">
            <div class="title">
              <span class="box_title">基本信息</span>
            </div>
            <div class="information">
              <el-row>
                <el-col :span="8">
                  中间件名称：
                  <span class="black">{{ detailData.cmMeInfoEntity.meName }}</span>
                </el-col>
                <el-col :span="8">
                  所在区域：
                  <span class="black">{{ getAreaName(detailData.cmMeInfoEntity.areaId) }}</span>
                </el-col>
                <!-- <el-col :span="12">
                  版本信息：
                  <span class="black">{{ detailData.cmMeInfoEntity.meModel }}</span>
                </el-col>-->
                <el-col :span="8">
                  中间件类型：
                  <span class="black">{{ getTypeName(detailData.cmMeInfoEntity.meTypeId) }}</span>
                </el-col>
                <el-col :span="24">
                  所在服务器：
                  <span class="black">{{ detailData.serverName }}</span>
                </el-col>
                <el-col :span="24" class="last_info">
                  <span class="title">中间件描述：</span>
                  <span class="black content">{{ detailData.cmMeInfoEntity.comments || '暂无描述' }}</span>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getFlinkDetail } from '@/api/middleDetail';
export default {
  data () {
    return {
      runStateColor: '#27B102',
      runStopColor: '#ccc',
      detailData: null,
      chartsData: {
        x: ['11:10', '11:20', '11:30', '11:40', '11:50', '12:00', '12:10', '12:20', '12:30', '12:40', '12:50', '13:00'],
        y: [60, 77, 91, 90, 65, 73, 78, 20, 88, 66, 71, 54],
        // markLine: { yAxis: 2000, name: '门限' },
        style: 'purple'
      },
      chartsData2: {
        x: ['11:10', '11:20', '11:30', '11:40', '11:50', '12:00', '12:10', '12:20', '12:30', '12:40', '12:50', '13:00'],
        y: [60, 77, 91, 90, 65, 73, 78, 80, 88, 66, 71, 54],
        // markLine: { yAxis: 2000, name: '门限' },
        style: 'green'
      },
      chartsData3: {
        x: ['11:10', '11:20', '11:30', '11:40', '11:50', '12:00', '12:10', '12:20', '12:30', '12:40', '12:50', '13:00'],
        y: [60, 77, 61, 90, 65, 73, 78, 50, 88, 66, 71, 54],
        // markLine: { yAxis: 2000, name: '门限' },
        style: 'purple'
      },
      chartsData4: {
        x: ['11:10', '11:20', '11:30', '11:40', '11:50', '12:00', '12:10', '12:20', '12:30', '12:40', '12:50', '13:00'],
        y: [60, 77, 61, 90, 65, 73, 78, 50, 38, 66, 71, 54],
        // markLine: { yAxis: 2000, name: '门限' },
        style: 'purple'
      },
      chartsData5: {
        x: ['11:10', '11:20', '11:30', '11:40', '11:50', '12:00', '12:10', '12:20', '12:30', '12:40', '12:50', '13:00'],
        y: [60, 47, 61, 90, 65, 73, 78, 50, 88, 86, 71, 54],
        // markLine: { yAxis: 2000, name: '门限' },
        style: 'green'
      }
    }
  },
  computed: {
    getAreaName (id) {
      return function (id) {
        return this.$store.getters['layout/getAreaName'](id)
      }
    },
    getTypeName (id) {
      return function (id) {
        return this.$store.getters['layout/getTypeName'](id)
      }
    }
  },
  created () {
    this.getData();
  },
  methods: {
    getData () {
      getFlinkDetail(this.$route.query.cmId).then((res) => {
        this.detailData = res;
        this.chartsData.x = this.formatCharts(
          this.detailData.taskTimeMetricRespList
        ).x;
        this.chartsData.y = this.formatCharts(
          this.detailData.taskTimeMetricRespList
        ).y;
        this.chartsData2.x = this.formatCharts(
          this.detailData.memoryTimeMetricRespList
        ).x;
        this.chartsData2.y = this.formatCharts(
          this.detailData.memoryTimeMetricRespList
        ).y;
        this.chartsData3.x = this.formatCharts(
          this.detailData.threadsTimeMetricRespList
        ).x;
        this.chartsData3.y = this.formatCharts(
          this.detailData.threadsTimeMetricRespList
        ).y;
        this.chartsData4.x = this.formatCharts(
          this.detailData.fullGcTimeMetricRespList
        ).x;
        this.chartsData4.y = this.formatCharts(
          this.detailData.fullGcTimeMetricRespList
        ).y;
        this.chartsData5.x = this.formatCharts(
          this.detailData.youngGcTimeMetricRespList
        ).x;
        this.chartsData5.y = this.formatCharts(
          this.detailData.youngGcTimeMetricRespList
        ).y;
      })
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
.detail_body {
  .tables {
    background-color: #ffffff;
    height: calc(100% - 52px);
    width: 100%;
    >>> .el-table__body-wrapper {
      height: calc(224px - 57px);
      overflow-y: scroll;
    }
  }
  .run_count_box {
    // 运行情况
    .detail {
      position: relative;
      height: 300px;
      font-size: 14px;
      color: #666;
      .lineChart_title {
        display: inline-block;
        height: 22px;
        line-height: 22px;
      }
      .detail_info {
        .row {
          margin-bottom: 25px;
        }
      }
    }
    .lineChart_detail {
      border-left: 1px solid rgba(219, 219, 219, 0.52);
      // .lineChart_body {
      //   margin-left: 40px;
      // }
    }
  }
  .memory_active_box {
    .detail {
      height: 331px;
      .title {
        .info {
          display: inline-block;
          width: 26%;
          text-align: center;
          .title_yellow {
            color: #ffd04e;
          }
          .title_blue {
            color: #6474e2;
          }
        }
      }
    }
  }
  .gc_box {
    .detail {
      height: 391px;
    }
    .lineChart_detail {
      .lineChart {
        padding-top: 30px;
      }
      .box_title_center {
        margin-top: 30px;
      }
    }
    .lineChart_detail.two {
      border-left: 1px solid rgba(219, 219, 219, 0.52);
    }
  }
  .describe_box {
    .detail {
      height: 229px;
    }
  }
}
</style>
