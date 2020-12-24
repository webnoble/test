<template>
  <div class="detail_body">
    <el-row class="detail_box run_request_box" :gutter="20">
      <el-col :span="4">
        <div class="detail run_detail">
          <div class="title">
            <span class="box_title">运行状态</span>
          </div>
          <div class="main detail_info">
            <!-- <div class="row row_one">
              <span class="col_one">
                运行时长：
                <span class="black">{{ detailData.runTime }}</span>
              </span>
            </div>-->
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
      <el-col :span="20">
        <div class="detail_box">
          <el-row style="height: 100%;">
            <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3" class="detail request_box">
              <div class="title">
                <span class="box_title">请求</span>
              </div>
              <div class="round-box">
                <CircleBar :circle-data="circleData" class="roundBar" style="width: 6.8vw;"/>
                <div class="usage">通道使用百分比</div>
              </div>
            </el-col>
            <el-col
              :xs="6"
              :sm="6"
              :md="6"
              :lg="6"
              :xl="4"
              class="detail borderLeftNone borderRightNone info_box"
            >
              <div class="box">
                <div class="info">
                  通道容量：
                  <span class="black">{{ detailData.channelCapacity | sizeFormatter }}</span>
                </div>
                <div class="info">
                  通道事件数量：
                  <span class="black">{{ detailData.channelSize }}</span>
                </div>
                <div class="info">
                  成功发送的事件数量：
                  <span class="black">{{ detailData.eventTakeSuccessCount }}</span>
                </div>
              </div>
            </el-col>
            <el-col :xs="15" :sm="15" :md="15" :lg="15" :xl="17" class="lineChart_box">
              <div class="detail borderLeft lineChart">
                <div class="lineChart_title">
                  <span class="one">近段时间通道使用百分比</span>
                </div>
                <div class="lineChart_body">
                  <echarts-line style="height:180px" :charts-data="chartsData" class="echarts"></echarts-line>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row class="detail_box date_send_box" :gutter="20">
      <el-col :span="12">
        <div class="detail date_detail">
          <div class="title">
            <span class="box_title">数据源</span>
          </div>
          <div class="main">
            <el-row>
              <el-col :span="12">
                数据源连接数量：
                <span class="blue">{{ detailData.openConnectionCount }}</span>
              </el-col>
              <el-col :span="12">
                写入通道事件数量：
                <span class="blue">{{ detailData.appendAcceptedCount }}</span>
              </el-col>
              <el-col :span="24" style="margin-top: 10px;">
                接收到的事件总数量：
                <span class="blue">{{ detailData.eventReceivedCount }}</span>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="detail date_detail">
          <div class="title">
            <span class="box_title">发送</span>
          </div>
          <div class="main">
            <el-row>
              <el-col :span="12">
                发送连接数量：
                <span class="blue">{{ detailData.connectionCreatedCount }}</span>
              </el-col>
              <el-col :span="12">
                由于错误关闭的连接数量：
                <span class="blue">{{ detailData.connectionClosedCount }}</span>
              </el-col>
              <el-col :span="24" style="margin-top: 10px;">
                成功发送数量：
                <span class="blue">{{ detailData.eventDrainSuccessCount }}</span>
              </el-col>
            </el-row>
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
                <!-- <el-col :span="12">
                  版本信息：
                  <span class="black">{{ detailData.cmMeInfoEntity.meModel }}</span>
                </el-col>-->
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
import { getFlumeDetail } from '@/api/middleDetail';
export default {
  data () {
    return {
      runStateColor: '#27B102',
      runStopColor: '#ccc',
      chartsData: {
        x: ['11:10', '11:20', '11:30', '11:40', '11:50', '12:00', '12:10', '12:20', '12:30', '12:40', '12:50', '13:00'],
        y: [1000, 1300, 1100, 2000, 1500, 2660, 1870, 2000, 2300, 1000, 1130, 1080, 2100],
        markLine: { yAxis: 2000, name: '门限' },
        style: 'purple'
      },
      circleData: {
        precent: 60,
        fontSize: 30,
        color: '#5466E0',
        // width: 100,
        borderWidth: 8
      },
      detailData: null
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
      getFlumeDetail(this.$route.query.cmId).then((res) => {
        this.detailData = res;
        this.circleData.precent = this.$common.getNumber(this.detailData.channelFillPercentage);
        this.chartsData.x = this.formatCharts(
          this.detailData.channelFillPercentageList
        ).x;
        this.chartsData.y = this.formatCharts(
          this.detailData.channelFillPercentageList
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
  .run_request_box {
    margin-bottom: 0;
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
    .request_box {
      border: none;
    }
    .info_box {
      .box {
        height: 144px;
        margin-top: 35px;
        padding-left: 30px;
        border-left: 1px solid rgba(219, 219, 219, 0.52);
        .info {
          padding-top: 24px;
        }
      }
      @media screen and (max-width: 1550px) {
        .box {
          padding-left: 16px;
        }
      }
    }
  }
  .date_send_box {
    .detail {
      height: 111px;
      color: #000;
    }
  }
  .describe_box {
    .detail {
      height: 229px;
    }
  }
}
</style>
