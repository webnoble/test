<template>
  <topo-dialog
    ref="warningDialog"
    :title="'异常说明'"
    :handle-text="'立即处理'"
    @handle="handle"
    @rightClick="rightClick"
  >
    <table class="content" width="500">
      <tr>
        <td class="label" width="120">告警源：</td>
        <td class="value danger" width="125" :title="source">{{ source }}</td>
        <td class="label" width="120">告警级别：</td>
        <td class="value danger" width="125" :title="emergencyLevel">{{ emergencyLevel }}</td>
      </tr>
      <tr>
        <td class="label">告警描述：</td>
        <td colspan="3" class="value description" :title="description">{{ description }}</td>
      </tr>
    </table>
  </topo-dialog>
</template>
<script>
import TopoDialog from './index.vue';
const emergency = ['无', '提示', '一般', '严重', '致命'];

export default {
  name: 'WarningDialog',
  components: {
    TopoDialog
  },
  props: {
    title: {
      type: String,
      default: () => {
        return '设备信息';
      }
    }
  },
  data () {
    return {
      source: '无',
      emergencyLevel: '无',
      description: '无',
      eventObj: null
    }
  },
  methods: {
    rightClick (e) {
      this.eventObj = e;
      const item = e.item;
      const model = item.getModel();
      if (model.itemType === 'node') {
        this.source = model.warning ? model.warning.source : '无';
        this.description = model.warning ? model.warning.description : '无';
        this.emergencyLevel = emergency[model.warning ? model.warning.level : 0];
        // 没有告警则不显示处理按钮
        if (!model.warning) {
          this.$refs['warningDialog'].hideDealBtn();
        } else {
          this.$refs['warningDialog'].showDealBtn();
        }
        this.$refs['warningDialog'].open(e);
      }
    },
    handle () {
      const item = this.eventObj.item;
      const model = item.getModel();
      this.$emit('handle', model.warning);
      this.$refs['warningDialog'].close();
      this.$nextTick(() => {
        this.eventObj = null;
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  $line-height: 43px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 800;
  color: rgba(153, 153, 153, 1);
  line-height: $line-height;
  width: 100%;
  tr {
    min-height: $line-height;
    td {
      display: inline-block;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      word-break: keep-all;
    }
    .label {
      width: 120px;
      text-align: right;
    }
    .value {
      &.description {
        color: rgba(102, 102, 102, 1);
      }
      &.danger {
        color: #ff0000;
      }
    }
  }
}
</style>
