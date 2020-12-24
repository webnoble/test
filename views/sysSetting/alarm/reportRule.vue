<template>
  <div class="body-content">
    <HeadMenu title="告警规则设置" :btnarr="btnarr" @getEvent="addReportRule" />
    <el-tabs v-model="changeTypeName" type="card" class="tab_body" @tab-click="handleClick">
      <el-tab-pane label="告警过滤" name="1">
        <rule-table1 ref="ruleTable1" @edit="editRuleTable" />
      </el-tab-pane>
      <el-tab-pane label="告警邮件转发" name="2">
        <rule-table2 ref="ruleTable2" @edit="editRuleTable" />
      </el-tab-pane>
      <el-tab-pane label="级别重定义" name="3">
        <rule-table3 ref="ruleTable3" @edit="editRuleTable" />
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      :title="isEdit?'编辑告警规则':'添加告警规则'"
      :visible.sync="dialogVisible"
      custom-class="addHandleWidth"
      width="50%"
      :before-close="resetForm"
    >
      <el-form label-position="right" label-width="100px">
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="规则类别:">
              <el-select v-model="changeTypeName" @change="changeType">
                <el-option label="告警过滤规则" value="1"></el-option>
                <el-option label="告警邮件转发规则" value="2"></el-option>
                <el-option label="告警级别重定义规则" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <addTable1 v-if="changeTypeName === '1'" ref="addTable1" />
        <addTable2 v-if="changeTypeName === '2'" ref="addTable2" />
        <addTable3 v-if="changeTypeName === '3'" ref="addTable3" />
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="resetForm">关 闭</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ruleTable1 from './ruleTable1';
import ruleTable2 from './ruleTable2';
import ruleTable3 from './ruleTable3';
import addTable1 from './addTable1';
import addTable2 from './addTable2';
import addTable3 from './addTable3';
export default {
  components: {
    ruleTable1,
    ruleTable2,
    ruleTable3,
    addTable1,
    addTable2,
    addTable3
  },
  data () {
    return {
      activeName: 'first',
      isEdit: false,
      btnarr: [{ id: '1', value: '新增', eventName: 'addHandle', type: 'primary' }],
      dialogVisible: false,
      // ruleForm: {
      //   ruleType: '',
      //   num: '',
      //   name: '',
      //   source: '',
      //   type: '',
      //   level: '',
      //   des: '',
      //   runstate: ''
      // },
      changeTypeName: '1'
    }
  },
  created () {
  },
  computed: {
    AllMeIdAndModel: function () {
      return this.$store.getters['layout/AllMeIdAndModel']
    },
  },
  methods: {
    addReportRule (val) {
      this.dialogVisible = true;
      // if (this.activeName === 'first') {
      //   this.$refs.ruleTable1.add();
      // } else if (this.activeName === 'second') {
      //   this.$refs.ruleTable2.add();
      // } else if (this.activeName === 'three') {
      //   this.$refs.ruleTable3.add();
      // }
    },
    onSubmit () {
      let addtable, ruleTable;
      if (this.changeTypeName === '1') {
        addtable = this.$refs.addTable1;
        ruleTable = this.$refs.ruleTable1;
      }
      if (this.changeTypeName === '2') {
        addtable = this.$refs.addTable2;
        ruleTable = this.$refs.ruleTable2;
      }
      if (this.changeTypeName === '3') {
        addtable = this.$refs.addTable3;
        ruleTable = this.$refs.ruleTable3;
      }
      addtable.ruleForm.isStart = addtable.isStartBool ? 1 : 0;
      // addtable.ruleForm.meModel = [];
      // addtable.ruleForm.meIds.forEach((item)=>{
      //   addtable.ruleForm.meModel.push(AllMeIdAndModel[item])
      // })
      if (addtable.ruleForm.id) {
        ruleTable.update(addtable.ruleForm).then(() => {
          this.dialogVisible = false;
          this.isEdit = false;
          addtable.resetForm()
        })
      } else {
        // console.log(addtable);
        ruleTable.add(addtable.ruleForm).then(() => {
          this.dialogVisible = false;
          addtable.resetForm()
        })
      }
    },
    editRuleTable (data) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.$nextTick(() => {
        let addtable, ruleTable;
        if (this.changeTypeName === '1') {
          addtable = this.$refs.addTable1;
          ruleTable = this.$refs.ruleTable1;
        }
        if (this.changeTypeName === '2') {
          addtable = this.$refs.addTable2;
          ruleTable = this.$refs.ruleTable2;
        }
        if (this.changeTypeName === '3') {
          addtable = this.$refs.addTable3;
          ruleTable = this.$refs.ruleTable3;
        }
        // console.log(addtable)
        // console.log(data);
        if(data.meTypeGroupIds){
          data.meTypeGroupIds.forEach((item, index) => {
            data.meTypeGroupIds[index] = item.toString();
          })
        }
        if(data.meTypeGroupId){
          data.meTypeGroupId.forEach((item, index) => {
            data.meTypeGroupId[index] = item.toString();
          })
        }
        if(data.meTypeIds){
          data.meTypeIds.forEach((item, index) => {
            data.meTypeIds[index] = parseInt(item);
          })
        }
        addtable.ruleForm = JSON.parse(JSON.stringify(data));
      })
    },
    resetForm () {
      let addtable, ruleTable;
      if (this.changeTypeName === '1') {
        addtable = this.$refs.addTable1;
        ruleTable = this.$refs.ruleTable1;
      }
      if (this.changeTypeName === '2') {
        addtable = this.$refs.addTable2;
        ruleTable = this.$refs.ruleTable2;
      }
      if (this.changeTypeName === '3') {
        addtable = this.$refs.addTable3;
        ruleTable = this.$refs.ruleTable3;
      }
      addtable.resetForm();
      // console.log(addtable.resetForm());
      this.dialogVisible = false;
      this.isEdit = false;
    },
    changeType (val) {
      this.changeTypeName = val;
    },
    handleClick () { }
  }
}
</script>

<style lang="scss" scoped>
.tab_body {
  padding: 17px 12px;
  background-color: #fff;
}
</style>
