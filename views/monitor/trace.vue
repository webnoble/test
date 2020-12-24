<template>
  <div class="trace-container">
    <div class="trace-title">
      <span class="title">全栈跟踪监控</span>
    </div>
    <div class="topo-container">
      <div class="topo-bg">
        <div v-contextmenu:contextmenu class="node service" @click="$router.push({path: 'it'})"></div>
        <div v-contextmenu:contextmenu class="node virtual"></div>
        <div v-contextmenu:contextmenu class="node application"></div>
        <cmd></cmd>
      </div>
    </div>
    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item @click="config">配置信息</v-contextmenu-item>
      <v-contextmenu-item :divider="true"></v-contextmenu-item>
      <v-contextmenu-item @click="property">资产信息</v-contextmenu-item>
      <v-contextmenu-item :divider="true"></v-contextmenu-item>
      <v-contextmenu-item @click="cmd">远程命令</v-contextmenu-item>
    </v-contextmenu>
    <cmd :visible="dialogVisible" title="CMD 命令行工具" @close="close" @excute="excute"></cmd>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    config () {
      this.$router.push({ path: '/itManage' });
    },
    property () {
      window.open('http://192.168.0.209:36201/app/maintenance/templates/index.html#/assetsDetail?id=198&assetsType=%E6%9C%8D%E5%8A%A1%E5%99%A8&name=%E4%B8%80%E6%A5%BC%E6%9C%BA%E6%88%BF%E6%9C%BA%E6%9F%9C');
    },
    cmd () {
      this.dialogVisible = true;
    },
    close () {
      this.dialogVisible = false;
    },
    excute (cmd) {
      this.close();
      this.$message('功能正在开发，敬请期待')
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin scrollBar {
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #535353;
  }
  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #ededed;
  }
}
.trace-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  background-image: radial-gradient(
    #141c3d,
    #0f1730
  ); /* 标准的语法（必须放在最后） */
  @include scrollBar;
  .trace-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 64px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(17, 28, 62, 1);
    margin-left: 36px;
    .title {
      position: relative;
      font-size: 20px;
      color: #ffffff;
      padding-left: 30px;
      &::before {
        content: "";
        position: absolute;
        width: 3px;
        height: 80%;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        background-color: #ffffff;
      }
    }
  }
  .topo-container {
    position: absolute;
    width: 100%;
    height: calc(100% - 74px);
    overflow-x: auto;
    overflow-y: scroll;
    @include scrollBar;
    .topo-bg {
      position: absolute;
      width: 1666px;
      height: 1027px;
      box-sizing: border-box;
      left: 36px;
      top: 55px;
      right: 96px;
      background-image: url("../../assets/topo.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      .node {
        position: absolute;
        width: 100px;
        height: 100px;
        cursor: pointer;
        &.service {
          left: 34%;
          top: 50%;
        }
        &.virtual {
          left: 28%;
          top: 67%;
        }
        &.application {
          left: 32%;
          top: 85%;
        }
      }
    }
  }
}
</style>
