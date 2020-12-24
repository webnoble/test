<template>
  <div>
    <el-form :model="ruleForm" label-position="right" label-width="100px">
      <el-row class="inlineSelect" :gutter="50">
        <el-col :span="12">
          <el-form-item label="规则名称:">
            <el-input v-model="ruleForm.ruleName" placeholder="规则名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备类型分组:">
            <el-select v-model="ruleForm.meTypeGroupId" multiple collapse-tags>
              <el-option
                v-for="(item,index) in meGroupAndName"
                :key="index"
                :label="item.text"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备类型:">
            <el-select v-model="ruleForm.meTypeIds" collapse-tags multiple>
              <el-option
                v-for="(item,index) in deviceType"
                :key="index"
                :label="item.text"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备名称:">
            <el-select v-model="ruleForm.meIds" collapse-tags multiple>
              <el-option
                v-for="(item,index) in gatewayIdAndMeIdAndName"
                :key="index"
                :label="item.text"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="告警级别:">
            <el-select v-model="ruleForm.levelIds" collapse-tags multiple>
              <el-option
                v-for="(item,index) in alarmLevelAndName"
                :key="index"
                :label="item.text"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="邮箱地址:">
            <el-input v-model="ruleForm.mailAddress" type="textarea" placeholder="规则描述" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="运行规则:">
            <el-switch v-model="isStartBool"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        num: '',
        ruleName: '',
        meTypeGroupId: [],
        meTypeIds: [],
        meIds: [],
        levelIds: [],
        ruleComment: '',
        runstate: '',
        isStart: 1,
        ruleType: 1
      },
      isStartBool: true
    }
  },
  computed: {
    deviceType: function () {
      let arr = [];
      if(this.ruleForm.meTypeGroupId){
        this.ruleForm.meTypeGroupId.forEach((item) => {
          arr = arr.concat(this.$store.getters['layout/deviceType'](item))
        })
      }
      console.log(arr)
      return arr;
    },
    alarmLevelAndName: function () {
      return this.$store.getters['layout/alarmLevelAndName']
    },
    meGroupAndName: function () {
      return this.$store.getters['layout/meGroupAndName']
    },
    allGatewayIdAndName: function () {
      return this.$store.getters['layout/allGatewayIdAndName']
    },
    gatewayIdAndMeIdAndName: function () {
      let arr = [];
      if(this.ruleForm.meTypeIds){
        this.ruleForm.meTypeIds.forEach((meTypeId) => {
        this.allGatewayIdAndName.forEach((item) => {
            arr = arr.concat(this.$store.getters['layout/gatewayIdAndMeIdAndName'](meTypeId, item.value))
          })
        })
      }
      
      return arr;
    }
  },
  methods: {
    resetForm: function () {
      this.ruleForm = {
        num: '',
        ruleName: '',
        meTypeGroupId: [],
        meTypeIds: [],
        meIds: [],
        levelIds: [],
        mailAddress: '',
        runstate: '',
        isStart: 1,
        ruleType: 1
      }
      this.isStartBool = true;
    },
  },
}
</script>
