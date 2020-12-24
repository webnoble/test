<template>
  <div>
    <el-form :model="ruleForm" label-position="right" label-width="100px">
      <el-row :gutter="50">
        <el-col :span="12">
          <el-form-item label="采集网关:">
            <el-select v-model="ruleForm.gatewayId">
              <el-option
                v-for="(item,index) in gatewayIdAndName"
                :key="index"
                :label="item.text"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="接入设备:">
            <el-select v-model="ruleForm.meId" @change="chooseDevice">
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
          <el-form-item label="服务器名称:">
            <el-input v-model="ruleForm.meName" placeholder="服务器名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所在区域:">
            <el-input v-model="areaName" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所在位置:">
            <el-input v-model="ruleForm.location" placeholder="所在位置" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="服务器描述:">
            <el-input v-model="ruleForm.comments" type="textarea" placeholder="服务器信息" />
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
        meTypeGroupId: '1001',
        meName: '',
        meTypeId: '10000',
        meId: '',
        gatewayId: '',
        location: '',
        areaId: '',
        comments: ''
      }
    }
  },
  computed: {
    deviceType: function () {
      return this.$store.getters['layout/deviceType']('1001');
    },

    gatewayIdAndName: function () {
      const id = this.ruleForm.meTypeId;
      return this.$store.getters['layout/gatewayIdAndName']('10000');
    },
    allGateway: function () {
      return this.$store.getters['layout/allGateway']('1001');
    },
  
    gatewayIdAndMeIdAndName: function () {
      const gatewayId = this.ruleForm.gatewayId;
      const meTypeId = this.ruleForm.meTypeId;
      return this.$store.getters['layout/gatewayIdAndMeIdAndName']('10000', gatewayId);
    },

    area: function () {
      return this.$store.getters['layout/area'];
    },
    areaName: function () {
      const gatewayId = this.ruleForm.gatewayId;
      const area = this.$store.getters['layout/getarea'](gatewayId);
      this.ruleForm.areaId = area ? area.areaId : '';
      return area ? area.areaName : ''
    },
    serverList: function () {
      return this.$store.getters['layout/serverList'];
    }
  },
  methods: {
     chooseDevice (data) {
      this.gatewayIdAndMeIdAndName.forEach((item) => {
        if (item.value === data) {
          this.ruleForm.meName = item.text;
        }
      })
    },
    resetForm () {
      this.ruleForm = {
        meTypeGroupId: '1001',
        meName: '',
        meTypeId: '10000',
        meId: '',
        gatewayId: '',
        location: '',
        areaId: '',
        comments: ''
      }
    }
  }
}
</script>
