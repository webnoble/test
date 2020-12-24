<template>
  <div class="detail_body">
    <el-row class="detail_box run_request_box" :gutter="20">
      <el-col :span="4">
        <div class="detail run_detail">
          <div class="title">
            <span class="box_title">运行状态</span>
          </div>
          <div class="main detail_info">
            <div class="row row_one">
              <span class="col_one">
                运行时长：
                <span class="black">{{ detailData.runTime * 1000 | timeFormatter }}</span>
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
      <el-col :span="20">
        <div class="hardDisk_box">
          <el-row style="height: 100%;">
            <el-col :span="9" class="detail disk_box">
              <div class="title">
                <span class="box_title">硬盘</span>
              </div>
              <div class="round_box">
                <!-- <pie :max-num="detailData.totalAccesses"></pie> -->
                <div class="countBox">
                  <span class="num">
                    {{ detailData.requests || 0 }}
                    <span style="font-size: 16px;">个</span>
                  </span>
                  <span class="btnCount">总请求数</span>
                </div>
                <div class="info_box">
                  <div class="prompt one">
                    当前活动连接数量:
                    <span class="size">{{ detailData.activeConnections || 0 }}个</span>
                  </div>
                  <div class="prompt two">
                    当前空闲连接数量:
                    <span class="size">{{ detailData.waiting || '0' }}个</span>
                  </div>
                  <div class="prompt three">
                    已接收的连接总数:
                    <span class="size">{{ detailData.accepts || '0' }}个</span>
                  </div>
                  <div class="prompt four">
                    已处理的连接总数:
                    <span class="size">{{ detailData.handle || '0' }}个</span>
                  </div>
                  <div class="prompt five">
                    正在读取的连接数量:
                    <span class="size">{{ detailData.reading || '0' }}个</span>
                  </div>
                  <div class="prompt six">
                    正在响应的连接数量:
                    <span class="size">{{ detailData.writing || '0' }}个</span>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="15" class="lineChart_box">
              <div class="detail lineChart">
                <div class="lineChart_title">
                  <span class="one">活动的连接数量(个)</span>
                </div>
                <div class="lineChart_body">
                  <echarts-line style="height:190px" :charts-data="chartsData"></echarts-line>
                </div>
              </div>
            </el-col>
          </el-row>
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
// import pie from './pie';
import { getNginkDetail } from '@/api/middleDetail';
export default {
  name: 'Apache',
  // components: {
  //   pie
  // },
  data () {
    return {
      runStateColor: '#27B102',
      runStopColor: '#ccc',
      // getters: 'monitor/soft/flowList',
      chartsData: {
        x: ['11:10', '11:20', '11:30', '11:40', '11:50', '12:00', '12:10', '12:20', '12:30', '12:40', '12:50', '13:00'],
        y: [2900, 1300, 1100, 1800, 1500, 1060, 1870, 2000, 2300, 1000, 1130, 1080, 2100],
        style: 'purple'
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
    },
    getNumber (num) {
      return function (num) {
        return this.$store.getters['layout/getNumber'](num)
      }
    }
  },
  created () {
    // console.log(this.runStatus);
    this.getData();
  },
  methods: {
    getData () {
      getNginkDetail(this.$route.query.cmId).then((res) => {
        this.detailData = res;
        this.chartsData.x = this.formatCharts(
          this.detailData.activeConnectionsList
        ).x;
        this.chartsData.y = this.formatCharts(
          this.detailData.activeConnectionsList
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
    // 运行情况
    .detail {
      position: relative;
      height: 240px;
      .title {
        margin-bottom: 20px;
      }
      .round_box {
        // height: calc(100% - 42px);
        // .circle {
        //   // float: left;
        //   display: inline-block;
        //   width: 8vw;
        //   height: 8vw;
        //   vertical-align: middle;
        // }
        .countBox {
          float: left;
          width: 50%;
          // height: 100%;
          text-align: center;
          margin-top: 40px;
          .num {
            display: inline-block;
            font-size: 30px;
            width: 100%;
            text-align: center;
            margin-bottom: 16px;
            word-wrap: break-word;
          }
          .btnCount {
            display: inline-block;
            height: 28px;
            width: 80px;
            border-radius: 14px;
            color: #fff;
            background-color: #5466e0;
            padding: 0 10px;
            line-height: 28px;
            text-align: center;
          }
        }
        .info_box {
          float: left;
          // display: inline-block;
          vertical-align: middle;
          width: 50%;
          box-sizing: border-box;
          // padding-left: 10px;
          .prompt {
            font-size: 14px;
            height: 30px;
            color: #666666;
            .size {
              color: #434c5f;
            }
          }
          .prompt:before {
            content: '';
            display: inline-block;
            width: 8px;
            height: 8px;
            margin-right: 10px;
            background-color: #5466e0;
          }
          .one:before {
            background-color: #5466e0;
          }
          .two:before {
            background-color: #5cabfb;
          }
          .three:before {
            background-color: #2ed6c6;
          }
          .four:before {
            background-color: #ffc34e;
          }
          .five:before {
            background-color: #aa49d6;
          }
          .six:before {
            background-color: #26b414;
          }
        }
      }
      .lineChart_title .one {
        display: inline-block;
        height: 22px;
        line-height: 22px;
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
