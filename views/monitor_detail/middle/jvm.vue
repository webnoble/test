<template>
  <div class="detail_body">
    <el-row class="detail_box run_space_line_box" :gutter="20">
      <el-col :span="4">
        <div class="detail run_detail">
          <div class="title">
            <span class="box_title">运行状态</span>
          </div>
          <div class="main detail_info">
            <div class="row row_one">
              <span class="col_one">
                运行时长：
                <span class="black">{{ detailData.runTime | timeFormatter }}</span>
              </span>
            </div>
            <div class="row row_two">
              <span class="col_one">
                当前类加载数量：
                <span class="black">{{ detailData.loadedClassCount }}</span>
              </span>
            </div>
            <div class="row row_three">
              <span class="col_one">
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
      <el-col :span="11">
        <div class="detail space_detail histogram_box">
          <div class="title">
            <span class="box_title">空间使用情况</span>
          </div>
          <el-row :gutter="16" class="histogram_box">
            <el-col :span="12">
              <div class="histogram_small">
                <span class="top_disk">eden:</span>
                <div
                  class="middle_info"
                  :class="maxClass(detailData.edenSpaceUsed / detailData.edenSpaceMax) && 'maxClass'"
                >
                  <div class="figure">
                    <div
                      class="figure_small"
                      :style="{width : $common.getNumber(detailData.edenSpaceUsed / detailData.edenSpaceMax * 100) + '%'}"
                    ></div>
                  </div>
                  <span
                    class="percentage"
                  >{{ detailData.edenSpaceUsed / detailData.edenSpaceMax | precent }}</span>
                </div>
                <div class="bottom_size">
                  <span class="leftInfo">已使用{{ detailData.edenSpaceUsed | sizeFormatter }}</span>
                  <span class="rightInfo">(共{{ detailData.edenSpaceMax | sizeFormatter }})</span>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="histogram_small">
                <span class="top_disk">survivor:</span>
                <div
                  class="middle_info"
                  :class="maxClass(detailData.survivorSpaceUsed / detailData.survivorSpaceMax) && 'maxClass'"
                >
                  <div class="figure">
                    <div
                      class="figure_small"
                      :style="{width : $common.getNumber(detailData.survivorSpaceUsed / detailData.survivorSpaceMax * 100) + '%'}"
                    ></div>
                  </div>
                  <span
                    class="percentage"
                  >{{ detailData.survivorSpaceUsed / detailData.survivorSpaceMax | precent }}</span>
                </div>
                <div class="bottom_size">
                  <span class="leftInfo">已使用{{ detailData.survivorSpaceUsed | sizeFormatter }}</span>
                  <span class="rightInfo">(共{{ detailData.survivorSpaceMax | sizeFormatter }})</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="16" class="histogram_box">
            <el-col :span="12">
              <div class="histogram_small">
                <span class="top_disk">oldGen:</span>
                <div
                  class="middle_info"
                  :class="maxClass(detailData.oldGenUsed / detailData.oldGenMax) && 'maxClass'"
                >
                  <div class="figure">
                    <div
                      class="figure_small"
                      :style="{width : $common.getNumber(detailData.oldGenUsed / detailData.oldGenMax * 100) + '%'}"
                    ></div>
                  </div>
                  <span
                    class="percentage"
                  >{{ detailData.oldGenUsed / detailData.oldGenMax | precent }}</span>
                </div>
                <div class="bottom_size">
                  <span class="leftInfo">已使用{{ detailData.oldGenUsed | sizeFormatter }}</span>
                  <span class="rightInfo">共{{ detailData.oldGenMax | sizeFormatter }}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="histogram_small">
                <span class="top_disk">PermGen:</span>
                <div
                  class="middle_info"
                  :class="maxClass(detailData.permGenUsed / detailData.permGenMax) && 'maxClass'"
                >
                  <div class="figure">
                    <div
                      class="figure_small"
                      :style="{width : $common.getNumber(detailData.permGenUsed / detailData.permGenMax * 100) + '%'}"
                    ></div>
                  </div>
                  <span
                    class="percentage"
                  >{{ detailData.permGenUsed / detailData.permGenMax | precent }}</span>
                </div>
                <div class="bottom_size">
                  <span class="leftInfo">已使用{{ detailData.permGenUsed | sizeFormatter }}</span>
                  <span class="rightInfo">(共{{ detailData.permGenMax | sizeFormatter }})</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="16" class="histogram_box">
            <el-col :span="12">
              <div class="histogram_small">
                <span class="top_disk">metaspace:</span>
                <div
                  class="middle_info"
                  :class="maxClass(detailData.metaspaceUsed / detailData.metaspaceMax) && 'maxClass'"
                >
                  <div class="figure">
                    <div
                      class="figure_small"
                      :style="{width : $common.getNumber(detailData.metaspaceUsed / detailData.metaspaceMax * 100) + '%'}"
                    ></div>
                  </div>
                  <span
                    class="percentage"
                  >{{ detailData.metaspaceUsed / detailData.metaspaceMax | precent }}</span>
                </div>
                <div class="bottom_size">
                  <span class="leftInfo">已使用{{ detailData.metaspaceUsed | sizeFormatter }}</span>
                  <span class="rightInfo">共{{ detailData.metaspaceMax | sizeFormatter }}</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="detail line_detail">
          <div class="title lineChart">
            <span class="box_title">线程数</span>
            <span class="rightBox">
              <span class="square one">当前线程数：{{ detailData.threadCount }}</span>
              <span class="square two">峰值线程数：{{ detailData.peakThreadCount }}</span>
            </span>
          </div>
          <div class="lineChart">
            <div class="lineChart_body">
              <echarts-line style="height:330px" :charts-data="chartsData" class="echarts"></echarts-line>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="detail_box memory_box">
      <el-col :span="7">
        <div class="detail memory_detail">
          <div class="title">
            <span class="box_title">堆内存</span>
          </div>
          <div class="round-box">
            <CircleBar
              style="width : 6.8vw;height : 6.8vw;"
              :circle-data="circleData"
              class="roundBar"
            />
            <div
              class="usage"
            >堆内存使用率:{{ $common.getNumber(circleData.precent) }}%({{ detailData.heapUsed | sizeFormatter }}/共{{ detailData.heapMax | sizeFormatter }})</div>
          </div>
        </div>
      </el-col>
      <el-col :span="17">
        <div class="detail lineChart_detail">
          <div class="title">
            <span class="box_title">使用率</span>
          </div>
          <div class="lineChart">
            <div class="lineChart_body">
              <echarts-line style="height:220px" :charts-data="chartsData2" class="echarts"></echarts-line>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="detail_box gc_box">
      <el-col :span="12">
        <div class="detail GC_detail">
          <div class="title">
            <span class="box_title">GC</span>
            <div class="box_title_center">
              当前老年代GC执行次数：
              <span class="title_blue">{{ detailData.oldGcCount }} 次/秒</span>
            </div>
          </div>
          <div class="lineChart" style="width: 100%;">
            <div class="lineChart_title">近期老年代GC执行次数(次)</div>
            <div class="lineChart_body">
              <echarts-line style="height:220px" :charts-data="oldData" class="echarts"></echarts-line>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="detail GC_detail">
          <div class="title">
            <div class="box_title_center two">
              当前年轻代GC执行次数：
              <span class="title_blue">{{ detailData.youngGcCount }} 次/秒</span>
            </div>
          </div>
          <div class="lineChart" style="width: 100%;">
            <div class="lineChart_title">近期年轻代GC执行次数(次)</div>
            <div class="lineChart_body">
              <echarts-line style="height:220px" :charts-data="youngData" class="echarts"></echarts-line>
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
                <el-col :span="6">
                  中间件名称：
                  <span class="black">{{ detailData.cmMeInfoEntity.meName }}</span>
                </el-col>
                <el-col :span="6">
                  所在区域：
                  <span class="black">{{ getAreaName(detailData.cmMeInfoEntity.areaId) }}</span>
                </el-col>
                <el-col :span="12">
                  版本信息：
                  <span class="black">{{ detailData.version }}</span>
                </el-col>
                <el-col :span="6">
                  中间件类型：
                  <span class="black">{{ getTypeName(detailData.cmMeInfoEntity.meTypeId) }}</span>
                </el-col>
                <el-col :span="18">
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
import { getJvmDetail } from '@/api/middleDetail';
export default {
  filters: {
    precent (limit) {
      if (!limit) {
        return '0%';
      } else if (limit < 0) {
        return '100%';
      }
      console.log(limit);
      return (limit * 100).toFixed(2) + '%';
    }
  },
  data () {
    return {
      runStateColor: '#27B102',
      runStopColor: '#ccc',
      detailData: null,
      diskName: ['eden', 'survivor', 'oldGen', 'PermGen', 'metaspace'],
      chartsData: {
        x: ['11:10', '11:20', '11:30', '11:40', '11:50', '12:00', '12:10', '12:20', '12:30', '12:40', '12:50', '13:00'],
        y: [
          [1060, 1870, 2000, 2300, 1000, 1130, 1080, 2100, 1200, 1300, 1100, 1800, 1500],
          [1100, 1800, 1500, 1200, 1300, 1060, 1870, 2000, 2300, 1000, 1130, 1080, 2100]
        ],
        multiple: true,
        markLine: { yAxis: 2000, name: '门限' },
        style: 'multipleStyle'
      },
      chartsData2: {
        x: ['11:10', '11:20', '11:30', '11:40', '11:50', '12:00', '12:10', '12:20', '12:30', '12:40', '12:50', '13:00'],
        y: [1000, 1300, 1100, 2000, 1500, 2660, 1870, 2000, 2300, 1000, 1130, 1080, 2100],
        markLine: { yAxis: 2000, name: '门限' },
        style: 'purple'
      },
      oldData: {
        x: [],
        y: [],
        markLine: { yAxis: 2000, name: '门限' },
        style: 'green'
      },
      youngData: {
        x: [],
        y: [],
        markLine: { yAxis: 2000, name: '门限' },
        style: 'green'
      },
      circleData: {
        precent: 75
        // width: 100,
        // borderWidth: 8
      },
      fieldArr: [
        {
          label: '流程名称',
          key: 'name',
          formatter: ''
        }, {
          label: '流程状态',
          key: 'state',
          filters: [{ text: '进行中', value: '进行中' }, { text: '已完结', value: '已完结' }, { text: '已拒绝', value: '已拒绝' }]

        }, {
          label: '发起时间',
          key: 'time',
          formatter: ''
        }, {
          label: '耗时',
          key: 'payTime'
        }
      ]
    }
  },
  computed: {
    precent () {
      return function (text) {
        if (!text) {
          return '0%';
        } else if (text < 0) {
          return '100%';
        }
        return text.toFixed(2) * 100 + '%';
      }
    },
    maxClass () {
      return function (text) {
        if (text.toFixed(2) * 100 >= 90) {
          return true;
        } else {
          return false;
        }
      }
    },
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
      getJvmDetail(this.$route.query.cmId).then((res) => {
        this.detailData = res;
        this.circleData.precent = this.$common.getNumber(this.detailData.heapUsedPercent);
        this.chartsData.x = this.formatCharts(
          this.detailData.threadCountList
        ).x;
        this.chartsData.y[0] = this.formatCharts(
          this.detailData.threadCountList
        ).y;
        this.chartsData.y[1] = this.formatCharts(
          this.detailData.peakThreadCountList
        ).y;
        this.chartsData2.x = this.formatCharts(
          this.detailData.heapUsedPercentList
        ).x;
        this.chartsData2.y = this.formatCharts(
          this.detailData.heapUsedPercentList
        ).y;
        this.oldData.x = this.formatCharts(
          this.detailData.oldGcCountList
        ).x;
        this.oldData.y = this.formatCharts(
          this.detailData.oldGcCountList
        ).y;
        this.youngData.x = this.formatCharts(
          this.detailData.youngGcCountList
        ).x;
        this.youngData.y = this.formatCharts(
          this.detailData.youngGcCountList
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
  .run_space_line_box {
    // 运行情况
    .detail {
      position: relative;
      height: 390px;
      font-size: 14px;
      color: #666;
      .lineChart.title {
        padding-right: 20px;
      }
      .rightBox {
        .square {
          text-align: right;
        }
        .square.two {
          margin-left: 20px;
        }
      }
      .histogram_box {
        .maxClass {
          .figure_small {
            background-color: #f13e3e;
          }
          .percentage {
            color: #f13e3e;
          }
        }
      }
    }
  }
  .memory_box {
    .detail {
      height: 287px;
      color: #000;
      .round-box {
        >>> .roundBar {
          width: 100px;
          height: 100px;
          top: 40%;
          .number {
            top: 8%;
            right: 8%;
            bottom: 8%;
            left: 8%;
            font-size: 30px;
          }
        }
        .usage {
          color: #666666;
          top: calc(40% + 80px);
        }
      }
    }
    .lineChart_detail {
      border-left: 1px solid rgba(219, 219, 219, 0.52);
    }
  }
  .gc_box {
    .detail {
      height: 370px;
      .box_title_center {
        width: 100%;
        text-align: center;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid rgba(219, 219, 219, 0.52);
      }
      .box_title_center.two {
        margin-top: 22px;
      }
      .lineChart {
        position: absolute;
        top: 114px;
      }
    }
    .lineChart_detail {
      border: 1px solid rgba(219, 219, 219, 0.52);
    }
  }
  .describe_box {
    .detail {
      height: 229px;
    }
  }
}
</style>
