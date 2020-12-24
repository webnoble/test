<template>
  <div class="SystemBar">
    <el-tree
      :data="showList"
      :props="defaultProps"
      node-key="path"
      show-checkbox
      :highlight-current="true"
      :default-expanded-keys="[currentPath]"
      :default-checked-keys="[currentPath]"
      @node-click="handleNodeClick"
    >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <img
          v-if="data.data.icon&&data.data.menuType == 'directory'"
          :src="imgList[data.data.icon]"
        >
        <span
          :class="{'large':data.data.menuType == 'directory'}"
          @click="getNode(node,data)"
        >{{ data.name }}</span>
      </span>
    </el-tree>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SystemBar',
  data () {
    return {
      showList: [],
      imgList: {
        'setting': require('../../assets/icon/setting.png'),
        'warn': require('../../assets/icon/warn.png'),
        'performance': require('../../assets/icon/performance.png')
      },
      currentPath: this.$route.path,
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes'
    ])
  },
  created () {
    this.showList = this.permission_routes.find((item) => {
      return item.name === '系统设置'
    }).children
  },
  methods: {
    handleNodeClick (data) {
      if (data.data && data.data.menuType === 'url') {
        this.$router.push(data.path)
      }
    },
    getNode (node, data) {
      console.log(node, data)
    },
    setClass (item) {
      const obj = {};
      obj[item] = true;
      return obj;
    }
  }
}
</script>
<style lang="scss">
.SystemBar {
  width: 100%;
  min-height: calc(100vh - 64px);
  text-align: center;
  .el-tree {
    color: #fff;
    background-color: #242938;
    min-height: calc(100vh - 64px);
    font-size: 14px;
    .large {
      font-size: 16px;
    }
    img {
      width: 16px;
      height: 16px;
      vertical-align: middle;
    }
    .is-expanded {
      background-color: #181d2b;
    }
    .el-checkbox {
      display: none;
    }
    .el-tree-node__children .is-checked .el-tree-node__content {
      // background-image: url("../../assets/icon/tranBg.png");
      background: -webkit-linear-gradient(left, #3c4998 0%, #191e2e 100%);
      background-size: cover;
      font-size: 14px;
    }
  }
  .el-tree--highlight-current
    .el-tree-node.is-current
    > .el-tree-node__content {
    background-color: #242938;
  }
  .el-tree--highlight-current
    .el-tree-node.is-current.is-expanded
    > .el-tree-node__content {
    background-color: #181d2b;
  }
  .el-tree-node__content:hover,
  .el-tree-node:focus > .el-tree-node__content {
    background-color: #242938;
    @include themeify {
      color: themed('highLight');
    }
  }
  .el-tree-node__content {
    position: relative;
    height: 42px;
    padding: 0 10px !important;
  }
  .el-tree-node__children .el-tree-node__content {
    justify-content: center;
    &:hover {
      background: -webkit-linear-gradient(left, #3c4998 0%, #191e2e 100%);
      background-size: cover;
    }
  }
  .el-tree-node__content > .el-tree-node__expand-icon {
    position: absolute;
    right: 10px;
    font-size: 0;
    background-image: url('../../assets/icon/add.png');
    width: 10px;
    height: 10px;
    padding: 0;
  }
  .el-tree-node__expand-icon.expanded {
    background-image: url('../../assets/icon/reduce.png');
    transform: rotate(0);
  }
  .el-tree-node__expand-icon.is-leaf {
    background-image: none;
  }
}
</style>
