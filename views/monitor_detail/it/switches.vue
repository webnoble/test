<template>
  <div class="detail_body">
    <el-row class="detail_box port_box">
      <el-col :span="24">
        <div class="detail">
          <div class="title">
            <span class="box_title">端口</span>
            <span class="box_small_title">总数：{{ detailData.portsNumber }}个</span>
            <span
              class="box_small_title"
            >已用{{ detailData.portsNumberOn }}个/未用{{ detailData.portsNumberOff }}个</span>
          </div>
          <div class="tableBox two">
            <div class="cacheName">
              <span class="begin">选择端口：</span>
              <img src="@/assets/icon/switchHead.png" class="bigBoxImg">
              <span class="portBox">
                <span
                  v-for="(item , index) in currentPageData"
                  :key="item.infoIndex"
                  class="littleBox"
                  :class="activeIndex === index ? 'activePort':''"
                  @click="activePort(item ,index)"
                >
                  <img v-if="item.infoStatus === '2'" src="@/assets/icon/errorPort.png">
                  <!-- <img v-else-if="item.infoStatus === '1'" src="@/assets/icon/grayPort.png" /> -->

                  <img v-else src="@/assets/icon/normalPort.png">
                </span>
              </span>
              <img src="@/assets/icon/switchFoot.png">
              <!-- 暂不实现 分页功能 -->
              <span class="triangle-box">
                <span
                  class="left-triangle"
                  :class="listQuery.currentPage === 1 ? 'noPrevClick': ''"
                  @click="prevPage"
                ></span>
                <span
                  class="right-triangle"
                  :class="listQuery.currentPage === listQuery.totalPage ? 'noNextClick': ''"
                  @click="nextPage"
                ></span>
              </span>
              <span class="infoBox">
                <span class="one">
                  选中端口:
                  <span
                    class="info"
                    :class="portInfo.infoStatus === '2' ? 'noStatus':''"
                  >{{ portInfo.infoName }}</span>
                </span>
                <span class="two">
                  带宽
                  <span class="info">{{ portInfo.ifBandWidth }}M</span>
                </span>
                <span class="three">
                  流速
                  <span class="info">{{ portInfo.infoFlowRate }}B/S</span>
                </span>
              </span>
            </div>
          </div>
          <div class="lineChart">
            <div class="lineChart_body">
              <div class="lineChart_title">
                <span class="leftBox">流速 b / s</span>
                <span class="rightBox">
                  <span class="square one">{{ portInfo.infoName }}</span>
                </span>
              </div>
              <div>
                <echarts-line style="height:246px;" :charts-data="chartsData" class="echarts"></echarts-line>
              </div>
            </div>
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
              <span class="small_title_one">
                内存利用率:
                <span class="titleRed">{{ detailData.currentMemoryUsage }}%</span>
              </span>
              <!-- <span class="small_title_two">
                <span class="info">CPU1: 34&#8451;</span>
                <span class="info">CPU2: 34&#8451;</span>
                <span class="info" style="color: #F02323;">CPU3: 38&#8451;</span>
                <span class="info">CPU4: 34&#8451;</span>
              </span>-->
            </div>
            <div class="lineChart_body">
              <div class="lineChart_title_two">
                <span class="leftBox">%</span>
                <!-- <span class="rightBox">
                  <span class="square one">CPU1</span>
                  <span class="square two">CPU2</span>
                  <span class="square three">CPU3</span>
                  <span class="square four">CPU4</span>
                </span>-->
              </div>
              <div>
                <echarts-line style="height:260px" :charts-data="chartsData2" class="echarts"></echarts-line>
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
              <span class="small_title_one">
                cpu负载：
                <span class="titleRed">{{ detailData.currentCpuLoad }}%</span>
              </span>
              <!-- <span class="small_title_two">
                <span class="info">CPU1: 34%</span>
                <span class="info">CPU2: 34%</span>
                <span class="info" style="color: #F02323;">CPU3: 98%</span>
                <span class="info">CPU4: 34%</span>
              </span>-->
            </div>
            <div class="lineChart_body">
              <div class="lineChart_title_two">
                <span class="leftBox">负载(%):</span>
                <!-- <span class="rightBox">
                  <span class="square one">CPU1</span>
                  <span class="square two">CPU2</span>
                  <span class="square three">CPU3</span>
                  <span class="square four">CPU4</span>
                </span>-->
              </div>
              <div>
                <echarts-line style="height:260px" :charts-data="chartsData3" class="echarts"></echarts-line>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="detail_box run_describe_box" :gutter="20">
      <el-col :span="4">
        <div class="detail run_detail">
          <div class="title">
            <span class="box_title">运行信息</span>
          </div>
          <div class="main">
            <div class="row row_one">
              <span class="col_one">
                设备名称 ：
                <span class="black">{{ detailData.brandName }}</span>
              </span>
            </div>
            <div class="row row_two">
              <span class="col_one">
                运行状态：
                <i
                  class="small_round"
                  :style="{backgroundColor: detailData.switchRunTimeStatus === '正常' ? runStateColor : runStopColor}"
                ></i>
                <span class="black">{{ detailData.switchRunTimeStatus }}</span>
              </span>
            </div>
          </div>
          <div class="iconfont iconicon_cog"></div>
        </div>
      </el-col>
      <el-col :span="20" class="describe_box">
        <div class="detail describe_detail">
          <div class="title">
            <span class="box_title">描述信息</span>
          </div>
          <div class="information">
            <div class="row">
              所在区域：
              <span class="black">{{ detailData.switchArea }}</span>
            </div>
            <div class="row">
              所在位置：
              <span class="black">{{ detailData.switchLocation }}</span>
            </div>
            <div class="row last_info">
              <span class="title">描述信息：</span>
              <span class="black content">{{ detailData.switchDetail || '暂无描述' }}</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getSwitchDetail } from '@/api/switch';
export default {
  data () {
    return {
      rrunStateColor: '#27B102',
      runStopColor: '#ccc',
      // 详细信息
      detailData: {},
      // 后端返回的端口集合
      portArr: [],
      // 前端分页展示的端口集合
      currentPageData: [],
      // 选中的端口序号
      activeIndex: 0,
      // 具体端口信息
      portInfo: {},
      chartsData: {
        x: [],
        y: [],
        markLine: { yAxis: 2000, name: '门限' },
        style: 'purple',
        port: '端口1'
      },
      chartsData2: {
        x: [],
        // y: [
        //   [60, 70, 80, 83, 60, 30, 80, 86, 68, 63, 6, 68, 65],
        //   [6, 68, 65, 62, 63, 60, 70, 20, 23, 60, 80, 80, 26],
        //   [72, 65, 64, 62, 65, 20, 23, 60, 30, 80, 26, 60, 87],
        //   [63, 66, 63, 62, 66, 60, 70, 25, 26, 66, 30, 80, 26]
        // ],
        // multiple: true,
        y: [],
        markLine: { yAxis: 80, name: '门限' },
        style: 'multipleStyle'
      },
      chartsData3: {
        x: [],
        // y: [
        //   [90, 70, 80, 83, 60, 30, 80, 86, 68, 63, 6, 68, 65],
        //   [60, 68, 65, 62, 63, 60, 70, 20, 23, 60, 80, 80, 26],
        //   [42, 65, 64, 62, 65, 20, 23, 60, 30, 80, 26, 60, 87],
        //   [93, 66, 63, 62, 66, 60, 70, 25, 26, 66, 30, 80, 26]
        // ],
        // multiple: true,
        y: [],
        markLine: { yAxis: 80, name: '门限' },
        style: 'multipleStyle'
      },
      listQuery: {
        totalPage: 1,
        currentPage: 1,
        pageSize: 24
      },
      // 页面宽度
      screenWidth: ''
    }
  },
  watch: {
    // 监听浏览器窗口宽度,当浏览器窗口小于1680时
    screenWidth (val) {
      // console.log(val);
      if (val < 1680) {
        this.listQuery.currentPage = 1;
        this.listQuery.pageSize = 24;
        this.listQuery.totalPage = Math.ceil(this.portArr.length / this.listQuery.pageSize);
        this.setCurrentPageData();
        // console.log(this.portArr.length);
      } else {
        this.listQuery.currentPage = 1;
        this.listQuery.pageSize = 48;
        this.listQuery.totalPage = Math.ceil(this.portArr.length / this.listQuery.pageSize);
        this.setCurrentPageData();
      }
    }
  },
  mounted () {
    this.getDetailData();
  },
  methods: {
    activePort (item, index) {
      this.portInfo = item;
      this.activeIndex = index;
      this.chartsData.x = this.formatCharts(
        this.detailData.interfaceKpiInfos[index + 1]
      ).x;
      this.chartsData.y = this.formatCharts(
        this.detailData.interfaceKpiInfos[index + 1]
      ).y;
    },
    // 设置当前页面数据，对数组进行截取
    setCurrentPageData () {
      const begin = (this.listQuery.currentPage - 1) * this.listQuery.pageSize;
      const end = this.listQuery.currentPage * this.listQuery.pageSize;
      if (this.detailData.interfaceStaticInfos) {
        this.currentPageData = this.portArr.slice(begin, end);
      }
    },
    // 上一页
    prevPage () {
      if (this.listQuery.currentPage === 1) return;
      this.listQuery.currentPage--;
      this.setCurrentPageData();
    },
    // 下一页
    nextPage () {
      // console.log(this.listQuery.totalPage);
      if (this.listQuery.currentPage === this.listQuery.totalPage) return;
      this.listQuery.currentPage++;
      this.setCurrentPageData();
    },
    // 获取页面详情
    getDetailData () {
      getSwitchDetail(this.$route.query.id).then(res => {
        this.detailData = res;
        // this.setCurrentPageData();
        if (this.detailData.switchRunTimeStatus === 'OK') {
          this.detailData.switchRunTimeStatus = '正常'
        } else if (this.detailData.switchRunTimeStatus === 'timeOut') {
          this.detailData.switchRunTimeStatus = '断联'
        } else {
          this.detailData.switchRunTimeStatus = '异常'
        }
        this.chartsData.x = this.formatCharts(
          this.detailData.interfaceKpiInfos[1]
        ).x;
        this.chartsData.y = this.formatCharts(
          this.detailData.interfaceKpiInfos[1]
        ).y;
        this.chartsData2.x = this.formatCharts(
          this.detailData.memoryKpiInfoList
        ).x;
        this.chartsData2.y = this.formatCharts(
          this.detailData.memoryKpiInfoList
        ).y;
        this.chartsData3.x = this.formatCharts(
          this.detailData.cpuLoadList
        ).x;
        this.chartsData3.y = this.formatCharts(
          this.detailData.cpuLoadList
        ).y;
        this.portArr = res.interfaceStaticInfos;
        this.portInfo = this.portArr[0];
        // 监听浏览器窗口事件
        window.onresize = () => {
          this.screenWidth = window.innerWidth;
        }
        if (window.innerWidth < 1680) {
          this.listQuery.pageSize = 24;
          this.listQuery.totalPage = Math.ceil(this.portArr.length / this.listQuery.pageSize);
          this.setCurrentPageData();
        } else {
          this.listQuery.pageSize = 48;
          this.listQuery.totalPage = Math.ceil(this.portArr.length / this.listQuery.pageSize);
          this.setCurrentPageData();
        }
        // console.log(res)
      })
    },
    formatCharts (data) {
      const x = [];
      const y = [];
      if (data && data.length > 0) {
        data.forEach(item => {
          x.push(this.$dateFormat('hh:mm', new Date(item.key)));
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
  .lineChart {
    .lineChart_title {
      margin-top: 20px;
      padding-left: 14px;
      // padding-right: 80px;
    }
    .lineChart_title_two {
      padding: 0 20px;
    }
  }
  .port_box {
    .detail {
      height: 454px;
      .title {
        .box_small_title {
          margin-left: 27px;
        }
      }
      .tableBox.two {
        .cacheName {
          display: flex;
          align-items: center;
          height: 84px;
          padding: 0 14px;
          .begin {
            display: inline-block;
            min-width: 80px;
          }
          .bigBoxImg {
            height: 84px;
          }
          .portBox {
            // flex布局纵向存在宽度无法被撑开的问题
            // display: inline-flex;
            // flex-direction: column;
            // flex-wrap: wrap;
            // lr可理解为left to right，即垂直方向上从左到右
            writing-mode: vertical-lr;
            height: 100%;
            width: 780px;
            min-width: 390px;
            overflow: hidden;
            background-color: #f1f1f1;
            box-sizing: border-box;
            border: 3px solid #dddddd;
            padding-top: 7px;
            border-left: none;
            .littleBox {
              // display: flex;
              // align-items: center;
              // justify-content: center;
              // tb可理解为top to bottom，即水平方向自上而下
              writing-mode: horizontal-tb;
              position: relative;
              width: 32px;
              height: 32px;
              line-height: 32px;
              img {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 19px;
                height: 15px;
                margin: 0 auto;
              }
            }
            .littleBox.activePort {
              background: #5466e0;
            }
            .littleBox.activePort:after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%);
              width: 0;
              height: 0;
              border: 4px solid;
              border-color: transparent transparent #fff transparent;
            }
          }
          @media screen and (max-width: 1680px) {
            .portBox {
              width: 390px;
            }
          }
          .triangle-box {
            margin-left: 30px;
            .left-triangle {
              display: inline-block;
              width: 0;
              height: 0;
              border: 8px solid;
              border-color: transparent #5466e0 transparent transparent;
              cursor: pointer;
            }
            .right-triangle {
              display: inline-block;
              width: 0;
              height: 0;
              border: 8px solid;
              border-color: transparent transparent transparent #5466e0;
              cursor: pointer;
            }
            .noPrevClick {
              border-color: transparent #b0b0b0 transparent transparent;
            }
            .noNextClick {
              border-color: transparent transparent transparent #b0b0b0;
            }
          }
          .infoBox {
            margin-left: 150px;
            color: #333333;
            .one,
            .two,
            .three {
              margin-left: 10px;
              .info {
                color: #5466e0;
              }
            }
            .one {
              .info {
                color: #000000;
              }
              .info:before {
                content: '';
                display: inline-block;
                width: 12px;
                height: 12px;
                border-radius: 6px;
                background-color: #29e200;
                margin: 0 6px;
              }
              .noStatus:before {
                content: '';
                background-color: red;
              }
            }
          }
          @media screen and (max-width: 1500px) {
            .infoBox {
              margin-left: 20px;
            }
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
          // padding-bottom: 56px;
          .titleRed {
            color: #f02323;
          }
          .small_title_one {
            // float: left;
            display: inline-block;
            font-size: 16px;
            line-height: 18px;
            width: 100%;
            text-align: center;
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
  .run_describe_box {
    .describe_box {
      margin-top: 0;
      .last_info {
        .content {
          width: calc(100% - 76px);
        }
      }
    }
    .detail {
      height: 240px;
      .row {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
