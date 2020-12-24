<!--
 * @Author: your name
 * @Date: 2020-05-28 19:25:33
 * @LastEditTime: 2020-05-28 20:16:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \monitor\src\views\monitor\detail\monitor_detail.vue
-->
<template>
  <div class="monitor_detail">
    <div class="headNav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/monitor' }">安防设备</el-breadcrumb-item>
        <el-breadcrumb-item>windows</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button @click="$router.back(-1)">返回</el-button>
    </div>
    <div class="detail_body">
      <el-row class="detail_box basic_calendar_box">
        <el-col :span="12">
          <div class="detail run_detail">
            <div class="title">
              <span class="box_title">基本信息</span>
            </div>
            <div>
              <div class="row row_one">
                <span class="col_one">设备名称：
                  <span class="black">大门门禁</span>
                </span>
              </div>
              <div class="row row_two">
                <span class="col_one">
                  运行状态：
                  <i class="small_round" :style="{backgroundColor: runStateColor}"></i>
                  <span class="black">正常</span>
                </span>
              </div>
            </div>
            <div class="iconfont iconicon_cog"></div>
          </div>
          <div class="detail desInfo_detail" style="margin-top:20px">
            <div class="title">
              <span class="box_title">描述信息</span>
            </div>
            <div>
              <div class="row row_one">
                <span class="col_one">所在区域 :
                  <span class="black">锦江监狱</span>
                </span>
              </div>
              <div class="row row_two">
                <span class="col_one">所在位置 :
                  <span class="black">一楼西门</span>
                </span>
              </div>
              <div class="row row_three">
                <span class="col_one">其他信息 :
                  <span class="black">大门门禁信息|orem</span>
                </span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="detail calendar_detail">
            <div class="title">
              <span class="box_title">运行状态</span>
            </div>
            <div class="calendar-container">
              <calendar></calendar>
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
      breadcrumbValue: '',
      runStateColor: '#27B102',
      runStopColor: '#ccc'
    }
  }
}
</script>
<style lang="scss">
.detail_body {
  .basic_calendar_box {
    .run_detail {
      height: 170px;
      .row {
        margin-bottom: 20px;
      }
    }
    .desInfo_detail {
      height: 280px;
      .row {
        margin-bottom: 20px;
      }
    }
    .calendar_detail {
      height: 470px;
      margin-left: 20px;
    }
  }
}
</style>
