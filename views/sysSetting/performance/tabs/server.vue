<template>
  <div class="server">
    <el-row class="header">
      <el-col :span="5" :offset="5">上限值</el-col>
      <el-col :span="4">下限值</el-col>
      <el-col :span="5">
        设置越限时长
        <span style="color:#f00;font-size:14px;display:inline-block">(越限时长必须是采集数值周期的倍数)</span>
      </el-col>
      <el-col :span="5">越限时长</el-col>
    </el-row>
    <el-row v-for="item in serverData" :key="item.id" class="line" type="flex" justify="center" align="middle">
      <el-col :span="5">{{ item.ruleName }}</el-col>
      <el-col :span="5">
        <el-input v-model="item.thresholdMax" :disabled="disabledStatus" />
      </el-col>
      <el-col :span="4">
        <el-input v-model="item.thresholdMin" :disabled="disabledStatus" />
      </el-col>
      <el-col :span="5">
        <el-input v-model="item.multiple" :disabled="disabledStatus" class="mini" />
        <span>× {{ item.collectionPeriod }} (采集周期）</span>
      </el-col>
      <el-col :span="5">{{ item.durationTime }}min</el-col>
    </el-row>
    <!-- <el-row class="line" type="flex" justify="center" align="middle">
      <el-col :span="5">硬盘使用率(%)</el-col>
      <el-col :span="5">
        <el-input v-model="input" />
      </el-col>
      <el-col :span="4">
        <el-input />
      </el-col>
      <el-col :span="5">
        <el-input class="mini" />
        <span>× 1d (采集周期）</span>
      </el-col>
      <el-col :span="5">80min</el-col>
    </el-row>
    <el-row class="line" type="flex" justify="center" align="middle">
      <el-col :span="5">内存使用率(%)</el-col>
      <el-col :span="5">
        <el-input v-model="input" />
      </el-col>
      <el-col :span="4">
        <el-input />
      </el-col>
      <el-col :span="5">
        <el-input class="mini" />
        <span>× 1d (采集周期）</span>
      </el-col>
      <el-col :span="5">80min</el-col>
    </el-row>
    <el-row class="line" type="flex" justify="center" align="middle">
      <el-col :span="5">CPU温度（℃）</el-col>
      <el-col :span="5">
        <el-input v-model="input" />
      </el-col>
      <el-col :span="4">
        <el-input />
      </el-col>
      <el-col :span="5">
        <el-input class="mini" />
        <span>× 1h (采集周期）</span>
      </el-col>
      <el-col :span="5">80min</el-col>
    </el-row>
    <el-row class="line" type="flex" justify="center" align="middle">
      <el-col :span="5">CPU负载（%）</el-col>
      <el-col :span="5">
        <el-input v-model="input" />
      </el-col>
      <el-col :span="4">
        <el-input />
      </el-col>
      <el-col :span="5">
        <el-input class="mini" />
        <span>× 1h (采集周期）</span>
      </el-col>
      <el-col :span="5">80min</el-col>
    </el-row> -->
  </div>
</template>

<script>
export default {
  name: 'Server',
  props: {
    tableData: {
      type: Array,
      default: function () {
        return []
      }
    },
    disabledStatus: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      serverData: []
    }
  },
  watch: {
    tableData (val) {
      // console.log(val);
      this.serverData = val
    }
  },
  mounted () {
    // this.serverData = this.tableData;
    // console.log(this.serverData);
  }
}
</script>

<style lang="scss" scoped>
.server {
  text-align: center;
  color: #595959;
  font-size: 14px;
  .header {
    height: 63px;
    background: #e8ebf3;
    color: #25243e;
    font-size: 15px;
    line-height: initial;
    display: flex;
    align-items: center;
  }
  .line {
    border-bottom: 1px solid #e8ebf3;
    padding: 10px 0;
    .el-input {
      width: 70%;
      height: 36px;
      border: 1px solid rgba(236, 236, 238, 1);
      border-radius: 3px;
      color: #595959;
      font-size: 14px;
      input {
        text-align: center;
      }
      &.mini {
        width: 30%;
        input {
          text-align: right;
        }
      }
    }
  }
}
</style>
