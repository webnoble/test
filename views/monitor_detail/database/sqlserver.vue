<template>
  <div class="detail_body">
    <el-row class="detail_box run_cache_box" :gutter="20">
      <el-col :span="4">
        <div class="detail run_detail">
          <div class="title">
            <span class="box_title">运行信息</span>
          </div>
          <div class="main detail_info">
            <div class="row row_one">
              <span class="col_one">
                运行时长：
                <span class="black">{{ detailData.upTime | timeFormatter }}</span>
              </span>
            </div>
            <div class="row row_two">
              <span class="col_one">
                运行状态：
                <i
                  class="small_round"
                  :style="{backgroundColor: detailData.status === '正常' ? runStateColor : runStopColor}"
                ></i>
                <span class="black">{{ detailData.status }}</span>
              </span>
            </div>
            <div class="row row_three">
              <span class="col_one">
                每秒执行编译数量 ：
                <span class="black">{{ detailData.compilationSec }}次</span>
              </span>
            </div>
            <div class="row row_four">
              <span class="col_one">
                已获取的缓冲页数 ：
                <span class="black">{{ detailData.databasePages }}</span>
              </span>
            </div>
          </div>
          <div class="iconfont iconicon_cog"></div>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="detail statistical_detail">
          <div class="title">
            <span class="box_title">缓存管理</span>
          </div>
          <div class="main statistical_detail_body">
            <el-row class="row">
              <el-col :span="8">
                <span>高速缓冲区命中率：</span>
                <span class="black">{{ detailData.cacheHitRatio | precent }}</span>
              </el-col>
              <el-col :span="8">
                <span>缓冲池页面数：</span>
                <span class="black">{{ detailData.targetPage }}</span>
              </el-col>
              <el-col :span="8">
                <span>线程缓存命中率：</span>
                <span class="black">{{ detailData.threadRatio | precent }}</span>
              </el-col>
            </el-row>
            <el-row class="row">
              <el-col :span="8">
                <span>每秒懒写入个数：</span>
                <span class="black">{{ detailData.lazyWriteSec }}</span>
              </el-col>
              <el-col :span="8">
                <span>物理数据页每秒读取数：</span>
                <span class="black">{{ detailData.pageReadsSec }}</span>
              </el-col>
              <el-col :span="8">
                <span>物理数据每秒写入数：</span>
                <span class="black">{{ detailData.pageWriteSec }}</span>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="detail_box save_lock_box" :gutter="20">
      <el-col :span="12">
        <div class="detail">
          <div class="title">
            <span class="box_title">锁存</span>
          </div>
          <div class="main">
            <el-row>
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="8">
                <span>
                  线程获取闩的平均等待时间：
                  <span class="blue">{{ detailData.latchWaitTime }}</span>
                </span>
              </el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="8">
                <span>
                  未能立即授予的闩锁请求数：
                  <span class="blue">{{ detailData.latchWaitSec }}</span>
                </span>
              </el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="8">
                <span>
                  闩锁请求的总等待时间：
                  <span class="blue">{{ detailData.totalLatchWaitTime }}</span>
                </span>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="detail">
          <div class="title">
            <span class="box_title">锁</span>
          </div>
          <div class="main">
            <el-row>
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="8">
                <span>
                  锁平均等待时间：
                  <span class="blue">{{ detailData.lockAvgWaitTime }}</span>
                </span>
              </el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="8">
                <span>
                  每秒超时的锁请求数：
                  <span class="blue">{{ detailData.lockTimeoutSec }}</span>
                </span>
              </el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="8">
                <span>
                  每秒导致死锁的请求数：
                  <span class="blue">{{ detailData.deadLockSec }}</span>
                </span>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="detail_box plan_box">
      <el-col :span="24">
        <div class="detail">
          <div class="title">
            <span class="box_title">计划缓存信息</span>
            <span class="box_title_center">
              计划缓存内存占用：
              <span class="title_green">{{ detailData.planCacheSize | sizeFormatter }}</span>
            </span>
          </div>
          <div class="tableBox">
            <div class="tables table_body">
              <v-table :field-arr="fieldArr" :table-setting.sync="tableSetting" class="tables"/>
              <!-- <dynamic-table :field-arr="fieldArr" :table-data="planCacheInfoData" height="240" class="tables"/> -->
            </div>
          </div>
          <div class="tableBox two">
            <div class="table_title">计划缓存命中率</div>
            <div class="cacheName">
              <el-row class="medium_box" :gutter="20">
                <el-col v-for="(item, index) in planCacheHitInfoData" :key="index" :span="4">
                  <div
                    class="small_box"
                    :class="activeIndex === index ? 'active': ''"
                    @click="cacheChange(item, index)"
                  >
                    <span class="fl">{{ item.cacheName }}</span>
                    <span class="fr">{{ item.hitRatio | precent }}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="lineChart">
              <div class="lineChart_title">
                <span>%</span>
                <span class="rightBox">
                  <span class="square one">{{ chartsData.cacheName }}</span>
                </span>
              </div>
              <div class="lineChart_body">
                <echarts-line style="height:300px" :charts-data="chartsData"></echarts-line>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="detail_box sql_box">
      <el-col :span="24">
        <div class="detail">
          <div class="title">
            <span class="box_title">SQL错误</span>
          </div>
          <div class="main">
            <el-row>
              <el-col :span="5">
                <span>
                  每秒累计错误数：
                  <span class="blue">{{ detailData.totalErrorSec }}</span>
                </span>
              </el-col>
              <el-col :span="5">
                <span>
                  每秒DB离线错误：
                  <span class="blue">{{ detailData.dbOfflineError }}</span>
                </span>
              </el-col>
              <el-col :span="5">
                <span>
                  信息错误：
                  <span class="blue">{{ detailData.infoError }}</span>
                </span>
              </el-col>
              <el-col :span="5">
                <span>
                  断开错误：
                  <span class="blue">{{ detailData.killConnError }}</span>
                </span>
              </el-col>
              <el-col :span="4">
                <span>
                  用户错误：
                  <span class="blue">{{ detailData.userError }}</span>
                </span>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="detail_box temporary_box">
      <el-col :span="7">
        <div class="detail">
          <div class="title">
            <span class="box_title">SQL错误</span>
          </div>
          <div class="row row_one">
            <span class="col_one">
              当前使用的的临时表数量：
              <span class="black">{{ detailData.activeTempTable }}</span>
            </span>
          </div>
          <div class="row row_two">
            <span class="col_one">
              当前每秒创建临时表数量：
              <span class="black">{{ detailData.tempTableCreateSec }}</span>
            </span>
          </div>
        </div>
      </el-col>
      <el-col :span="17">
        <div class="detail lineChart">
          <div class="lineChart_title">
            <span>个</span>
          </div>
          <div class="lineChart_body">
            <echarts-line style="height:210px" :charts-data="chartsData2"></echarts-line>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="detail_box batch_scanning_box" :gutter="20">
      <el-col :span="12">
        <div class="detail">
          <div class="title">
            <span class="box_title">批处理请求</span>
            <span class="box_title_center">
              当前每秒批处理请求数：
              <span class="title_blue">{{ detailData.batchRequestSec }}次</span>
            </span>
          </div>
          <div class="lineChart">
            <div class="lineChart_title">
              <span>次</span>
            </div>
            <div class="lineChart_body">
              <echarts-line style="height:230px" :charts-data="chartsData3"></echarts-line>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="detail">
          <div class="title">
            <span class="box_title">全表扫描数量</span>
            <span class="box_title_center">
              全表扫描数量:
              <span class="title_blue">{{ detailData.fullScansSec }}次</span>
            </span>
          </div>
          <div class="lineChart">
            <div class="lineChart_title">
              <span>次</span>
            </div>
            <div class="lineChart_body">
              <echarts-line style="height:230px" :charts-data="chartsData4"></echarts-line>
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
              <span class="box_title">描述信息</span>
            </div>
            <div class="information">
              <el-row :gutter="20">
                <el-col :span="5">
                  sqlserver版本：
                  <span class="black">{{ detailData.version }}</span>
                </el-col>
                <el-col :span="4">
                  版本号:
                  <span class="black">{{ detailData.versionNo }}</span>
                </el-col>
                <el-col :span="5">
                  所在操作系统：
                  <span class="black">{{ detailData.os }}</span>
                </el-col>
                <el-col :span="10">
                  所在位置：
                  <span class="black">{{ detailData.location }}</span>
                </el-col>
                <el-col :span="24">
                  描述信息：
                  <span class="black">{{ detailData.detail || '暂无描述' }}</span>
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
import { getSqlserver } from '@/api/sysDatabaseDetail';
export default {
  filters: {
    precent (limit) {
      if (!limit) {
        return '0%';
      } else if (limit < 0) {
        return '100%';
      }
      // 字符转换为数字
      return Number(limit).toFixed(2) + '%';
    }
  },
  data () {
    return {
      runStateColor: '#27B102',
      runStopColor: '#ccc',
      detailData: null,
      // 选中的缓存区
      activeIndex: 0,
      chartsData: {
        x: [],
        y: [],
        style: 'purple',
        markLine: { yAxis: 80, name: '门限' },
        cacheName: '_Total'
      },
      chartsData2: {
        x: [],
        y: [],
        markLine: { yAxis: 2000, name: '门限' },
        style: 'purple'
      },
      chartsData3: {
        x: [],
        y: [],
        markLine: { yAxis: 2000, name: '门限' },
        style: 'purple'
      },
      chartsData4: {
        x: [],
        y: [],
        markLine: { yAxis: 2000, name: '门限' },
        style: 'purple'
      },
      // 计划缓存命中率(表格)
      planCacheHitInfoData: [],
      // 计划缓存信息(表格)
      planCacheInfoData: [],
      tableSetting: {
        pagination: {
          show: false,
          rowsPerPage: [10, 20, 30]
        },
        param: {
          page: 1,
          rows: 5,
          sord: 'desc',
          _search: false,
          filters: {
            groupOp: 'AND',
            rules: []
          }
        },
        // apiUrl: 'monitor/list',
        data: {
          items: []
          // currentPage: 1,
          // rowsPerPage: 10
          // totalPages: 1,
          // totalRows: 1
        },
        socket: {
          url: 'http://localhost:9999/echo',
          subscribe: 'data',
          tagName: 'id'
        },
        isPoll: true,
        pollTime: 300000
      },
      fieldArr: [
        {
          label: '使用次数',
          key: 'useCounts'
        }, {
          label: '缓存对象类型',
          key: 'cacheObjType'
        }, {
          label: '对象类型',
          key: 'objType'
        }, {
          label: 'sql计划',
          key: 'sqlText'
        }
      ]
    }
  },
  created () {
    this.getData();
  },
  methods: {
    // 切换折线图数据 事件
    cacheChange (item, index) {
      this.chartsData.cacheName = item.cacheName;
      this.chartsData.x = this.formatCharts(
        this.detailData.planCacheHitInfoLine[item.cacheName]
      ).x;
      this.chartsData.y = this.formatCharts(
        this.detailData.planCacheHitInfoLine[item.cacheName]
      ).y;
      console.log(this.chartsData);
      this.activeIndex = index;
    },
    getData () {
      getSqlserver(this.$route.query.id).then((res) => {
        this.detailData = res;
        if (this.detailData.status === 'OK') {
          this.detailData.status = '正常'
        } else if (this.detailData.status === 'timeOut') {
          this.detailData.status = '断联'
        } else {
          this.detailData.status = '异常'
        }
        this.chartsData.cacheName = this.detailData.planCacheHitInfo[0].cacheName;
        this.planCacheHitInfoData = this.detailData.planCacheHitInfo;
        // this.planCacheInfoData = this.detailData.planCacheInfo;
        this.tableSetting.data.items = this.detailData.planCacheInfo;
        // console.log(this.tableSetting.data);
        this.chartsData.x = this.formatCharts(
          this.detailData.planCacheHitInfoLine._Total
        ).x;
        this.chartsData.y = this.formatCharts(
          this.detailData.planCacheHitInfoLine._Total
        ).y;
        this.chartsData2.x = this.formatCharts(
          this.detailData.tempTableCreateSecLine
        ).x;
        this.chartsData2.y = this.formatCharts(
          this.detailData.tempTableCreateSecLine
        ).y;
        this.chartsData3.x = this.formatCharts(
          this.detailData.batchRequestSecLine
        ).x;
        this.chartsData3.y = this.formatCharts(
          this.detailData.batchRequestSecLine
        ).y;
        this.chartsData4.x = this.formatCharts(
          this.detailData.fullScansSecLine
        ).x;
        this.chartsData4.y = this.formatCharts(
          this.detailData.fullScansSecLine
        ).y;
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
    width: 100%;
    height: 240px;
    padding: 0px;
    overflow: auto;
  }
  .tables >>> .el-table__header {
    width: calc(100% + 17px) !important;
  }
  .tables >>> .el-table__body {
    width: calc(100% + 5px) !important;
  }
  .run_cache_box {
    // 运行情况
    .detail {
      height: 240px;
    }
    .detail_info,
    .statistical_detail_body {
      // 加高行间距
      .row {
        margin-bottom: 20px;
      }
    }
  }
  .save_lock_box {
    .detail {
      height: 94px;
    }
    @media screen and (max-width: 1919px) {
      .detail {
        height: 114px;
        .el-col {
          line-height: 22px;
        }
      }
    }
  }
  .plan_box {
    .detail {
      height: 770px;
      .tableBox {
        height: calc(40% - 36px);
        .table_title {
          color: #606060;
          font-size: 16px;
        }
        .table_body {
          margin-top: 15px;
        }
      }
      .tableBox.two {
        height: calc(60% - 36px);
        .cacheName {
          .medium_box {
            margin-top: 20px;
            height: 32px;
            .small_box {
              width: 100%;
              height: 32px;
              background-color: rgba(244, 243, 249, 0.9);
              line-height: 32px;
              color: #444444;
              font-size: 14px;
              padding: 0 12px;
              margin-bottom: 20px;
              cursor: pointer;
            }
            .active {
              background-color: #5466e0;
              color: #ffffff;
            }
          }
        }
        .lineChart {
          .lineChart_title {
            height: 22px;
            line-height: 22px;
            margin-top: 20px;
            margin-bottom: 20px;
            padding-right: 20px;
          }
        }
      }
    }
  }
  .sql_box {
    .detail {
      height: 94px;
    }
  }
  .temporary_box {
    .detail {
      height: 287px;
      .row {
        margin-top: 26px;
      }
      .row_two {
        margin-top: 44px;
      }
    }
    .lineChart {
      border-left: 1px solid rgba(236, 236, 236, 0.52);
      .lineChart_title {
        margin-top: 20px;
        margin-bottom: 14px;
      }
    }
  }
  .batch_scanning_box {
    .detail {
      height: 330px;
    }
  }
}
</style>
