<template>
  <div class="interchanger">
    <el-row class="header" type="flex" align="middle">
      <el-col :span="21" :offset="3">
        <el-row class="header" type="flex" align="middle">
          <el-col :span="5" :offset="4">上限值</el-col>
          <el-col :span="5">下限值</el-col>
          <el-col :span="6">
            设置越限时长
            <span style="color:#f00;font-size:14px;display:inline-block">(越限时长必须是采集数值周期的倍数)</span>
          </el-col>
          <el-col :span="4">越限时长</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row v-for="item in switchData" :key="item.id" class="line" type="flex" justify="center" align="middle">
      <el-col :span="5">{{ item.ruleName }}</el-col>
      <el-col :span="5">
        <el-input v-model="item.thresholdMax" :disabled="disabledStatus" />
      </el-col>
      <el-col :span="4">
        <el-input v-model="item.thresholdMin" :disabled="disabledStatus"/>
      </el-col>
      <el-col :span="5">
        <el-input v-model="item.multiple" class="mini" :disabled="disabledStatus" />
        <span>× {{ item.collectionPeriod }} (采集周期）</span>
      </el-col>
      <el-col :span="5">{{ item.durationTime }}min</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
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
      switchData: []
    }
  },
  watch: {
    tableData (val) {
      this.switchData = val;
    }
  },
  mounted () {
    // this.switchData = this.tableData;
    // console.log(this.switchData);
  }
}
</script>

<style lang="scss" scoped>
.interchanger {
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
// .interchanger {
//   color: #595959;
//   font-size: 14px;
//   text-align: center;
//   border: 1px solid #e8ebf3;
//   .header {
//     height: 63px;
//     background: #e8ebf3;
//     color: #25243e;
//     font-size: 15px;
//     line-height: initial;
//     display: flex;
//     align-items: center;
//   }
//   .box-left {
//     border-left: 1px solid #e8ebf3;
//   }
//   .line {
//     border-top: 1px solid #e8ebf3;
//     padding: 10px 0;
//     .el-input {
//       width: 70%;
//       height: 32px;
//       border: 1px solid #e8ebf3;
//       border-radius: 3px;
//       color: #595959;
//       font-size: 14px;
//       input {
//         text-align: center;
//       }
//       &.mini {
//         width: 30%;
//         input {
//           text-align: right;
//         }
//       }
//     }
//   }
// }
</style>
