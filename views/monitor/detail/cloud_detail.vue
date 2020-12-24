<!--
 * @Author: your name
 * @Date: 2020-05-29 10:00:05
 * @LastEditTime: 2020-05-29 10:33:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \monitor\src\views\monitor\detail\soft_detail.vue
-->
<template>
  <div class="cloud_detail">
    <div class="headNav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/cloud' }">云平台监控列表</el-breadcrumb-item>
        <el-breadcrumb-item>云平台</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button @click="$router.back(-1)">返回</el-button>
    </div>
    <div class="detail_body">
      <el-row class="detail_box run_process_box">
        <el-col :span="5">
          <div class="detail run_detail" style="margin-right: 22px;">
            <div class="title">
              <span class="box_title">运行情况</span>
            </div>
            <div>
              <div class="row row_one">
                <span>运行时长 : <span class="black">3h</span> </span>
              </div>
              <div class="row row_two">
                <span>
                  运行状态：
                  <i class="small_round" :style="{backgroundColor: runStateColor}"></i><span class="black">正常</span>
                </span>
              </div>
            </div>
            <div class="iconfont iconicon_cog"></div>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="detail process_detail">
            <div class="title">
              <span class="box_title">流程</span>
            </div>
            <div>
              <div class="row">
                <span>流程总数 : <span class="black">3h</span> </span>
              </div>
              <div class="row">
                <span>当前审批流程 : <span class="black">正常</span> </span>
              </div>
              <div class="row">
                <span>已完成流程 : <span class="black">正常</span> </span>
              </div>
              <div class="row">
                <span>已拒绝流程 : <span class="black">正常</span> </span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="detail">
            <dynamic-table :field-arr="fieldArr" :getters="getters" :height="212" class="tables" />
          </div>
        </el-col>
      </el-row>
      <el-row class="detail_box system_box">
        <el-col>
          <div class="detail run_detail" style="height:auto">
            <div class="title">
              <span class="box_title">系统</span>
              <div class="tips">
                <p>今日请求耗时详情（注：默认时间排序，点击切换耗时排序）</p>
                <div class="buttons">
                  <span>时间排序</span>
                  <span>耗时排序</span>
                </div>
              </div>
            </div>
            <div class="sysTable">
              <v-table :field-arr="cloudArr" :table-setting.sync="cloudSetting" @edit="edit" />
            </div>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="nums">
                  每分钟请求个数:
                  <strong>344</strong>
                </div>
                <echarts-line style="height:240px" :charts-data="chartsData"></echarts-line>
              </el-col>
              <el-col :span="12">
                <div class="nums">
                  今日异常:
                  <strong>344</strong>
                </div>
                <dynamic-table :field-arr="abnormalArr" :getters="getters" :height="220" class="tables" />
              </el-col>
            </el-row>
            <!-- <div class="title">
              <span class="box_title">流程</span>
            </div>-->
          </div>
        </el-col>
      </el-row>
      <el-row class="detail_box describe_box">
        <el-col :span="24">
          <div class="detail describe_detail">
            <div class="title">
              <span class="box_title">基本信息</span>
            </div>
            <div class="information">
              <el-row>
                <el-col :span="6">
                  应用软件名称：
                  <span class="black">省局刑罚执行</span>
                </el-col>
                <el-col :span="18">
                  所在区域：
                  <span class="black">锦江监狱</span>
                </el-col>
                <el-col :span="6">
                  版本号：
                  <span class="black">v1.1</span>
                </el-col>
                <el-col :span="18">
                  所在服务器：
                  <span class="black">省局服务器</span>
                </el-col>
                <el-col :span="24" class="last_info">
                  <span class="title">应用软件描述：</span>
                  <span
                    class="black content"
                  >相较于普通的IDC机房以及服务器厂商，云服务器具有高可用性的特点，阿里云使用更严格的IDC标准、服务器准入标准以及运维标准，保证云计算基础框架的高可用性、数据的可靠性以及云服务器的高可用性。方便快捷</span>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      listQuery: {
        total: 36,
        page: 1,
        limit: 10
      },
      chartsData: {
        x: ['11:10', '11:20', '11:30', '11:40', '11:50', '12:00', '12:10', '12:20', '12:30', '12:40', '12:50', '13:00'],
        y: [1200, 1300, 1100, 1800, 1500, 1060, 1870, 2000, 2300, 1000, 1130, 1080, 2100],
        // markLine: { yAxis: 2000, name: 'test' },
        style: 'green'
      },
      runStateColor: '#27B102',
      runStopColor: '#ccc',
      getters: 'monitor/soft/flowList',
      cloudSetting: {
        pagination: {
          show: true,
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
        apiUrl: '/cloud/list',
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
          label: '流程名称',
          key: 'name',
          width: '180'
        }, {
          label: '流程状态',
          key: 'state',
          filters: [{ text: '进行中', value: '进行中' }, { text: '已完结', value: '已完结' }, { text: '已拒绝', value: '已拒绝' }]

        }, {
          label: '发起时间',
          key: 'time',
          width: '180'
        }, {
          label: '耗时',
          key: 'payTime'
        }
      ],
      abnormalArr: [
        {
          label: '异常类型',
          key: 'name',
          formatter: ''
        }, {
          label: '异常发生时间',
          key: 'time',
          formatter: ''
        }
      ]
    }
  },
  computed: {
    cloudArr: function () {
      return [
        {
          label: '序号',
          key: 'id',
          formatter: ''
        }, {
          label: '主机信息',
          key: 'name',
          width: '200'
        }, {
          label: '所在区域',
          key: 'area',
          filters: [{ value: '1', text: '锦江监狱' }, { value: '2', text: '邑州监狱' }, { value: '3', text: '川西监狱' }, { value: '4', text: '川北监狱' }, { value: '5', text: '乐山监狱' }]
        }, {
          label: '运行状态',
          key: 'state',
          formatter: [{
            key: 1,
            label: '正常',
            color: '#15B000',
            className: 'iconicon_successfully',
            iconColor: '#15B000'
          }, {
            key: 2,
            label: '异常',
            color: '#f00',
            className: 'iconicon_error-triangle',
            iconColor: '#f00'
          }, {
            key: 3,
            label: '断连',
            color: '#999999',
            className: 'iconicon_power_failure',
            iconColor: '#999999'
          }],
          filters: [{ text: '正常', value: '1' }, { text: '异常', value: '2' }, { text: '断连', value: '3' }]
        }, {
          label: '虚拟机',
          key: 'vma'
        }, {
          label: '磁盘',
          key: 'diskUsed',
          formatter: '(diskUsed)G/(allDisk)TB'
        }, {
          label: '内存',
          key: 'momeryUsed',
          formatter: '(momeryUsed)G/(allMomery)TB'
        }, {
          label: '网卡流量',
          key: 'flow',
          formatter: '(flow)kb/s'
        }, {
          label: '操作',
          key: 'operation',
          needTemp: true,
          width: '230',
          buttons: [{
            label: '查看详情',
            type: 'url',
            path: '/cloud_detail',
            query: ['id', 'name'],
            colorType: 'tableBlue'
          }]
        }
      ]
    }
  },
  methods: {
    edit (val) {
      console.log(val);
    }
  }
}
</script>
<style lang="scss" scoped >
.cloud_detail {
  .tables {
    background-color: #ffffff;
    height: 212px;
    width: 100%;
    padding: 0px;
    overflow: auto;
  }
  .tables >>> .el-table__header {
    width: calc(100% + 17px) !important;
  }
  .tables >>> .el-table__body {
    width: calc(100% + 5px) !important;
  }
  .tips {
    font-size: 14px;
    color: #000;
    overflow: hidden;
    p {
      display: inline-block;
    }
    .buttons {
      float: right;
      span {
        display: inline-block;
        padding: 5px 10px;
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.14);
      }
    }
  }
  .nums {
    font-size: 16px;
    color: #000;
    margin-bottom: 10px;
    strong {
      font-weight: bold;
    }
  }
  .sysTable {
    margin-top: 40px;
  }
  .run_process_box {
    .detail {
      height: 240px;
    }
    .process_detail {
      .row {
        margin-bottom: 20px;
      }
    }
  }
  .system_box {
    .tables {
      height: 240px;
    }
  }
  .describe_box {
    .detail {
      height: 229px;
      .last_info {
        .content {
          width: calc(100% - 104px);
        }
      }
    }
  }
}
</style>
