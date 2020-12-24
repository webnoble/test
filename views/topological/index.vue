<template>
  <div class="topological-container">
    <div class="topo-menu">
      <div class="search-container">
        <el-input
          v-model="serachinputName"
          class="filter-item"
          placeholder="请输入关键字"
          @keyup.enter.native="handleSerchKey"
        >
          <i
            slot="suffix"
            class="el-input__icon el-icon-search"
            style="cursor : pointer;"
            @click="handleSerchKey"
          />
        </el-input>
      </div>
      <tree-menu :menu="menu" @click="handleNodeClick" @rightClick="handleContextmenuClick" />
    </div>
    <div class="right-panel">
      <div v-if="selectTopo" class="title-container">
        <span class="title">{{ selectTopo.topoName || selectTopo.topoTypeName || "查询中" }}</span>
        <el-button type="primary" class="edit-top" @click="editTopo">修改配置</el-button>
      </div>
      <G6Editor
        v-if="selectTopo"
        ref="g6editor"
        :mode="'view'"
        :data="topo"
        :name="selectTopo.topoName"
        :image-types="imageTypes"
        @deal="deal"
        @topoloaded="topoLoaded"
      />
    </div>
    <el-dialog title="创建拓扑图" :visible.sync="dialogFormVisible" width="37%">
      <el-form ref="createTopo" :model="form" :rules="rules" label-width="120px">
        <el-form-item v-if="false" label="编号" placeholder="拓扑图编号">
          <el-input v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="拓扑图名称：" prop="topoName" placeholder="请输入拓扑图名称">
          <el-input v-model="form.topoName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="区域：" prop="areaId">
          <el-select v-model="form.areaId" placeholder="请选择区域" style="display:block;">
            <el-option
              v-for="(item, index) in area"
              :key="index"
              :value="item.value"
              :label="item.text"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTopo">确 定</el-button>
      </div>
    </el-dialog>
    <v-contextmenu ref="contextmenuAdd">
      <v-contextmenu-item @click="dialogFormVisible = true">添加拓扑图</v-contextmenu-item>
    </v-contextmenu>
    <v-contextmenu ref="contextmenuDelete">
      <v-contextmenu-item @click="deleteTopo">删除拓扑图</v-contextmenu-item>
    </v-contextmenu>
  </div>
</template>
<script>
import G6Editor from '@/components/topo';
import TreeMenu from '@/components/treeMenu';
import { unPack } from '@/utils/parse';
import { getTopoList, deleteTopo, createTopo, getTopoDetail } from '@/api/topo';

export default {
  components: {
    G6Editor,
    TreeMenu
  },
  data () {
    return {
      dialogFormVisible: false,
      selectTopo: null,
      menu: [],
      serachinputName: '',
      topo: null,
      form: {
        topoTypeId: 1000,
        topoName: '',
        topoDesc: '',
        areaId: '',
        id: '',
        nodes: [],
        combos: [],
        groups: []
      },
      rules: {
        topoName: [
          { required: true, message: '请输入拓扑图名称', trigger: 'blur' },
          { min: 3, max: 7, message: '长度在 3 到 7 个字符', trigger: 'blur' }
        ],
        areaId: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      },
      waiteToDeleteTopoId: '',
      topoName: ''
    };
  },
  computed: {
    pageHeight: () => {
      return document.documentElement.clientHeight - 100;
    },
    imageTypes () {
      return this.$store.getters.imageTypes;
    },
    area: function () {
      return this.$store.getters['layout/area'];
    },
    warnList () {
      return this.$store.state.socket.subscribeList.warnList
    }
  },
  watch: {
    menu (newVal, oldVal) {
      // 第一次加载拓扑图左侧菜单时，判断如果有拓扑图，则加载第一个拓扑图
      if (newVal && newVal.length && newVal[0].topoList && newVal[0].topoList.length) {
        this.selectTopo = newVal[0].topoList[0];
      }
    },
    selectTopo (newVal, oldVal) {
      if (!oldVal || newVal.id !== oldVal.id) {
        this.getTopoDetail(newVal.id);
      }
    }
  },
  created () {
    this.getList();
  },
  methods: {
    watchWarnList (newVal, oldVal) {
      if (newVal.length) {
        let pushInformation = newVal[newVal.length - 1];
        if (typeof pushInformation === 'string') {
          pushInformation = JSON.parse(pushInformation);
        }
        const temp = JSON.parse(JSON.stringify(pushInformation));
        // categoryId:[30000001]代表断链
        let connectState = 'OK';
        if (temp.categoryId !== '30000001') {
          connectState = 'OK';
        } else {
          connectState = 'ERROR';
        }
        const warning = {
          // 告警ID
          id: temp.id,
          // 告警来源
          source: temp.location,
          // 告警级别
          level: temp.alarmLevel,
          // 告警描述
          description: temp.alarmDesc,
          // 连接状态
          connectState,
          // 告警类型
          alarmType: temp.alarmType,
          // 清除告警时间, 如果clearTime不为空则表示此条信息是清除告警，如果为空则表示新增告警
          clearTime: temp.clearTime
        };
        const meId = temp.meId;
        this.$refs['g6editor'].updateItem(meId, warning);
      }
    },
    topoLoaded () {
      this.$watch('$store.state.socket.subscribeList.warnList', this.watchWarnList);
    },
    handleContextmenuClick ({ event, data }) {
      if (!data.id) {
        this.form.topoTypeId = data.topoTypeId;
        this.$refs['contextmenuAdd'].show({ left: event.clientX, top: event.clientY });
      } else {
        this.waiteToDeleteTopoId = data.id;
        this.$refs['contextmenuDelete'].show({ left: event.clientX, top: event.clientY });
      }
    },
    deleteTopo () {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTopo(this.waiteToDeleteTopoId).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          if (this.waiteToDeleteTopoId === this.selectTopo.id) {
            this.selectTopo = null;
          }
          this.getList();
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '删除失败!'
          });
        })
      })
    },
    deal (warning) {
      if (warning.alarmType === 1) {
        this.$router.push({ path: 'warn', query: { id: warning.id, filters: 'third' } });
      } else {
        this.$router.push({ path: 'warn', query: { id: warning.id } });
      }
    },
    getList () {
      getTopoList().then(res => {
        this.menu = res || [];
      }).catch(err => {
        console.log(err);
      })
    },
    getTopoDetail (id) {
      getTopoDetail(id).then((topoData) => {
        const temp = unPack(topoData);
        this.topo = ((temp.nodes && temp.nodes.length > 0) || (temp.groups && temp.groups.length > 0) || (temp.combos && temp.combos.length > 0)) ? temp : {
          nodes: [],
          edges: [],
          combos: [],
          groups: []
        };
      });
    },
    handleSerchKey (val) {

    },
    handleNodeClick (data) {
      this.selectTopo = data;
    },
    // 添加topo图
    addTopo () {
      this.$refs['createTopo'].validate((valid) => {
        if (valid) {
          createTopo(this.form).then(res => {
            this.dialogFormVisible = false;
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.getList();
          }).catch(err => {
            console.log(err);
          }).finally(() => {
            this.form.id = '';
            this.form.topoName = '';
            this.form.areaId = '';
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    editTopo () {
      this.$router.push({
        path: 'preview_topo', query: {
          id: this.selectTopo.id,
          topoTypeId: this.selectTopo.topoTypeId,
          name: this.selectTopo.topoName
        }
      });
    }
  }
}
</script>
<style scoped lang="scss">
.topological-container {
  $title-height: 68px;
  $menu-width: 280px;
  position: absolute;
  height: 100%;
  width: 100%;
  .topo-menu {
    position: absolute;
    width: $menu-width;
    height: 100%;
    left: 0;
    top: 0;
    bottom: 0;
    background: #2c2b40;
    .search-container {
      padding: 22px 10px;
      .filter-item {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(65, 64, 97, 1);
        border-radius: 3px;
      }
    }
  }
  .right-panel {
    position: absolute;
    width: calc(100% - #{$menu-width});
    height: calc(100% - #{$title-height});
    left: $menu-width;
    top: 0;
    bottom: 0;
    right: 0;
    .title-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: $title-height;
      padding-left: 28px;
      padding-right: 28px;
      box-shadow: 0px -1px 4px #909090;
      span {
        font-size: 20px;
        font-weight: bold;
        color: #7785e6;
        line-height: 56px;
      }
      span:before {
        content: "";
        display: inline-block;
        width: 5px;
        height: 16px;
        background-color: #5365df;
        margin-right: 5px;
      }
    }
  }
}
</style>
