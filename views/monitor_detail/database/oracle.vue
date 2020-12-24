<template>
  <div class="detail_body">
    <el-row class="detail_box run_process_box" :gutter="20">
      <el-col :span="4">
        <div class="detail run_detail">
          <div class="title">
            <span class="box_title">运行情况</span>
          </div>
          <div class="detail_info">
            <div class="row row_one">
              <span class="col_one">
                运行时长 :
                <span class="black">{{ detailData.upTime | timeFormatter }}</span>
              </span>
            </div>
            <div class="row row_two">
              <span class="col_one">
                运行状态 :
                <i
                  class="small_round"
                  :style="{backgroundColor: detailData.status === '正常' ? runStateColor : runStopColor}"
                ></i>
                <span class="black">{{ detailData.status }}</span>
              </span>
            </div>
            <div class="row row_three">
              <span class="col_one">
                数据库文件大小 :
                <span class="black">{{ detailData.totalSize | sizeFormatter }}</span>
              </span>
            </div>
            <div class="row row_four">
              <span class="col_one">
                每秒事务数 :
                <span class="black">{{ detailData.tps === '-1' ? '0': detailData.tps }}</span>
              </span>
            </div>
          </div>
          <div class="iconfont iconicon_cog"></div>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="detail process_detail">
          <div class="title">
            <span class="box_title">进程</span>
            <span class="box_title_center">
              当前进程数:
              <span class="title_blue">{{ detailData.processNum }}</span>
            </span>
          </div>
          <echarts-line style="height:260px" :charts-data="chartsData"></echarts-line>
        </div>
      </el-col>
    </el-row>
    <el-row class="detail_box session_hit_box" :gutter="20">
      <el-col :span="12">
        <div class="detail">
          <div class="title">
            <span class="box_title">会话</span>
          </div>
          <el-row class="main">
            <el-col :span="8">
              <span>
                非活动会话:
                <span class="blue">{{ detailData.dbInactiveSession }}</span>
              </span>
            </el-col>
            <el-col :span="8">
              <span>
                活动会话:
                <span class="blue">{{ detailData.userActiveSession }}</span>
              </span>
            </el-col>
            <el-col :span="8">
              <span>
                系统会话:
                <span class="blue">{{ detailData.dbSystemSession }}</span>
              </span>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="detail">
          <div class="title">
            <span class="box_title">命中率</span>
          </div>
          <div class="main">
            <span class="info">
              高速缓存命中率:
              <span class="blue">{{ detailData.bufferCacheHitRatio }}%</span>
            </span>
            <span class="info">
              空间利用率:
              <span class="blue">{{ detailData.sgaSpaceUseRatio }}%</span>
            </span>
            <span class="info">
              库缓存命中率:
              <span class="blue">{{ detailData.libraryCacheHitRatio }}%</span>
            </span>
            <span class="info">
              字典缓存命中率:
              <span class="blue">{{ detailData.dictionaryCacheHitRatio }}%</span>
            </span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="detail_box s_p_t_box" :gutter="20">
      <el-col :span="6">
        <div class="detail">
          <div class="title">
            <span class="box_title">SGA</span>
          </div>
          <div class="round-box">
            <CircleBar
              style="width : 6.8vw;height: 6.8vw;"
              :circle-data="circleData"
              class="roundBar"
            />
            <div
              class="usage"
            >空间利用率:{{ detailData.sgaSpaceUseRatio }}%({{ detailData.sgaSpaceSize - detailData.sgaFree | sizeFormatter }}/{{ detailData.sgaMaxSize | sizeFormatter }})</div>
            <div class="grayBox">
              <span class="one">目标容量:{{ detailData.sgaTargetSize | sizeFormatter }}</span>
              <span class="two">最大容量:{{ detailData.sgaMaxSize | sizeFormatter }}</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="detail">
          <div class="title">
            <span class="box_title">PGA</span>
          </div>
          <div class="round-box">
            <CircleBar
              style="width : 6.8vw;height : 6.8vw;"
              :circle-data="circleData2"
              class="roundBar"
            />
            <div
              class="usage"
            >空间使用率:{{ detailData.pgaSpaceUseRatio }}%({{ detailData.pgaUsed | sizeFormatter }}/{{ detailData.pgaTotal | sizeFormatter }})</div>
            <div class="grayBox pga">
              <span class="one">缓存命中率:{{ detailData.pgaCacheHitRatio }}%</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="detail">
          <div class="title">
            <span class="box_title">TPS</span>
            <span class="box_title_center">
              当前事务数（tps）:
              <span
                class="title_blue"
              >{{ detailData.tps === '-1' ? '0': detailData.tps }}次/秒</span>
            </span>
          </div>
          <div class="lineChart">
            <div class="lineChart_title">
              <span>每秒事务数（tps）:{{ detailData.tps === '-1' ? '0': detailData.tps }}次</span>
            </div>
            <div class="lineChart_body">
              <echarts-line style="height:220px" :charts-data="chartsData2"></echarts-line>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="detail_box audit_user_box" :gutter="20">
      <el-col :span="12">
        <div class="detail">
          <div class="title">
            <span class="box_title">审计</span>
            <span class="box_title_right">
              审计功能状态:
              <span class="tltle_blue">{{ detailData.auditStatus === 'true' ? '开启' : '关闭' }}</span>
            </span>
          </div>
          <div class="tables">
            <dynamic-table
              :field-arr="auditArr"
              height="212"
              :table-data="auditData"
              class="tables"
            />
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="detail">
          <div class="title">
            <span class="box_title">用户</span>
            <span class="box_title_right">
              连接用户
              <span class="title_green">{{ detailData.connections }}</span>个 / 锁定用户
              <span class="title_green">{{ detailData.lockUserNum }}</span>个
            </span>
          </div>
          <div class="tables">
            <dynamic-table :field-arr="userArr" :table-data="userData" height="212" class="tables"/>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="detail_box key_box">
      <el-col :span="24">
        <div class="detail key_detail">
          <div class="title">
            <span class="box_title">锁</span>
          </div>
          <div class="tableBox">
            <div class="table_title">锁等待列表</div>
            <div class="tables table_body">
              <dynamic-table
                :field-arr="waitingArr"
                :table-data="waitingData"
                height="212"
                class="tables"
              />
            </div>
          </div>
          <div class="tableBox">
            <div class="table_title">死锁会话信息</div>
            <div class="tables table_body">
              <dynamic-table
                :field-arr="deadlockArr"
                :table-data="deadlockData"
                height="222"
                class="tables"
              />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="detail_box table_logic_box" :gutter="20">
      <el-col :span="12">
        <div class="detail">
          <div class="title">
            <span class="box_title">表空间</span>
          </div>
          <div class="tables table_body">
            <v-table
              :field-arr="spaceArr"
              :table-setting.sync="spaceSetting"
              style="height: 220px;overflow: auto;"
            />
            <!-- <dynamic-table :field-arr="spaceArr" :table-data="spaceData" class="tables" height="220" /> -->
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="detail">
          <div class="title">
            <span class="box_title">逻辑 I/O</span>
            <span class="box_title_center">
              当前I/O次数:
              <span
                class="title_green"
              >{{ detailData.iops === '-1' ? '0' : detailData.iops }}次/秒</span>
            </span>
          </div>
          <echarts-line style="height:230px" :charts-data="chartsData3"></echarts-line>
        </div>
      </el-col>
    </el-row>
    <el-row class="detail_box fragmentation_box">
      <el-col :span="24">
        <div class="detail">
          <div class="title">
            <span class="box_title">碎片化程度</span>
          </div>
          <ul class="dash">
            <li v-for="(item, index) in spaceData.items" :key="index">
              <dashProgress :name="item.tableSpaceName" :num="item.fsfi - 0"></dashProgress>
            </li>
          </ul>
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
                <el-col :span="8">
                  oracle版本:
                  <span class="black">{{ detailData.version }}</span>
                </el-col>
                <el-col :span="6">
                  版本号:
                  <span class="black">{{ detailData.versionNo }}</span>
                </el-col>
                <el-col :span="5">
                  所在操作系统:
                  <span class="black">{{ detailData.os }}</span>
                </el-col>
                <el-col :span="5">
                  所在位置:
                  <span class="black">{{ detailData.location }}</span>
                </el-col>
                <el-col :span="24" class="last_info">
                  <span class="title">描述信息:</span>
                  <span class="black content">{{ detailData.detail || '暂无描述' }}</span>
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
import { getOracle } from '@/api/sysDatabaseDetail';
export default {
  filters: {
    precent (limit) {
      if (!limit) {
        return '0%';
      } else if (limit < 0) {
        return '100%';
      }
      return limit.toFixed(2) * 100 + '%';
    }
  },
  data () {
    return {
      runStateColor: '#27B102',
      runStopColor: '#ccc',
      detailData: null,
      dashProgressList: [],
      chartsData: {
        x: ['11:10', '11:20', '11:30', '11:40', '11:50', '12:00', '12:10', '12:20', '12:30', '12:40', '12:50', '13:00'],
        y: [1800, 1700, 1100, 1800, 1500, 1060, 1870, 2000, 2300, 1000, 1130, 1080, 2100],
        markLine: { yAxis: 2000, name: '门限' },
        style: 'purple'
      },
      chartsData2: {
        x: ['11:10', '11:20', '11:30', '11:40', '11:50', '12:00', '12:10', '12:20', '12:30', '12:40', '12:50', '13:00'],
        y: [1200, 2300, 1100, 1800, 1500, 1060, 1870, 2000, 2300, 1000, 1130, 1080, 2100],
        markLine: { yAxis: 2000, name: '门限' },
        style: 'purple'
      },
      chartsData3: {
        x: ['11:10', '11:20', '11:30', '11:40', '11:50', '12:00', '12:10', '12:20', '12:30', '12:40', '12:50', '13:00'],
        y: [2200, 1300, 1100, 1800, 1500, 1060, 1870, 2000, 2300, 1000, 1130, 1080, 2100],
        markLine: { yAxis: 2000, name: '门限' },
        style: 'purple'
      },
      circleData: {
        precent: 47
      },
      circleData2: {
        precent: 72
      },
      spaceSetting: {
        pagination: {
          show: false,
          rowsPerPage: [10, 20, 30]
        },
        param: {
          page: 1,
          rows: 10,
          sord: 'desc',
          _search: false,
          filters: {
            groupOp: 'AND',
            rules: []
          }
        },
        data: {},
        socket: {
          url: 'http://localhost:9999/echo',
          subscribe: 'data',
          tagName: 'id'
        },
        isPoll: true,
        pollTime: 300000
      },
      auditData: [],
      userData: [],
      waitingData: [],
      deadlockData: [],
      spaceData: {
        items: []
      }
    }
  },
  computed: {
    getSize (size) {
      return function (size) {
        // console.log(size);
        return this.$store.getters['layout/getSize'](size)
      }
    },
    auditArr: function () {
      return [
        {
          label: '用户名',
          key: 'userName'
        }, {
          label: '审计操作对象',
          key: 'actionName'
        }, {
          label: '审计频率',
          key: 'actionFreq'
        }
      ]
    },
    userArr: function () {
      return [
        {
          label: '用户名',
          key: 'userName'
        }, {
          label: '用户状态',
          key: 'accountStatus'
        }, {
          label: '锁定时间',
          key: 'locklong',
          formatter: {
            type: 'time'
          }
        }, {
          label: '超时时间',
          key: 'expirylong',
          formatter: {
            type: 'time'
          }
        }
      ]
    },
    waitingArr: function () {
      return [
        {
          label: '等待锁的会话ID',
          key: 'waitingSession'
        }, {
          label: '持有锁的会话ID',
          key: 'holdingSession'
        }, {
          label: '锁类型',
          key: 'lockType'
        }, {
          label: '锁的持有模式',
          key: 'modeHeld'
        }, {
          label: '请求的模式',
          key: 'modeRequested'
        }, {
          label: '锁ID1',
          key: 'lockId1'
        }, {
          label: '锁ID2',
          key: 'lockId2'
        }
      ]
    },
    deadlockArr: function () {
      return [
        {
          label: '会话标识符',
          key: 'sessionSid'
        }, {
          label: '会话对象',
          key: 'sessionSerial'
        }, {
          label: '锁类型',
          key: 'lockedMode'
        }, {
          label: '数据库用户名',
          key: 'oracleUsername'
        }, {
          label: '操作系统机器名',
          key: 'machine'
        }, {
          label: '操作系统终端名称',
          key: 'terminal'
        }, {
          label: '操作对象名称',
          key: 'objectName'
        }, {
          label: '会话建立时间',
          key: 'logonTime',
          formatter: {
            type: 'time'
          }
        }
      ]
    },
    spaceArr: function () {
      return [
        {
          label: '表空间名称',
          key: 'tableSpaceName'
        }, {
          label: '表空间大小',
          key: 'tableSpaceSize',
          formatter: size => {
            return this.getSize(size)
          }
        }, {
          label: '已使用表空间',
          key: 'usedSpaceSize',
          formatter: size => {
            return this.getSize(size)
          }
        }, {
          label: '表空间使用率',
          key: 'usageRatio'
        }, {
          label: '空闲空间',
          key: 'freeSpace',
          formatter: size => {
            return this.getSize(size)
          }
        }, {
          label: '表空间最大块',
          key: 'maxSizeBlock',
          formatter: size => {
            return this.getSize(size)
          }
        }
      ]
    }
  },
  created () {
    this.getData();
  },
  methods: {
    getData () {
      getOracle(this.$route.query.id).then((res) => {
        this.detailData = res;
        if (this.detailData.status === 'OK') {
          this.detailData.status = '正常'
        } else if (this.detailData.status === 'timeOut') {
          this.detailData.status = '断联'
        } else {
          this.detailData.status = '异常'
        }
        this.circleData.precent = this.detailData.sgaSpaceUseRatio;
        this.circleData2.precent = this.detailData.pgaSpaceUseRatio;
        this.auditData = this.detailData.auditOperAndFreqs;
        this.userData = this.detailData.lockedOrExpiredUserInfoList;
        this.waitingData = this.detailData.lockWaitingSessions;
        this.deadlockData = this.detailData.lockedSessionList;
        this.spaceData.items = this.detailData.tableSapceInfoList;
        this.spaceSetting.data = this.spaceData;
        this.dashProgressList = this.detailData.tableSapceFsfiList;
        this.chartsData.x = this.formatCharts(
          this.detailData.processNumLine
        ).x;
        this.chartsData.y = this.formatCharts(
          this.detailData.processNumLine
        ).y;
        this.chartsData2.x = this.formatCharts(
          this.detailData.tpsLine
        ).x;
        this.chartsData2.y = this.formatCharts(
          this.detailData.tpsLine
        ).y;
        this.chartsData3.x = this.formatCharts(
          this.detailData.iopsLine
        ).x;
        this.chartsData3.y = this.formatCharts(
          this.detailData.iopsLine
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
    height: 230px;
    width: 100%;
    padding: 0px;
  }
  .tables >>> .el-table__header {
    width: calc(100% + 17px) !important;
  }
  .tables >>> .el-table__body {
    width: calc(100% + 5px) !important;
  }
  .tm {
    text-align: center;
  }
  .run_process_box {
    // 运行情况
    .detail {
      height: 332px;
    }
    .detail_info {
      // 加高行间距
      .row {
        margin-bottom: 20px;
      }
    }
  }
  .dash {
    font-size: 0;
    width: 100%;
    margin: auto;
    li {
      display: inline-block;
      width: 12.5%;
      font-size: 14px;
      margin-bottom: 20px;
    }
  }
  .session_hit_box {
    .detail {
      height: 100px;
      .info {
        margin-right: 50px;
      }
      @media screen and (max-width: 1680px) {
        .info {
          margin-right: 8px;
        }
      }
    }
  }
  .s_p_t_box {
    .detail {
      height: 300px;
      .round-box {
        .roundBar {
          top: 40%;
        }
        .usage {
          position: absolute;
          top: 75%;
        }
        .grayBox {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          width: 66%;
          height: 30px;
          line-height: 30px;
          background-color: #eeeff4;
          word-spacing: -5px;
          .one,
          .two {
            display: inline-block;
            width: 50%;
            height: 100%;
            border: 1px solid #fff;
            text-align: center;
          }
          .two {
            border-right: 0;
          }
        }
        .grayBox.pga {
          width: 60%;
          .one {
            width: 100%;
            border: none;
          }
        }
        @media screen and (max-width: 1500px) {
          .grayBox {
            width: 88%;
          }
        }
      }
      .lineChart {
        .lineChart_title {
          margin-top: -18px;
        }
      }
    }
  }
  .audit_user_box {
    .detail {
      height: 300px;
    }
  }
  .key_box {
    .key_detail {
      height: 644px;
      .tableBox {
        height: calc(50% - 36px);
        .table_title {
          color: #606060;
          margin-top: 20px;
          font-size: 16px;
        }
        .table_body {
          margin-top: 26px;
        }
      }
    }
  }
  .table_logic_box {
    .detail {
      height: 300px;
    }
  }
  .fragmentation_box {
    .detail {
      height: auto;
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
