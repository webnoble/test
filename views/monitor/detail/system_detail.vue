<template>
  <div>
    <div class="headNav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/system' }">操作系统和数据库</el-breadcrumb-item>
        <el-breadcrumb-item v-if="queryData.type==1">{{ queryData.meName }}</el-breadcrumb-item>
        <el-breadcrumb-item
          v-if="queryData.type==2"
          :to="{ path: '/system?type=2&filterName='+ queryData.filterName}"
        >{{ queryData.filterName }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="queryData.type==2">{{ queryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button @click="$router.back(-1)">返回</el-button>
    </div>
    <system v-if="reload && queryData.type == 1"></system>
    <oracle v-if="reload && queryData.type == 2 && queryData.filterName == 'Oracle'"></oracle>
    <mysql v-if="reload && queryData.type == 2 && queryData.filterName == 'Mysql'"></mysql>
    <sqlserver v-if="reload && queryData.type == 2 && queryData.filterName == 'Sqlserver'"></sqlserver>
  </div>
</template>
<script>
import system from '../../monitor_detail/database/system';
import oracle from '../../monitor_detail/database/oracle';
import mysql from '../../monitor_detail/database/mysql';
import sqlserver from '../../monitor_detail/database/sqlserver';
export default {
  components: {
    system,
    oracle,
    mysql,
    sqlserver
  },
  data () {
    return {
      queryData: '',
      reload: true,
      timeRun: ''
    };
  },
  created () {
    this.queryData = this.$route.query;
    this.timeRun = setInterval(()=>{
      this.reload = false;
      this.$nextTick(()=>{
        this.reload = true;
      })
    },300000)
    // this.$store.dispatch('monitor/system/getSysDetail', { actualId: this.$route.query.id });
  },
  destroyed() {
    clearInterval(this.timeRun)
  }
};
</script>

<style lang="scss" scoped>
</style>

