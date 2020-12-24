<template>
  <div class="detail_body">
    <el-row class="detail_box run_space_box" :gutter="20">
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
        <div class="detail run_detail">
          <div class="title">
            <span class="box_title">运行状态</span>
          </div>
          <div class="main detail_info">
            <div class="row">
              <span class="">
                运行时长：
                <span class="black">{{ detailData.runTime }}</span>
              </span>
            </div>
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
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="7" class="space_box" style="padding-right: 0;">
        <div class="detail borderRight space_detail">
          <div class="title">
            <span class="box_title">空间</span>
          </div>
          <div class="box">
            <div class="round-box one">
              <CircleBar
                :circle-data="circleData"
                class="roundBar"
                style="width : 6.8vw;height : 6.8vw;"
              />
              <div
                class="usage"
              >内存({{ detailData.used | sizeFormatter }}/共{{ detailData.total | sizeFormatter }})</div>
            </div>
            <div class="round-box two">
              <CircleBar
                :circle-data="circleData2"
                class="roundBar"
                style="width : 6.8vw;height : 6.8vw;"
              />
              <div
                class="usage"
              >存储({{ detailData.storeUsed | sizeFormatter }}/共{{ detailData.storeTotal | sizeFormatter }})</div>
            </div>
            <div class="round-box three">
              <CircleBar
                :circle-data="circleData3"
                class="roundBar"
                style="width : 6.8vw;height : 6.8vw;"
              />
              <div
                class="usage"
              >临时({{ detailData.tempUsed | sizeFormatter }}/共{{ detailData.tempTotal | sizeFormatter }})</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col
        :xs="12"
        :sm="12"
        :md="12"
        :lg="12"
        :xl="13"
        class="lineChart_box"
        style="padding-left: 0;"
      >
        <div class="detail borderLeftNone lineChart_detail">
          <div class="lineChart">
            <div class="lineChart_title">
              内存空间使用率
              <span class="rightBox">
                <span class="info">
                  <span
                    class="big"
                    :class="activeName === 'memory'? 'activeSpace': ''"
                    @click="switchHandle('memory')"
                  >
                    <span class="small"></span>
                  </span>内存空间
                </span>
                <span class="info">
                  <span
                    class="big"
                    :class="activeName === 'disk'? 'activeSpace': ''"
                    @click="switchHandle('disk')"
                  >
                    <span class="small"></span>
                  </span>存储空间
                </span>
                <span class="info">
                  <span
                    class="big"
                    :class="activeName === 'temp'? 'activeSpace': ''"
                    @click="switchHandle('temp')"
                  >
                    <span class="small"></span>
                  </span>临时空间
                </span>
              </span>
            </div>
            <div class="lineChart_body">
              <echarts-line style="height:180px" :charts-data="chartsData" class="echarts"></echarts-line>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="detail_box message_box">
      <el-col :span="12">
        <div class="detail message_detail">
          <div class="title">
            <span class="box_title">消息</span>
            <span class="box_title_right">
              消息数量：
              <span class="title_blue">34</span>
            </span>
          </div>
          <div class="lineChart one">
            <div class="lineChart_title">
              <span class="fl">平均每分钟生产的消息数</span>
              <span class="fr">数量(个)</span>
            </div>
            <div class="lineChart_body">
              <echarts-line style="height:240px" :charts-data="productionData" class="echarts"></echarts-line>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="detail lineChart_detail">
          <div class="title">
            <span class="box_title_left one">
              生产者数量：
              <span class="title_blue">{{ detailData.producerNum }}</span>
            </span>
            <span class="box_title_left two">
              消费者数量：
              <span class="title_blue">{{ detailData.consumerNum }}</span>
            </span>
            <span class="box_title_left three">
              已消费消息数量：
              <span class="title_blue">{{ detailData.consumedNum }}</span>
            </span>
            <span class="box_title_left four">
              未消费消息数量：
              <span class="title_blue">{{ detailData.notConsumedNum }}</span>
            </span>
          </div>
          <div class="lineChart">
            <div class="lineChart_title">
              <span class="fl">平均每分钟消费的消息数</span>
              <span class="fr">数量(个)</span>
            </div>
            <div class="lineChart_body two">
              <echarts-line style="height:240px" :charts-data="consumptionData" class="echarts"></echarts-line>
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
import { getActiveMQDetail } from '@/api/middleDetail';
export default {
  data () {
    return {
      runStateColor: '#27B102',
      runStopColor: '#ccc',
      detailData: null,
      activeName: 'memory',
      chartsData: {
        x: [],
        y: [],
        markLine: { yAxis: 80, name: '门限' },
        style: 'purple'
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
        markLine: { yAxis: 80, name: '门限' },
        style: 'purple'
      },
      productionData: {
        x: [],
        y: [],
        markLine: { yAxis: 80, name: '门限' },
        style: 'green'
      },
      consumptionData: {
        x: [],
        y: [],
        markLine: { yAxis: 80, name: '门限' },
        style: 'purple'
      },
      circleData: {
        precent: 75
        // fontSize: 30,
        // width: 100,
        // borderWidth: 8
      },
      circleData2: {
        precent: 75
        // fontSize: 30,
        // width: 100,
        // borderWidth: 8
      },
      circleData3: {
        precent: 91
        // fontSize: 30,
        // width: 100,
        // borderWidth: 8
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
      getActiveMQDetail(this.$route.query.cmId).then((res) => {
        this.detailData = res;
        this.circleData.precent = this.$common.getNumber(this.detailData.usage);
        this.circleData2.precent = this.$common.getNumber(this.detailData.storeUsage);
        this.circleData3.precent = this.$common.getNumber(this.detailData.tempUsage);
        this.chartsData.x = this.formatCharts(
          this.detailData.activeMqMemoryMetricRespList
        ).x;
        this.chartsData.y = this.formatCharts(
          this.detailData.activeMqMemoryMetricRespList
        ).y;
        this.chartsData2.x = this.formatCharts(
          this.detailData.activeMqDiskMetricRespList
        ).x;
        this.chartsData2.y = this.formatCharts(
          this.detailData.activeMqDiskMetricRespList
        ).y;
        this.chartsData3.x = this.formatCharts(
          this.detailData.activeMqTempMetricRespList
        ).x;
        this.chartsData3.y = this.formatCharts(
          this.detailData.activeMqTempMetricRespList
        ).y;
        this.productionData.x = this.formatCharts(
          this.detailData.activeMqPercentProducerMsgMetricRespList
        ).x;
        this.productionData.y = this.formatCharts(
          this.detailData.activeMqPercentProducerMsgMetricRespList
        ).y;
        this.consumptionData.x = this.formatCharts(
          this.detailData.activeMqPercentConsumerMsgMetricResp
        ).x;
        this.consumptionData.y = this.formatCharts(
          this.detailData.activeMqPercentConsumerMsgMetricResp
        ).y;
        console.log(this.chartsData);
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
    },
    switchHandle (val) {
      this.activeName = val;
      if (this.activeName === 'memory') {
        this.chartsData = this.chartsData;
      } else if (this.activeName === 'disk') {
        this.chartsData = this.chartsData2;
      } else if (this.activeName === 'temp') {
        this.chartsData = this.chartsData3;
      }
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
  .run_space_box {
    // 运行情况
    .detail {
      position: relative;
      height: 240px;
      font-size: 14px;
      color: #666;
      .lineChart_title {
        display: inline-block;
        width: 100%;
        height: 22px;
        line-height: 22px;
        padding: 0 20px;
        .rightBox {
          font-size: 12px;
          color: #606060;
          .info {
            margin-left: 20px;
            .big {
              position: relative;
              display: inline-block;
              width: 10px;
              height: 10px;
              border: 1px solid rgba(0, 0, 0, 0.49);
              border-radius: 5px;
              background: transparent;
              margin-right: 4px;
              cursor: pointer;
              .small {
                position: absolute;
                display: inline-block;
                width: 5px;
                height: 5px;
                border-radius: 5px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.49);
              }
            }
            .big.activeSpace {
              border: 1px solid #5466e0;
              .small {
                background-color: #5466e0;
              }
            }
          }
        }
      }
    }
    .space_detail {
      .box {
        margin-left: 15px;
      }
      .round-box {
        width: 33.333%;
        .roundBar {
          top: 45%;
        }
        .usage {
          color: #666666;
          top: calc(45% + 80px);
        }
      }
      .round-box.one {
        left: 0;
      }
      .round-box.two {
        left: 33.33%;
      }
      .round-box.three {
        left: 66.66%;
      }
    }
  }
  .message_box {
    .detail {
      height: 370px;
      .title {
        margin-bottom: 0;
        padding-bottom: 12px;
        border-bottom: 1px solid rgba(219, 219, 219, 0.52);
      }
      .lineChart {
        position: absolute;
        top: 90px;
        width: calc(100% - 12px);
        .lineChart_title {
          width: 100%;
          padding: 0 20px;
          overflow: hidden;
        }
        .lineChart_body {
          height: 240px;
          width: 100%;
          border-right: 1px solid rgba(219, 219, 219, 0.52);
        }
        .lineChart_body.two {
          border-right: 0;
          padding-right: 0;
        }
      }
    }
    .message_detail {
      padding-right: 0;
      border-right: none;
      .box_title_right {
        margin-right: 44px;
      }
    }
    .lineChart_detail {
      padding-left: 0;
      border-left: none;
      .title {
        float: right;
        width: 100%;
        .box_title_left {
          float: left;
          width: 22%;
          text-align: center;
          box-sizing: border-box;
          .title_blue {
            color: #5466e0;
          }
        }
        .box_title_left.one {
          text-align: left;
          padding-left: 20px;
        }
        .box_title_left.three {
          width: 28%;
        }
        .box_title_left.four {
          text-align: right;
          width: 28%;
          padding-right: 20px;
        }
      }
    }
  }
  .describe_box {
    .detail {
      height: 229px;
    }
  }
}
</style>
