<template>
  <div class="detail_body">
    <el-row class="detail_box run_statistical_time_box" :gutter="20">
      <el-col :span="4">
        <div class="detail run_detail">
          <div class="title">
            <span class="box_title">运行状态</span>
          </div>
          <div class="main detail_info">
            <div class="row row_one">
              <span class="col_one">
                运行时长：
                <span class="black">{{ detailData.runTime }}天</span>
              </span>
            </div>
            <div class="row row_two">
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
      <el-col :span="4">
        <div class="detail statistical_detail">
          <div class="title">
            <span class="box_title">统计</span>
          </div>
          <div class="detail_info">
            <div class="row">
              <span class="col one">连接客户端数</span>
              <span class="col two">{{ detailData.connectedClients || 0 }}</span>
            </div>
            <div class="row">
              <span class="col one">连接从库数</span>
              <span class="col two">{{ detailData.connectedSlaves }}</span>
            </div>
            <div class="row">
              <span class="col one">阻塞客户端数</span>
              <span class="col two">{{ detailData.blockedClients }}</span>
            </div>
            <div class="row">
              <span class="col one">pub/sub通道数</span>
              <span class="col two">{{ detailData.pubsubChannels }}</span>
            </div>
            <div class="row last">
              <span class="col one">pub/sub模式数</span>
              <span class="col two">{{ detailData.pubsubPatterns }}</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="detail">
          <div class="title">
            <span class="box_title">当前分钟连接数</span>
            <span class="box_title_right">单位(个)</span>
          </div>
          <div class="lineChart">
            <div class="lineChart_body">
              <echarts-line style="height:180px" :charts-data="chartsData" class="echarts"></echarts-line>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="detail_box memory_box">
      <el-col :span="7">
        <div class="detail memory_detail">
          <div class="title">
            <span class="box_title">内存</span>
          </div>
          <div class="round-box">
            <CircleBar
              style="width: 6.8vw;height: 6.8vw;"
              :circle-data="circleData"
              class="roundBar"
            />
            <div
              class="usage"
            >内存使用率：{{ $common.getNumber(detailData.usedMemoryRate) }}%&emsp;内存共({{ detailData.totalSystemMemory | sizeFormatter }})：已使用({{ detailData.usedMemoryRss | sizeFormatter }})</div>
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
              <echarts-line style="height:226px" :charts-data="chartsData2" class="echarts"></echarts-line>
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
import { getRedisDetail } from '@/api/middleDetail';
export default {
  data () {
    return {
      runStateColor: '#27B102',
      runStopColor: '#ccc',
      detailData: '',
      getters: 'monitor/soft/flowList',
      chartsData: {
        markLine: { yAxis: 2000, name: '门限' },
        style: 'purple'
      },
      chartsData2: {
        markLine: { yAxis: 2000, name: '门限' },
        style: 'green'
      },
      circleData: {
        precent: '',
        borderWidth: 8
      }
    };
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
      getRedisDetail(this.$route.query.cmId).then((res) => {
        this.detailData = res;
        this.circleData.precent = this.$common.getNumber(this.detailData.usedMemoryRate);
        this.chartsData.x = this.formatCharts(
          this.detailData.connectionsPerMinuteList
        ).x;
        this.chartsData.y = this.formatCharts(
          this.detailData.connectionsPerMinuteList
        ).y;
        this.chartsData2.x = this.formatCharts(
          this.detailData.usedMemoryRateList
        ).x;
        this.chartsData2.y = this.formatCharts(
          this.detailData.usedMemoryRateList
        ).y;
      })
      // this.$request
      //   .get(`redis/details?id=${this.$route.query.cmId}`)
      //   .then(res => {
      //     this.detailData = res;
      //     this.circleData.precent = this.detailData.usedMemoryRate;
      //     this.chartsData = this.formatCharts(
      //       this.detailData.connectionsPerMinuteList
      //     );
      //     this.chartsData2 = this.formatCharts(
      //       this.detailData.usedMemoryRateList
      //     );
      //   });
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
};
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
  .run_statistical_time_box {
    // 运行情况
    .detail {
      position: relative;
      height: 240px;
      font-size: 14px;
      color: #666;
      .lineChart_title .one {
        display: inline-block;
        height: 22px;
        line-height: 22px;
      }
    }
    .statistical_detail {
      .detail_info {
        width: calc(100% - 24px);
        height: 152px;
        border: 1px solid #e8ebf3;
        margin: 0 12px;
        box-sizing: border-box;
        .row {
          height: 30px;
          line-height: 30px;
          width: 100%;
          border-bottom: 1px solid #e8ebf3;
          color: #606060;
          font-size: 0;
          .col {
            font-size: 14px;
          }
          .one {
            display: inline-block;
            width: 64%;
            height: 100%;
            text-align: center;
            background-color: #f4f5f9;
          }
          .two {
            display: inline-block;
            width: 36%;
            height: 100%;
            text-align: center;
          }
        }
        .last {
          border-bottom: none;
        }
      }
      @media screen and (max-width: 1600px) {
        .detail_info {
          width: 100%;
          margin: 0;
          .row {
            .one {
              width: 75%;
            }
            .two {
              width: 25%;
            }
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
  .describe_box {
    .detail {
      height: 229px;
    }
  }
}
</style>
