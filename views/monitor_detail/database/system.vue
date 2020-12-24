<template>
  <div class="detail_body">
    <el-row class="detail_box run_hardDisk_box" type="flex" align-item="stretch">
      <el-col :span="7">
        <div class="detail run_detail">
          <div class="title">
            <span class="box_title">运行情况</span>
          </div>
          <div class="detail_info">
            <div class="row row_one">
              <span class="col_one">
                运行时长：
                <span class="black">{{ info.runInfo.upTime | timeFormatter }}</span>
              </span>
              <span class="col_two">
                运行状态：
                <i class="small_round" :style="{ backgroundColor: runStateColor }"></i>
                <span class="black">{{ info.runInfo.runState | SwitchStatus }}</span>
              </span>
            </div>
            <div class="row row_two">
              <span class="col_one">
                进程数量 ：
                <span class="black">{{ info.runInfo.processCount }}</span>
              </span>
              <!-- <span class="col_two">
                线程数量 ：
                <span class="black">{{ info.runInfo.processCount }}</span>
              </span>-->
            </div>
            <!-- <div class="row row_three">
              <span class="col_one">
                最大句柄数 ：
                <span class="black">{{ info.runInfo.processCount }}</span>
              </span>
              <span class="col_two">
                当前句柄数 ：
                <span class="black">{{ info.runInfo.processCount }}</span>
              </span>
            </div>-->
          </div>
          <div class="iconfont iconicon_cog"></div>
        </div>
      </el-col>
      <el-col :span="17">
        <div class="detail hardDisk_detail">
          <el-row style="height: 100%;">
            <el-col :span="7" class="hardDisk_detail_round">
              <div class="title">
                <span class="box_title">硬盘</span>
              </div>
              <div class="round-box">
                <CircleBar
                  style="width : 6.8vw;height : 6.8vw;"
                  :circle-data="circleData"
                  class="roundBar"
                />
                <div
                  class="usage"
                >使用率:{{ $common.getNumber(info.diskMetric.diskUsedRate) + '%' }}({{ info.diskMetric.diskTotal - info.diskMetric.diskFree | sizeFormatter }}/{{ info.diskMetric.diskTotal | sizeFormatter }})</div>
              </div>
            </el-col>
            <el-col :span="17">
              <div class="space_detail histogram_box">
                <div class="title">
                  <span>分区{{ info.diskMetric.diskList.length }}个</span>
                </div>
                <el-row :gutter="16" class="histogram_box">
                  <el-col v-for="(item,key) in info.diskMetric.diskList" :key="key" :span="12">
                    <div class="histogram_small">
                      <!-- 暂未实现悬浮功能，未能成功获取宽度 -->
                      <el-tooltip
                        :disabled="true"
                        :content="item.diskName"
                        placement="top"
                        effect="light"
                      >
                        <span ref="topDisk" class="top_disk">{{ item.diskName }}:</span>
                      </el-tooltip>
                      <div class="middle_info">
                        <div class="figure">
                          <div
                            class="figure_small"
                            :style="{ width : $common.getNumber(item.diskUsedRate) + '%' }"
                          ></div>
                        </div>
                        <span class="percentage">{{ $common.getNumber(item.diskUsedRate) }}%</span>
                      </div>
                      <div class="bottom_size">
                        <span
                          class="leftInfo"
                        >已使用{{ item.diskTotal - item.diskFree | sizeFormatter }}</span>
                        <span class="rightInfo">(共{{ item.diskTotal | sizeFormatter }})</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row class="detail_box memory_box">
      <el-col :span="7">
        <div class="detail borderRightNone memory_box_round">
          <div class="title">
            <span class="box_title">内存</span>
          </div>
          <div class="round-box">
            <CircleBar
              style="width : 6.8vw;height : 6.8vw;"
              :circle-data="circleData2"
              class="roundBar"
            />
            <div
              class="usage"
            >使用率:{{ $common.getNumber(info.memoryMetric.memoryUsedRate) }}%({{ info.memoryMetric.memoryTotal - info.memoryMetric.availableMemory | sizeFormatter }}/{{ info.memoryMetric.memoryTotal | sizeFormatter }})</div>
          </div>
        </div>
      </el-col>
      <el-col :span="17">
        <div class="detail lineChart_detail">
          <div class="lineChart">
            <span class="lineChart_title">使用率</span>
            <echarts-line style="height:220px" :charts-data="chartsData"></echarts-line>
            <!-- <echart-line style="height:220px" :charts-data="chartsData" class="echarts"></echart-linetime> -->
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="detail_box cpu_disk_box">
      <el-col :span="12">
        <div class="cpu_detail">
          <div class="detail">
            <div class="title">
              <span class="box_title">CPU</span>
              <span class="box_title_center">
                当前cpu负载：
                <span
                  class="title_green"
                >{{ $common.getNumber(info.cpuMetric.cpuUsedRate) }}%</span>
              </span>
            </div>
            <echarts-line style="height:260px" :charts-data="chartsData2"></echarts-line>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="disk_detail">
          <div class="detail">
            <div class="title">
              <span class="box_title">磁盘IO</span>
              <span class="box_title_two">
                入方向字节数：
                <span class="title_blue">{{ info.diskIoMetric.ioInBytes | sizeFormatter }}/s</span>
              </span>
              <span class="box_title_three">
                出方向字节数：
                <span
                  class="title_yellow"
                >{{ info.diskIoMetric.ioOutBytes | sizeFormatter }}/s</span>
              </span>
            </div>
            <echarts-line style="height:260px" :charts-data="chartsData3"></echarts-line>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="detail_box describe_box">
      <el-col :span="24">
        <div class="describe_detail">
          <div class="detail">
            <div class="title">
              <span class="box_title">描述信息</span>
            </div>
            <div class="information">
              <el-row :gutter="20">
                <el-col :span="6">
                  操作系统：
                  <span class="black">{{ info.baseInfo.meName }}</span>
                </el-col>
                <el-col :span="6">
                  所在服务器：
                  <span class="black">{{ info.baseInfo.serverName }}</span>
                </el-col>
                <el-col :span="6">
                  操作系统类型：
                  <span class="black">{{ info.baseInfo.meModel }}</span>
                </el-col>
                <el-col :span="24">
                  操作系统版本：
                  <span class="black">{{ info.baseInfo.version }}</span>
                </el-col>
                <el-col :span="24" class="last_info">
                  <span class="title">描述信息：</span>
                  <span class="black content">{{ info.baseInfo.description || '暂无描述' }}</span>
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
export default {
  filters: {
    formatterTime (time) {
      return time;
    }
  },
  data () {
    return {
      runStateColor: '#27B102',
      runStopColor: '#ccc',
      diskArr: ['C盘', 'D盘', 'E盘', 'F盘', 'G盘', 'H盘'],
      chartsData: {
        x: [
          '11:10',
          '11:20',
          '11:30',
          '11:40',
          '11:50',
          '12:00',
          '12:10',
          '12:20',
          '12:30',
          '12:40',
          '12:50',
          '13:00'
        ],
        y: [62, 53, 61, 78, 25, 60, 70, 70, 53, 90, 70, 80, 71],
        markLine: { yAxis: 80, name: '门限' },
        style: 'purple'
      },
      chartsData2: {
        x: [
          '11:10',
          '11:20',
          '11:30',
          '11:40',
          '11:50',
          '12:00',
          '12:10',
          '12:20',
          '12:30',
          '12:40',
          '12:50',
          '13:00'
        ],
        y: [42, 53, 61, 78, 25, 60, 70, 70, 53, 60, 70, 80, 71],
        markLine: { yAxis: 2000, name: '门限' },
        style: 'purple'
      },
      chartsData3: {
        x: [],
        y: [
          [],
          []
        ],
        multiple: true,
        markLine: { yAxis: 80, name: '门限' },
        style: 'multipleStyle2'
      },
      circleData: {
        precent: 0,
        state: 'OK'
      },
      circleData2: {
        precent: 0,
        state: 'OK'
      },
      info: ''
    };
  },
  created () {
    this.getDetail();
  },
  methods: {
    getDetail () {
      this.$request({
        url: `/os/detail?meId=${this.$route.query.meId}`,
        method: 'get'
      }).then(data => {
        this.info = data;
        this.circleData.precent = this.$common.getNumber(data.diskMetric.diskUsedRate);
        this.circleData.state = data.diskMetric.state;
        this.circleData2.precent = this.$common.getNumber(data.memoryMetric.memoryUsedRate);
        this.circleData2.state = data.memoryMetric.state;
        this.chartsData = this.formatCharts(data.memoryMetric.memoryList);
        this.chartsData2 = this.formatCharts(data.cpuMetric.cpuList);
        // this.chartsData3 = this.formatCharts2(
        //   data.diskIoMetric.ioInBytesList,
        //   data.diskIoMetric.ioOutBytesList
        // );
        this.chartsData3.x = this.formatCharts(
          this.info.diskIoMetric.ioInBytesList
        ).x;
        this.chartsData3.y[0] = this.formatCharts(
          this.info.diskIoMetric.ioInBytesList
        ).y;
        this.chartsData3.y[1] = this.formatCharts(
          this.info.diskIoMetric.ioOutBytesList
        ).y;
      });
    },
    formatCharts (data) {
      const x = [];
      const y = [];
      if (data && data.length > 0) {
        data.forEach(item => {
          x.push(this.$dateFormat('hh:mm', new Date(item.time)));
          if (item.value <= 1) {
            y.push(item.value * 100);
          } else {
            y.push(item.value);
          }
        });
      }
      return { x, y };
    }
    // formatCharts2 (data1, data2) {
    //   const x = [];
    //   const y = [];
    //   if (data1 && data1.length > 0) {
    //     const arr1 = [];
    //     data1.forEach(item => {
    //       x.push(this.$dateFormat('hh:mm', new Date(item.time)));
    //       arr1.push(item.value);
    //     });
    //     y.push(arr1);
    //   }
    //   if (data2 && data2.length > 0) {
    //     const arr2 = [];
    //     data2.forEach(item => {
    //       arr2.push(item.value);
    //     });
    //     y.push(arr2);
    //   }
    //   return { x, y };
    // }
  }
};
</script>

<style lang="scss" scoped>
.detail_body {
  .run_hardDisk_box {
    min-height: 280px;
    .detail {
      height: 100%;
    }
    // 运行情况
    .run_detail {
      margin-right: 20px;
      .detail_info {
        .row {
          margin-bottom: 20px;
          .col_one {
            float: left;
            width: 50%;
          }
          .col_two {
            float: right;
            width: 50%;
            text-align: left;
          }
        }
      }
    }
    // 硬盘
    .hardDisk_detail {
      .hardDisk_detail_round {
        position: relative;
        height: 100%;
        border-right: 1px solid #ececec;
      }
      .histogram_box {
        .title {
          padding-left: 20px;
        }
        .histogram_box {
          padding-left: 60px;
          .maxClass {
            .figure_small {
              background-color: #f13e3e;
            }
            .percentage {
              color: #f13e3e;
            }
          }
          .left_disk {
            display: flex;
            align-items: center;
            line-height: 20px;
            width: 70px;
          }
          .right_info {
            width: calc(100% - 70px);
          }
        }
      }
    }
  }
  .memory_box {
    .detail {
      height: 287px;
      border-left: none;
    }
    .lineChart_detail {
      padding-left: 0;
      .lineChart {
        height: 100%;
        border-left: 1px solid rgba(236, 236, 236, 0.52);
        .lineChart_title {
          width: 100%;
          margin-left: 11px;
        }
        .echarts {
          top: 25px;
        }
      }
    }
  }
  .cpu_disk_box {
    .detail {
      background-color: #fff;
      height: 331px;
    }
    .cpu_detail {
      margin-right: 11px;
    }
    .disk_detail {
      margin-left: 11px;
    }
  }
  .describe_box {
    .detail {
      .last_info {
        .content {
          width: calc(100% - 76px);
        }
      }
    }
  }
}
</style>

