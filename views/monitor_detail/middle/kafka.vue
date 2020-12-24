<template>
  <div class="detail_body">
    <el-row class="detail_box run_speed_box" :gutter="20">
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
      <el-col :span="20" class="table_box">
        <div class="detail table_box">
          <div class="title">
            <span class="box_title">速率</span>
          </div>
          <div class="table">
            <el-table :data="table">
              <el-table-column prop="heading" label="统计项"></el-table-column>
              <el-table-column prop="one" label="1分钟"></el-table-column>
              <el-table-column prop="five" label="5分钟"></el-table-column>
              <el-table-column prop="fifteen" label="15分钟"></el-table-column>
              <el-table-column prop="average" label="平均速率"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="detail_box partition_box">
      <el-col :span="24">
        <div class="detail partition_detail">
          <div class="title">
            <span class="box_title">分区数</span>
          </div>
          <el-row>
            <el-col :span="4">分区数：
              <span class="blue">{{ detailData.partitionCount }}</span>
            </el-col>
            <el-col :span="4">复制分区数：
              <span class="blue">{{ detailData.replicatedPartitions }}</span>
            </el-col>
            <el-col :span="16">leader副本数：
              <span class="blue">{{ detailData.leaderCount }}</span>
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
import { getKafkaDetail } from '@/api/middleDetail';
export default {
  data () {
    return {
      runStateColor: '#27B102',
      runStopColor: '#ccc',
      detailData: null,
      table: [{
        heading: '输入消息速率',
        one: '',
        five: '',
        fifteen: '',
        average: ''
      }, {
        heading: '输入字节速率',
        one: '',
        five: '',
        fifteen: '',
        average: ''
      }, {
        heading: '输出字节速率',
        one: '',
        five: '',
        fifteen: '',
        average: ''
      }, {
        heading: '扔掉字节速率',
        one: '',
        five: '',
        fifteen: '',
        average: ''
      }, {
        heading: '失败的fetch请求率',
        one: '',
        five: '',
        fifteen: '',
        average: ''
      }, {
        heading: '失败的producer请求率',
        one: '',
        five: '',
        fifteen: '',
        average: ''
      }]
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
      getKafkaDetail(this.$route.query.cmId).then((res) => {
        this.detailData = res;
        this.table[0].one = this.detailData.msgPerOneMin + 'kb/s';
        this.table[0].five = this.detailData.msgPerFiveMin + 'kb/s';
        this.table[0].fifteen = this.detailData.msgPerFifteenMin + 'kb/s';
        this.table[0].average = this.detailData.msgPerSec + 'kb/s';
        this.table[1].one = this.detailData.inPerOneMin + 'kb/s';
        this.table[1].five = this.detailData.inPerFiveMin + 'kb/s';
        this.table[1].fifteen = this.detailData.inPerFifteenMin + 'kb/s';
        this.table[1].average = this.detailData.inPerSec + 'kb/s';
        this.table[2].one = this.detailData.outPerOneMin + 'kb/s';
        this.table[2].five = this.detailData.outPerFiveMin + 'kb/s';
        this.table[2].fifteen = this.detailData.outPerFifteenMin + 'kb/s';
        this.table[2].average = this.detailData.outPerSec + 'kb/s';
        this.table[3].one = this.detailData.rejectPerOneMin + 'kb/s';
        this.table[3].five = this.detailData.rejectPerFiveMin + 'kb/s';
        this.table[3].fifteen = this.detailData.rejectPerFifteenMin + 'kb/s';
        this.table[3].average = this.detailData.rejectPerSec + 'kb/s';
        this.table[4].one = this.detailData.fetchPerOneMin + 'kb/s';
        this.table[4].five = this.detailData.fetchPerFiveMin + 'kb/s';
        this.table[4].fifteen = this.detailData.fetchPerFifteenMin + 'kb/s';
        this.table[4].average = this.detailData.fetchPerSec + 'kb/s';
        this.table[5].one = this.detailData.producePerOneMin + 'kb/s';
        this.table[5].five = this.detailData.producePerFiveMin + 'kb/s';
        this.table[5].fifteen = this.detailData.producePerFifteenMin + 'kb/s';
        this.table[5].average = this.detailData.producePerSec + 'kb/s';
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.detail_body {
  .table {
    >>> .el-table {
      .el-table__header-wrapper {
        tr,
        th {
          color: #606060;
          background-color: #f2f4f9;
          padding: 6px 0;
        }
      }
      .el-table__body-wrapper {
        border-right: 1px solid #eeefff;
        border-left: 1px solid #eeefff;
        td {
          padding: 6px 0;
          border-bottom: 1px solid #eeefff;
          color: #606060;
        }
      }
    }
  }
  .run_speed_box {
    // 运行情况
    .detail {
      position: relative;
      height: 338px;
      font-size: 14px;
      color: #606060;
    }
  }
  .partition_box {
    .detail {
      height: 94px;
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
