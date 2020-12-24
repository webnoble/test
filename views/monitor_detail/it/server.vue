<template>
  <div v-if="info" class="detail_body">
    <el-row class="detail_box run_power_disk_box" :gutter="20">
      <el-col :span="4">
        <div class="detail run_detail">
          <div class="title">
            <span class="box_title">运行情况</span>
          </div>
          <div class="main">
            <div class="row row_one">
              <span class="col_one">
                运行时长：
                <span class="black">{{ info.runInfo.upTime | timeFormatter }}</span>
              </span>
            </div>
            <div class="row row_two">
              <span class="col_one">
                运行状态：
                <i
                  class="small_round"
                  :style="{backgroundColor: info.runInfo.runState === 'OK' ? runStateColor : runStopColor}"
                ></i>
                <span class="black">{{ info.runInfo.runState | SwitchStatus }}</span>
              </span>
            </div>
            <div class="row row_three">
              <span class="col_three">
                IP地址：
                <span class="black">{{ info.runInfo.ip }}</span>
              </span>
            </div>
          </div>
          <div class="iconfont iconicon_cog"></div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="detail power_detail">
          <div class="title">
            <span class="box_title">电源</span>
          </div>
          <div>
            <div class="row">
              <span class="col_one fl">{{ info.battery.batteryName }}</span>
              <span class="col_two fr">
                <i
                  class="small_round"
                  :style="{backgroundColor: info.battery.state === 'OK' ? '#27B102': '#FF0000' }"
                ></i>
                {{ info.battery.state | SwitchStatus }}
              </span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <el-row>
          <el-col :span="7">
            <div class="detail borderRightNone">
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
                >使用率:{{ $common.getNumber(info.memoryMetric.memoryUsedRate) }}%({{ info.memoryMetric.memoryTotal - (info.memoryMetric.availableMemory ? info.memoryMetric.availableMemory : info.memoryMetric.memoryTotal) | sizeFormatter }}/{{ info.memoryMetric.memoryTotal | sizeFormatter }})</div>
              </div>
            </div>
          </el-col>
          <el-col :span="17">
            <div class="detail borderLeft lineChart">
              <div class="lineChart_title">
                <span>使用率</span>
              </div>
              <div class="lineChart_body">
                <echarts-line style="height:180px" :charts-data="chartsData2"></echarts-line>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="detail_box fan_box">
      <el-col :span="7">
        <div class="detail borderRightNone">
          <div class="title">
            <span class="box_title">风扇状态</span>
            <span class="prompt_box">
              <span
                class="one"
                :style="{borderRightColor : info.fan.fanState === 'OK' ? 'green':'#ff1515'}"
              ></span>
              <span
                class="two"
                :style="{backgroundColor : info.fan.fanState === 'OK' ? 'green':'#ff1515'}"
              >{{ info.fan.fanState | SwitchStatus }}</span>
            </span>
          </div>
          <div class="box">
            <div
              v-for="(item, index) in info.fan.fanSpeedPersistenceList"
              :key="index"
              class="small_box one"
              :style="{borderLeftColor: fanColorArr[index]}"
            >
              <div class="small_one">
                <span class="num">{{ item.value }}</span>转/分
              </div>
              <div class="small_two">风扇 {{ index + 1 }}</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="17">
        <div class="detail borderLeft lineChart">
          <div class="lineChart_title">
            <span class="leftBox">转数（转）</span>
            <span class="rightBox">
              <span
                v-for="(item, index) in info.fan.fanSpeedTimeList"
                :key="index"
                class="square one"
              >风扇 {{ index }}</span>
            </span>
          </div>
          <div class="lineChart_body">
            <echarts-line style="height:230px" :charts-data="chartsData1"></echarts-line>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="detail_box memory_box" type="flex" align-item="stretch">
      <el-col :span="4">
        <div class="detail">
          <div class="title">
            <span class="box_title">硬盘</span>
          </div>
          <div class="round-box borderRight">
            <CircleBar
              style="width : 6.8vw;height : 6.8vw;"
              :circle-data="circleData"
              class="roundBar"
            />
            <div
              class="usage"
            >使用率:{{ $common.getNumber(info.diskMetric.diskUsedRate - 0) + '%' }}({{ info.diskMetric.diskTotal - (info.diskMetric.diskFree ? info.diskMetric.diskFree : info.diskMetric.diskTotal) | sizeFormatter }}/{{ info.diskMetric.diskTotal | sizeFormatter }})</div>
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="detail">
          <div class="space_detail histogram_box">
            <div class="title">
              <span>分区{{ info.diskMetric.diskList.length }}个</span>
            </div>
            <el-row :gutter="16" class="histogram_box">
              <el-col v-for="(item,key) in info.diskMetric.diskList" :key="key" :span="6">
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
                        :style="{ width : $common.getNumber(item.diskUsedRate)+ '%' }"
                      ></div>
                    </div>
                    <span class="percentage">{{ $common.getNumber(item.diskUsedRate) }}%</span>
                  </div>
                  <div class="bottom_size">
                    <span class="leftInfo">已使用{{ item.diskTotal - item.diskFree | sizeFormatter }}</span>
                    <span class="rightInfo">(共{{ item.diskTotal | sizeFormatter }})</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="detail_box cpu_box">
      <el-col :span="12">
        <div class="detail borderRightNone">
          <div class="title">
            <span class="box_title">CPU</span>
          </div>
          <div class="lineChart">
            <div class="lineChart_title">
              <span class="small_title_one">cpu温度: {{ info.cpuTemperature.cpuTemperature }}&#8451;</span>
              <!-- <span class="small_title_two">
                <span class="info">CPU1: 34&#8451;</span>
                <span class="info">CPU2: 34&#8451;</span>
                <span class="info" style="color: #F02323;">CPU3: 38&#8451;</span>
                <span class="info">CPU4: 34&#8451;</span>
              </span>-->
            </div>
            <div class="lineChart_body">
              <div class="lineChart_title_two">
                <span class="leftBox">&#8451;</span>
                <span class="rightBox">
                  <span class="square one">CPU1</span>
                  <!-- <span class="square two">CPU2</span>
                  <span class="square three">CPU3</span>
                  <span class="square four">CPU4</span>-->
                </span>
              </div>
              <div>
                <echarts-line style="height:220px" :charts-data="chartsData3" class="echarts"></echarts-line>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="detail borderLeft">
          <div class="title">
            <span class="box_title noBefore"></span>
          </div>
          <div class="lineChart">
            <div class="lineChart_title">
              <span
                class="small_title_one"
              >cpu负载：{{ $common.getNumber(info.cpuMetric.cpuUsedRate) }}%</span>
              <!-- <span class="small_title_two">
                <span class="info">CPU1: 34%</span>
                <span class="info">CPU2: 34%</span>
                <span class="info" style="color: #F02323;">CPU3: 98%</span>
                <span class="info">CPU4: 34%</span>
              </span>-->
            </div>
            <div class="lineChart_body">
              <div class="lineChart_title_two">
                <span class="leftBox">负载（%）</span>
                <span class="rightBox">
                  <span class="square one">CPU1</span>
                  <!-- <span class="square two">CPU2</span>
                  <span class="square three">CPU3</span>
                  <span class="square four">CPU4</span>-->
                </span>
              </div>
              <div>
                <echarts-line style="height:220px" :charts-data="chartsData4" class="echarts"></echarts-line>
              </div>
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
              <span class="box_title">服务器描述</span>
            </div>
            <div class="information">
              <el-row>
                <el-col :span="6">
                  所在区域：
                  <span class="black">{{ info.baseInfo.areaId }}</span>
                </el-col>
                <el-col :span="18">
                  所在服务器：
                  <span class="black">{{ info.baseInfo.meName }}</span>
                </el-col>
                <el-col :span="24" class="last_info">
                  <span class="title">其他信息：</span>
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
import { getServerDetail } from '@/api/itServerDetail'
export default {
  data () {
    return {
      runStateColor: '#27B102',
      runStopColor: '#ccc',
      info: {},
      fanColorArr: ['#5cabfb', '#2ed6c6', '#ffd04e', '#6d7ee1'],
      getters: 'monitor/soft/flowList',
      chartsData1: {
        x: ['11:10', '11:20', '11:30', '11:40', '11:50', '12:00', '12:10', '12:20', '12:30', '12:40', '12:50', '13:00'],
        y: [1845, 1870, 2000, 2300, 1000, 1130, 1080, 2100, 1200, 1300, 1100, 1800, 1845],
        // multiple: true,
        markLine: { yAxis: 2000, name: '门限' },
        style: 'green'
      },
      chartsData2: {
        x: [],
        y: [],
        markLine: { yAxis: 80, name: '门限' },
        style: 'purple'
      },
      chartsData3: {
        x: [],
        y: [],
        // multiple: true,
        markLine: { yAxis: 80, name: '门限' },
        style: 'green'
      },
      chartsData4: {
        x: [],
        y: [],
        // multiple: true,
        markLine: { yAxis: 80, name: '门限' },
        style: 'green'
      },
      circleData: {
        precent: 64,
        state: 'OK'
      },
      circleData2: {
        precent: 72,
        state: 'OK'
      }
    }
  },
  // computed: {
  //   isDisable () {
  //     console.log(this.$refs.topDisk);
  //   }
  // },
  created () {
    this.getDetail();
  },
  mounted () {
    // const timer = setInterval(() => {
    //   this.getCharData()
    // }, 2000);
    // this.$once('hook:beforeDestroy', () => { clearInterval(timer); })
  },
  methods: {
    getDetail () {
      getServerDetail(this.$route.query.meId).then((res) => {
        this.info = res;
        this.circleData.precent = this.$common.getNumber(this.info.diskMetric.diskUsedRate);
        this.circleData.state = this.info.diskMetric.state;
        this.circleData2.precent = this.$common.getNumber(this.info.memoryMetric.memoryUsedRate);
        this.circleData2.state = this.info.memoryMetric.memoryState;
        // 风扇转速先使用假数据
        // this.chartsData1.x = this.formatCharts(
        //   this.info.fan.fanSpeedTimeList[1]
        // ).x;
        // this.chartsData1.y = this.formatCharts(
        //   this.info.fan.fanSpeedTimeList[1]
        // ).y;
        this.chartsData2.x = this.formatCharts(this.info.memoryMetric.memoryList).x;
        this.chartsData2.y = this.formatCharts(this.info.memoryMetric.memoryList).y;
        this.chartsData3.x = this.formatCharts(this.info.cpuTemperature.temperatureList).x;
        this.chartsData3.y = this.formatCharts(this.info.cpuTemperature.temperatureList).y;
        this.chartsData4.x = this.formatCharts(this.info.cpuMetric.cpuList).x;
        this.chartsData4.y = this.formatCharts(this.info.cpuMetric.cpuList).y;
        // 折线图暂显示一条，有多条的时再进行遍历
        // this.info.fan.fanSpeedTimeList.forEach((item, index) => {
        //   this.chartsData1.y[index] = this.formatCharts(
        //     item
        //   ).y;
        // })
      })
    },
    formatCharts (data) {
      const x = [];
      const y = [];
      if (data && data.length > 0) {
        data.forEach(item => {
          x.push(this.$dateFormat('hh:mm', new Date(item.time)));
          // y.push(item.value);
          if (item.value <= 1) {
            y.push(item.value * 100);
          } else {
            y.push(item.value);
          }
        });
      }
      return { x, y };
    }
    // getCharData () {
    //   this.chartsData.y = this.generateRandomArr(12, 1000, 3000);
    //   this.chartsData1.y = [this.generateRandomArr(12, 1000, 3000), this.generateRandomArr(12, 1000, 3000)];
    //   // console.log(this.chartsData.y);
    // },
    // generateRandomArr (n, min, max) {
    //   var arr = [];
    //   for (var i = 0; i < n; i++) {
    //     var random = Math.floor(Math.random() * (max - min + 1) + min);
    //     arr.push(random);
    //   }
    //   return arr;
    // }
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
  .lineChart_title {
    padding-right: 80px;
  }
  .lineChart_title_two {
    padding-right: 80px;
  }
  .run_power_disk_box {
    // 运行情况
    .detail {
      height: 240px;
    }
    .run_detail {
      // 加高行间距
      .row {
        margin-bottom: 20px;
      }
    }
    .power_detail {
      .row {
        width: 80%;
        margin: 0 auto;
        margin-top: 20px;
        height: 33px;
        line-height: 33px;
        padding: 0 8px;
        border-radius: 16.5px;
        background-color: rgba(238, 237, 246, 0.65);
      }
    }
    // 硬盘
    // .hardDisk_detail {
    //   padding: 0;
    //   .hardDisk_detail_round {
    //     position: relative;
    //     height: 100%;
    //     .title {
    //       padding: 12px 0 0 12px;
    //     }
    //   }
    // }
  }
  .fan_box {
    .detail {
      height: 289px;
      .title {
        .box_title {
          top: -6px;
        }
        .prompt_box {
          position: relative;
          display: inline-block;
          width: 48px;
          height: 22px;
          background-color: #fff;
          overflow: hidden;
          .one,
          .two {
            position: absolute;
            background-color: #ff1515;
          }
          .one {
            background: none;
            top: 0;
            left: 5px;
            width: 0;
            height: 0;
            border-top: 11px solid transparent;
            border-bottom: 11px solid transparent;
            border-right: 11px solid #ff1515;
          }
          .two {
            left: 16px;
            width: 32px;
            height: 100%;
            color: #fff;
            font-size: 14px;
            line-height: 22px;
          }
        }
      }
      .box {
        margin-left: 56px;
        .small_box {
          width: 50%;
          float: left;
          height: 52px;
          margin-bottom: 55px;
          font-size: 14px;
          color: #999999;
          padding-left: 6px;
          .small_one {
            height: 32px;
            line-height: 32px;
            .num {
              font-size: 26px;
            }
          }
          .small_two {
            height: 20px;
            line-height: 20px;
          }
        }
        .one {
          border-left: 3px solid #5cabfb;
        }
        .two {
          border-left: 3px solid #2ed6c6;
        }
        .three {
          border-left: 3px solid #ffd04e;
        }
        .four {
          border-left: 3px solid #6d7ee1;
        }
      }
    }
  }
  .memory_box {
    min-height: 287px;
    .detail {
      height: 100%;
    }
  }
  .cpu_box {
    .detail {
      height: 391px;
      .lineChart {
        .lineChart_title {
          font-size: 14px;
          padding-bottom: 66px;
          .small_title_one {
            float: left;
            width: 20%;
          }
          .small_title_two {
            float: right;
            width: 80%;
            .info {
              float: left;
              width: 25%;
              text-align: center;
            }
          }
        }
        .lineChart_body {
          .lineChart_title_two {
            margin-bottom: 14px;
          }
        }
      }
    }
  }
  .cpu_box {
    .detail {
      height: 391px;
      .noBefore:before {
        content: '';
        width: 0;
        height: 0;
      }
      .lineChart {
        .lineChart_title {
          font-size: 14px;
          padding-bottom: 56px;
          .small_title_one {
            float: left;
            font-size: 16px;
            line-height: 18px;
            width: 100%;
            color: #6d727a;
          }
          .small_title_two {
            float: right;
            width: 80%;
            line-height: 18px;
            color: #6d727a;
            .info {
              float: left;
              width: 25%;
              text-align: center;
            }
          }
        }
        .lineChart_body {
          .lineChart_title_two {
            margin-bottom: 14px;
          }
        }
      }
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
