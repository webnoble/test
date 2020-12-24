<template>
  <topo-dialog
    ref="setDialog"
    :title="'关联设备状态'"
    :handle-text="'绑定'"
    @handle="handle"
    @rightClick="rightClick"
  >
    <div class="topo-dialog-content-relevance">
      <el-form ref="form" :model="form" label-width="90px" style="width:100%;">
        <el-form-item label="关联设备 :" class="relevance-device">
          <el-select v-model="form.deviceId" placeholder="请选择关联的设备" clearable style="display:block">
            <el-option
              v-for="(item, index) in deviceList"
              :key="index"
              :label="item.meName"
              :value="item.meId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </topo-dialog>
</template>
<script>
import TopoDialog from './index.vue';
import { getDeviceList } from '@/api/device';

export default {
  name: 'SettingDialog',
  components: {
    TopoDialog
  },
  props: {
  },
  data () {
    return {
      deviceList: [
      ],
      form: {
        deviceId: null
      },
      eventObj: null
    }
  },
  methods: {
    rightClick (e) {
      this.eventObj = e;
      const item = e.item;
      const model = item.getModel();
      if (model.itemType === 'node') {
        this.$refs['setDialog'].open(e);
        const areaId = this.$parent.$parent.globeParam.areaId;
        getDeviceList({
          rows: 999999,
          page: 1,
          filters: {
            'groupOp': 'AND',
            'rules': [
              { 'field': 'areaId', 'op': 'eq', 'data': areaId },
              { 'field': 'meTypeId', 'op': 'eq', 'data': model.imageTypeId }
            ]
          }
        }).then((data) => {
          this.deviceList = data.items;
        });
        this.form.deviceId = item._cfg.model.meId;
      }
    },
    handle () {
      const item = this.eventObj.item;
      if (this.form.deviceId) {
        const device = {
          deviceName: '',
          deviceId: this.form.deviceId
        };
        for (let i = 0, len = this.deviceList.length; i < len; i++) {
          if (device.deviceId === this.deviceList[i].meId) {
            device.deviceName = this.deviceList[i].meName;
            break;
          }
        }
        this.$emit('handle', {
          item,
          device
        });
        this.$refs['setDialog'].close();
        return;
      } else {
        this.$message('请选择要关联的设备');
      }
      this.$nextTick(() => {
        this.eventObj = null;
      });
    }
  }
}
</script>
<style lang="scss">
.topo-dialog-content-relevance {
  padding: 26px 37px;
  padding-bottom: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .relevance-device {
    .el-form-item__label {
      font-size: 16px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1) !important;
    }
    .el-select-dropdown__item {
      padding: 0px 20px;
    }
  }
}
</style>
