<template>
  <div>
    <div class="headNav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/middle' }">中间件监控列表</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/middle?type=' + queryData.type }">{{ queryData.type }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ queryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button @click="$router.back(-1)">返回</el-button>
    </div>
    <div v-if="reload">
      <Apache v-if="queryData.type == 'Apache'"></Apache>
      <Ngink v-if="queryData.type == 'Ngink'"></Ngink>
      <Flume v-if="queryData.type == 'Flume'"></Flume>
      <Redis v-if="queryData.type == 'Redis'"></Redis>
      <JVM v-if="queryData.type == 'JVM'"></JVM>
      <ActiveMQ v-if="queryData.type == 'ActiveMQ'"></ActiveMQ>
      <IIS v-if="queryData.type == 'IIS'"></IIS>
      <Flink v-if="queryData.type == 'Flink'"></Flink>
      <Kafka v-if="queryData.type == 'Kafka'"></Kafka>
    </div>
  </div>
</template>
<script>
import Apache from '../../monitor_detail/middle/apache.vue';
import Ngink from '../../monitor_detail/middle/ngink.vue';
import Flume from '../../monitor_detail/middle/flume';
import Redis from '../../monitor_detail/middle/redis';
import JVM from '../../monitor_detail/middle/jvm';
import ActiveMQ from '../../monitor_detail/middle/activeMQ';
import IIS from '../../monitor_detail/middle/iis';
import Flink from '../../monitor_detail/middle/flink';
import Kafka from '../../monitor_detail/middle/kafka';
export default {
  components: {
    Apache,
    Ngink,
    Flume,
    Redis,
    JVM,
    ActiveMQ,
    IIS,
    Flink,
    Kafka
  },
  data () {
    return {
      queryData: '',
      reload: true,
      timeRun: ''
    }
  },
  created () {
    this.queryData = this.$route.query;
    this.timeRun = setInterval(() => {
      this.reload = false;
      this.$nextTick(() => {
        this.reload = true;
      })
    }, 300000)
  },
  destroyed () {
    clearInterval(this.timeRun)
  }
}
</script>

<style lang="scss" scoped>
</style>
