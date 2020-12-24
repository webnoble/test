<template>
  <div class="monitorlist">
    <div class="header-title">
      <HeadMenu title="安防设备监控列表" />
      <ul class="colorList">
        <li>
          <span class="red"></span>异常
        </li>
        <li>
          <span class="gray"></span>维护中
        </li>
        <li>
          <span class="blue"></span>总数
        </li>
      </ul>
    </div>
    <el-row class="list" :gutter="20">
      <el-col :span="4">
        <div class="content">
          <div class="left">
            <p class="name">门禁</p>
            <p class="num">
              <span class="red">5</span>/
              <span class="gray">5</span>/
              <span class="blue">347</span>
            </p>
          </div>
          <div class="right">
            <span class="icon iconfont iconicon_Access_control-copy"></span>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="content">
          <div class="left">
            <p class="name">报警</p>
            <p class="num">
              <span class="red">5</span>/
              <span class="gray">5</span>/
              <span class="blue">347</span>
            </p>
          </div>
          <div class="right">
            <span class="icon iconfont iconicon_alarm"></span>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="content">
          <div class="left">
            <p class="name">周边电网</p>
            <p class="num">
              <span class="red">5</span>/
              <span class="gray">5</span>/
              <span class="blue">347</span>
            </p>
          </div>
          <div class="right">
            <span class="icon iconfont iconicon_power_grid"></span>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="content">
          <div class="left">
            <p class="name">广播</p>
            <p class="num">
              <span class="red">5</span>/
              <span class="gray">5</span>/
              <span class="blue">347</span>
            </p>
          </div>
          <div class="right">
            <span class="icon iconfont iconicon_radio_broadcast"></span>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="content">
          <div class="left">
            <p class="name">监听对讲</p>
            <p class="num">
              <span class="red">5</span>/
              <span class="gray">5</span>/
              <span class="blue">347</span>
            </p>
          </div>
          <div class="right">
            <span class="icon iconfont iconicon_Monitor_intercom-copy"></span>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="content">
          <div class="left">
            <p class="name">摄像头</p>
            <p class="num">
              <span class="red">5</span>/
              <span class="gray">5</span>/
              <span class="blue">347</span>
            </p>
          </div>
          <div class="right">
            <span class="icon iconfont iconicon_Webcam"></span>
          </div>
        </div>
      </el-col>
    </el-row>
    <HeadMenu
      :search="true"
      :btnarr="btnarr"
      @getValue="searchKey"
      @getEvent="judgeEvent"
    />
    <v-table :field-arr="fieldArr" :table-setting.sync="tableSetting" class="tab_body" />
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeName: 'first',
      btnarr: [{ id: '1', value: ' 管理设备', eventName: 'manageHandle', type: 'info' }],
      tableSetting: {
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
        // 避免演示报错
        // apiUrl: 'monitor/list',
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
          label: '设备名称',
          key: 'name',
          formatter: ''
        }, {
          label: '设备类型',
          key: 'type',
          formatter: '',
          filters: 'layout/deviceType'
        }, {
          label: '状态',
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
            label: '维护中',
            color: '#999999',
            className: 'iconicon_Under_maintenance',
            iconColor: '#999999'
          }],
          filters: 'layout/runState'
        }, {
          label: '所在区域',
          key: 'area',
          formatter: '',
          // filters: 'layout/area'
          filters: [
            { value: '1', text: '锦江监狱' },
            { value: '2', text: '邑州监狱' },
            { value: '3', text: '川西监狱' },
            { value: '4', text: '川北监狱' },
            { value: '5', text: '乐山监狱' }
          ]
        }, {
          label: '所在位置',
          key: 'position',
          formatter: ''
        }, {
          label: '设备描述',
          key: 'des',
          formatter: ''
        }, {
          label: '操作',
          key: 'operation',
          width: '200',
          buttons: [{
            label: '查看详情',
            type: 'url',
            path: '/monitor_detail',
            query: ['id', 'sysName']
          }]
        }
      ]
    }
  },

  methods: {
    handleClick () { },
    searchKey (val) {
      console.log(val);
    },
    judgeEvent (val) {
      if (val === 'manageHandle') {
        this.$router.push('/safety')
      }
    },
    edit (data) {
      console.log(data)
    },
    filterTab (val) {
      this.filterName = val;
    }
  }
}
</script>
<style lang="scss">
.monitorlist {
  .header-title {
    overflow: hidden;
    height: 36px;
    line-height: 36px;
    margin-bottom: 10px;
    .head-menu {
      display: inline-block;
      height: 36px;
    }
  }
  .colorList {
    float: right;
    font-size: 14px;
    li {
      display: inline-block;
      margin-right: 20px;
      span {
        display: inline-block;
        width: 16px;
        height: 8px;
        vertical-align: middle;
        background-color: #ff0000;
        margin-right: 6px;
        &.gray {
          background-color: #999999;
        }
        &.blue {
          background-color: #5466e0;
        }
      }
    }
  }
  .list {
    padding-bottom: 20px;
    .content {
      padding: 10px;
      width: 100%;
      color: #545454;
      font-size: 0;
      background: #fff;
      .left {
        display: inline-block;
        width: 70%;
        vertical-align: middle;
      }
      .right {
        display: inline-block;
        width: 30%;
        vertical-align: middle;
        text-align: center;
      }
      .icon {
        font-size: 38px;
        color: #cccccc;
      }
      .name {
        margin-bottom: 20px;
        font-size: 16px;
      }
      .num {
        font-size: 20px;
        .red {
          color: #ff0000;
          font-size: 24px;
        }
        .gray {
          color: #999999;
        }
        .blue {
          color: #5466e0;
        }
      }
    }
  }
}
</style>
