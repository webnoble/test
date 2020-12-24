<template>
  <div class="detail_body">
    <el-row class="detail_box run_resource_box" :gutter="20">
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
      <el-col :span="4" class="resource_box" style="padding-right: 0;">
        <div class="detail resource_detail">
          <div class="title">
            <span class="box_title">资源占用</span>
          </div>
          <div class="main detail_info">
            <div class="row">
              <span class="">
                CPU使用率：
                <span class="black">{{ detailData.cpuUsage }}%</span>
              </span>
            </div>
            <div class="row row_two">
              <span class="">
                io写入速率：
                <span class="black">{{ detailData.ioInByteSpeed }}kb/s</span>
              </span>
            </div>
            <div class="row row_three">
              <span class="">
                io读取速率：
                <span class="black">{{ detailData.ioOutByteSpeed }}kb/s</span>
              </span>
            </div>
            <div class="row row_two">
              <span class="">
                线程数：
                <span class="black">{{ detailData.ioOutByteSpeed }}个</span>
              </span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="16" class="lineChart_box" style="padding-left: 0;">
        <div class="detail lineChart_detail">
          <div class="lineChart">
            <div class="lineChart_title">
              <span class="fl leftTitle">近段时间io读写速率(kb/s)</span>
              <span class="rightBox">
                <span class="square one">io读取速率</span>
                <span class="square two">io写入速率</span>
              </span>
            </div>
            <div class="lineChart_body">
              <echarts-line style="height:180px" :charts-data="chartsData" class="echarts"></echarts-line>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="detail_box network_box">
      <el-col :span="24">
        <div class="detail lineChart_detail">
          <div class="title">
            <span class="box_title">网络</span>
            <span class="rightBox">
              <span class="box_title_left one">总请求数：
                <span class="title_blue">{{ detailData.requestNum }}个</span>
              </span>
              <span class="box_title_left two">总连接数：
                <span class="title_blue">{{ detailData.connections }}个</span>
              </span>
              <span class="box_title_left three">当前请求数：
                <span class="title_blue">{{ detailData.curRequestNum }}个</span>
              </span>
              <span class="box_title_left four">接收数据字节总数：
                <span class="title_blue">{{ detailData.inByte }}个</span>
              </span>
              <span class="box_title_left five">发送数据字节总数：
                <span class="title_blue">{{ detailData.outByte }}个</span>
              </span>
              <span class="box_title_left six">接收数据字节的速率：
                <span class="title_blue">{{ detailData.inByteSpeed }}kb/s</span>
              </span>
              <span class="box_title_left seven">发送数据字节的速率：
                <span class="title_blue">{{ detailData.outByteSpeed }}kb/s</span>
              </span>
            </span>
          </div>
          <div class="lineChart">
            <div class="lineChart_title">
              <span class="fl leftTitle">近段时间接收和发送字节的速率(kb/s)</span>
              <span class="rightBox">
                <span class="square one">接收数据字节速率</span>
                <span class="square two">发送数据字节速率</span>
              </span>
            </div>
            <div class="lineChart_body">
              <echarts-line style="height:260px" :charts-data="chartsData2"></echarts-line>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="detail_box deta_box">
      <el-col :span="24">
        <div class="data_detail">
          <div class="detail">
            <div class="title">
              <span class="box_title">数据源</span>
            </div>
            <el-row>
              <el-col :span="4">当前文件缓存数：
                <span class="blue">{{ detailData.fileCacheCount }}</span>
              </el-col>
              <el-col :span="4">文件缓存命中数：
                <span class="blue">{{ detailData.fileCacheHits }}</span>
              </el-col>
              <el-col :span="16">文件未缓存命中数：
                <span class="blue">{{ detailData.fileCacheMisses }}</span>
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
import { getIisDetail } from '@/api/middleDetail';
export default {
  data () {
    return {
      runStateColor: '#27B102',
      runStopColor: '#ccc',
      detailData: null,
      chartsData: {
        x: [],
        y: [
          [],
          []
        ],
        multiple: true,
        markLine: { yAxis: 80, name: '门限' },
        style: 'multipleStyle'
      },
      chartsData2: {
        x: [],
        y: [
          [],
          []
        ],
        multiple: true,
        markLine: { yAxis: 80, name: '门限' },
        style: 'multipleStyle'
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
      getIisDetail(this.$route.query.cmId).then((res) => {
        this.detailData = res;
        this.chartsData.x = this.formatCharts(
          this.detailData.ioInByteSpeedMetricRespList
        ).x;
        this.chartsData.y[0] = this.formatCharts(
          this.detailData.ioInByteSpeedMetricRespList
        ).y;
        this.chartsData.y[1] = this.formatCharts(
          this.detailData.ioOutByteSpeedMetricRespList
        ).y;
        this.chartsData2.x = this.formatCharts(
          this.detailData.outByteSpeedMetricRespList
        ).x;
        this.chartsData2.y[0] = this.formatCharts(
          this.detailData.inByteSpeedMetricRespList
        ).y;
        this.chartsData2.y[1] = this.formatCharts(
          this.detailData.outByteSpeedMetricRespList
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
  .run_resource_box {
    // 运行情况
    .detail {
      position: relative;
      height: 240px;
      font-size: 14px;
      color: #666;
      .lineChart {
        // margin: 0 18px;
        .lineChart_title {
          height: 22px;
          .leftTitle {
            line-height: 22px;
          }
          .rightBox {
            padding-right: 20px;
            .square {
              text-align: right;
            }
            .square.two {
              margin-left: 20px;
            }
          }
        }
      }
    }
    .resource_detail {
      .detail_info {
        .row {
          margin-bottom: 14px;
        }
      }
    }
  }
  .network_box {
    .detail {
      height: 386px;
      .title {
        padding-bottom: 22px;
        border-bottom: 1px solid rgba(219, 219, 219, 0.52);
        .rightBox {
          float: right;
          .box_title_left {
            margin-left: 50px;
            .title_blue {
              color: #5466e0;
            }
          }
        }
        @media screen and (max-width: 1680px) {
          .rightBox {
            .box_title_left {
              margin-left: 4px;
            }
          }
        }
      }
      .lineChart {
        // margin: 0 18px;
        .lineChart_title {
          height: 22px;
          .leftTitle {
            line-height: 22px;
          }
          .rightBox {
            padding-right: 20px;
            .square {
              text-align: right;
            }
            .square.two {
              margin-left: 20px;
            }
          }
        }
      }
    }
  }
  .deta_box {
    .detail {
      height: 111px;
      .blue {
        color: #5466e0;
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
