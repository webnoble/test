<template>
  <div>
    <el-form :model="ruleForm" label-position="right" label-width="100px">
      <el-row :gutter="50">
        <el-col :span="12">
          <el-form-item label="防火墙名称:">
            <el-input v-model="ruleForm.name" placeholder="防火墙名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所在区域:">
            <el-select v-model="ruleForm.area">
              <el-option label="锦江监狱" value="锦江监狱"></el-option>
              <el-option label="邑州监狱" value="邑州监狱"></el-option>
              <el-option label="川西监狱" value="川西监狱"></el-option>
              <el-option label="川北监狱" value="川北监狱"></el-option>
              <el-option label="乐山监狱" value="乐山监狱"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="接入方式:">
            <el-select v-model="ruleForm.accessWay">
              <el-option label="网关接入" value="网关接入"></el-option>
              <el-option label="第三方接入" value="第三方接入"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="采集网关:">
            <el-select v-model="ruleForm.gateway">
              <el-option label="数据库采集网关" value="数据库采集网关"></el-option>
              <el-option label="浏览器采集网关" value="浏览器采集网关"></el-option>
              <el-option label="服务器采集网关" value="服务器采集网关"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="接入设备ID:">
            <el-input v-model="ruleForm.accessEquipmentId" placeholder="接入设备ID" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所在位置:">
            <el-input v-model="ruleForm.location" placeholder="所在位置" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="info">
      <span class="title">防火墙基本信息</span>
    </div>
    <el-form :model="ruleForm" label-position="right" label-width="100px">
      <el-row :gutter="50">
        <el-col :span="12">
          <el-form-item label="网络端口:">
            <el-input v-model="ruleForm.port" placeholder="网络端口" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="VPN支持:">
            <el-input v-model="ruleForm.vpn" placeholder="VPN支持" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="吞吐量:">
            <el-input v-model="ruleForm.throughput" placeholder="吞吐量" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="并发连接数:">
            <el-input v-model="ruleForm.concurrentNum" placeholder="并发连接数" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="防火墙类型:">
            <el-input v-model="ruleForm.fireType" placeholder="防火墙类型" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="控制端口:">
            <el-input v-model="ruleForm.controlPort" placeholder="控制端口" />
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
        name: '',
        gateway: '',
        accessWay: '',
        accessEquipmentId: '',
        area: '',
        location: '',
        port: '',
        vpn: '',
        throughput: '',
        concurrentNum: '',
        fireType: '',
        controlPort: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  height: 30px;
  line-height: 30px;
  margin-bottom: 20px;
  padding-left: 14px;
  font-size: 16px;
  color: #5566de;
  .title {
    display: inline-block;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .title:before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 12px;
    background-color: #5566de;
    margin-right: 6px;
  }
  .title:after {
    content: '';
    display: inline-block;
    width: calc(100% - 128px);
    height: 1px;
    background-color: rgba(204, 204, 204, 0.5);
    margin-left: 6px;
  }
}
</style>

