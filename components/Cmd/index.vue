<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    custom-class="addHandleWidth cmdWidth"
    @close="close"
  >
    <el-row>
      <el-input
        ref="cmdTextArea"
        v-model="textarea"
        type="textarea"
        placeholder="请输入命令"
        :autosize="{ minRows: 20, maxRows: 25}"
        show-word-limit
        autofocus
      ></el-input>
    </el-row>
    <!-- <el-row style="padding:20px 0;text-align:right;">
      <el-button type="primary" @click="excute">执行</el-button>
      <el-button type="danger" @click="close">关闭</el-button>
    </el-row>-->
  </el-dialog>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: () => {
        return 'CMD'
      }
    },
    visible: {
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },
  data () {
    return {
      textarea: '$ git status'
    }
  },
  methods: {
    close () {
      this.$emit('close');
    },
    excute () {
      this.$emit('excute', this.textarea);
    }
  }

}
</script>
<style lang="scss">
.cmdWidth {
  width: 70% !important;
  .el-dialog__body {
    padding: 0 !important;
    .el-textarea {
      background: black;
    }
    .el-textarea__inner {
      padding: 10px !important;
      background-color: #d3d3d3;
      color: #1cd81c;
      border: none;
      border-radius: 0;
    }
  }
}
</style>
