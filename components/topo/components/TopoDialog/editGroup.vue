<template>
  <topo-dialog
    ref="setDialog"
    :title="'修改分组名称'"
    :handle-text="'确定'"
    @handle="handle"
    @rightClick="rightClick"
  >
    <div class="topo-dialog-content-relevance">
      <el-form
        ref="form"
        :model="form"
        label-width="90px"
        style="width:100%;"
        @submit.native.prevent
      >
        <el-form-item prop="groupName" label="分组名称:" class="relevance-device">
          <el-input v-model="form.groupName" @change="saveGroupName"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </topo-dialog>
</template>
<script>
import TopoDialog from './index.vue';

export default {
  name: 'EditGroupDialog',
  components: {
    TopoDialog
  },
  data () {
    return {
      form: {
        groupName: null,
        eventObj: null
      }
    }
  },
  methods: {
    saveGroupName (e) {
      this.handle();
    },
    rightClick (e) {
      this.eventObj = e;
      const item = e.item;
      const model = item.getModel();
      if (model.type.toLowerCase().indexOf('combo') > -1 || model.itemType === 'combo') {
        this.form.groupName = model.label;
        this.$refs['setDialog'].open(e);
      }
    },
    handle () {
      const item = this.eventObj.item;
      if (this.form.groupName) {
        this.$emit('handle', {
          item,
          groupName: this.form.groupName
        });
        this.$refs['setDialog'].close();
        return;
      } else {
        this.$message('请输入分组名称');
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
