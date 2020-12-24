<template>
  <div class="topo-container">
    <toolbar v-if="mode === 'edit'" :name="name" @save="save" />
    <div class="bottom-container" :class="mode === 'edit' ? 'edit-statu' : 'view-statu'">
      <!-- topo图 -->
      <div ref="viewContainer" class="viewContainer">
        <page
          ref="viewport"
          class="viewport"
          :style="{ left: sideBarWidth + 'px'}"
          :height="viewportHeight"
          :width="viewportWidth"
          :data="data"
          :mode="mode"
        >
          <warning-dialog v-if="mode === 'view'" @handle="deal"></warning-dialog>
          <setting-dialog v-if="mode === 'edit'" @handle="bindDevice"></setting-dialog>
          <edit-group-dialog v-if="mode === 'edit'" @handle="editGroupName"></edit-group-dialog>
          <!-- 下侧小topo图 -->
          <div class="mini-viewport">
            <minimap />
          </div>
        </page>
      </div>
      <!-- 左侧图元选择 -->
      <div ref="sidebar" class="topo-sidebar">
        <item-panel
          v-if="mode === 'edit'"
          ref="itemPanel"
          :edit-node-item="editNodeItem"
          @toggleItempanel="toggleItempanel"
        />
      </div>
    </div>
    <flow :mode="mode" :image-types="imageTypes" />
  </div>
</template>
<script>
import Toolbar from '../Toolbar';
import ItemPanel from '../ItemPanel';
import Minimap from '../Minimap';
import Page from '../Page';
import Flow from '../Flow';
import WarningDialog from '../TopoDialog/warning.vue';
import SettingDialog from '../TopoDialog/setting.vue';
import EditGroupDialog from '../TopoDialog/editGroup.vue';
import Editor from '&/components/Base/Editor';
import Command from '&/command';
import eventBus from '&/utils/eventBus';
import { warningLevel } from '@/utils/filters';

export default {
  name: 'G6Editor',
  components: {
    Toolbar,
    ItemPanel,
    Minimap,
    Page,
    Flow,
    WarningDialog,
    SettingDialog,
    EditGroupDialog
  },
  props: {
    name: {
      type: String,
      default: () => {
        return '';
      }
    },
    data: {
      type: Object,
      default: () => {
        return {
          nodes: [],
          edges: [],
          combos: [],
          groups: []
        };
      }
    },
    mode: {
      type: String,
      default: () => {
        return 'view';
      }
    },
    editNodeItem: {
      type: Array,
      default: () => {
        return [];
      }
    },
    imageTypes: {
      type: Object,
      default: () => {
        return {};
      }
    },
    globeParam: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data () {
    return {
      editor: {},
      command: null,
      sideBarWidth: 0,
      viewportHeight: 871,
      viewportWidth: 1608
    };
  },
  created () {
    this.init();
    this.bindEvent();
  },
  beforeDestroy () {
    this.unbindEvent();
  },
  mounted () {
    this.viewportHeight = this.$refs['viewContainer'].offsetHeight;
    this.viewportWidth = this.$refs['viewContainer'].offsetWidth - this.sideBarWidth;
  },
  methods: {
    updateItem (meId, warning) {
      const graph = this.editor.graph;
      if (!graph) {
        return;
      }
      graph.findAll('node', (node) => {
        const model = node.getModel();
        if (meId !== model.meId) {
          return;
        }
        // 获得和此节点相关的节点数组
        const source = model.source ? JSON.parse(model.source) : [];
        const target = model.target ? JSON.parse(model.target) : [];
        // 如果clearTime存在，则表示清除此条告警
        if (warning.clearTime) {
          const index = model.warningList.findIndex(w => {
            return w.id === warning.id;
          });
          model.warningList.splice(index, 1);
          model.warningList.sort((a, b) => { return b.level - a.level }); // 对告警信息来个排序，告警等级降序
        } else {
          model.warningList.push(warning);
        }
        model.warning = model.warningList[0];// 取告警等级最高的信息显示
        model.connectState = warning.connectState;
        model.stateColor = warningLevel(warning.level).color;
        graph.updateItem(node, model);
        // 与本节点相关的节点连线状态需要更新，但是连线状态要和相关节点状态关联
        // 两个节点其中任意一个状态为异常，连线为异常。两个节点状态都为正常，连线状态才为正常
        changeEdgeColor(source, function (originalId, relatedId) {
          return relatedId + originalId;
        });
        changeEdgeColor(target, function (originalId, relatedId) {
          return originalId + relatedId;
        });
        function changeEdgeColor (relatedNodes, fn) {
          relatedNodes.forEach((relatedNode) => {
            relatedNode = graph.findById(relatedNode.id);
            if (relatedNode) {
              const relatedNodeModel = relatedNode.getModel();
              const edge = graph.findById(fn(model.id, relatedNodeModel.id));
              let edgeModel = null;
              if (edge && relatedNodeModel.connectState === 'OK' && model.connectState === 'OK') {
                edgeModel = edge.getModel();
                edgeModel.stateColor = '#7E7C8B';
                graph.updateItem(edge, edgeModel);
              } else if (edge && (relatedNodeModel.connectState !== 'OK' || model.connectState !== 'OK')) {
                edgeModel = edge.getModel();
                edgeModel.stateColor = '#FF0000';
                graph.updateItem(edge, edgeModel);
              }
            }
          });
        }
      });
    },
    editGroupName ({ item, groupName }) {
      const graph = this.editor.graph;
      const model = item.getModel();
      model.label = groupName;
      graph.updateItem(item, model);
    },
    onAfterAddPage (e) {
      this.$emit('topoloaded');
    },
    bindEvent () {
      eventBus.$on('afterAddPage', this.onAfterAddPage);
    },
    unbindEvent () {
      eventBus.$off('afterAddPage', this.onAfterAddPage);
    },
    init () {
      this.editor = new Editor();
      this.command = new Command(this.editor);
    },
    toggleItempanel (data) {
      this.sideBarWidth = this.$refs['sidebar'].offsetWidth;
      this.viewportWidth = this.$refs['viewContainer'].offsetWidth - this.sideBarWidth;
      this.$refs['viewport'].reDraw(data);
    },
    save (data) {
      this.$emit('save', data);
    },
    bindDevice ({ item, device }) {
      const model = item._cfg.model;
      model.meId = device.deviceId;
      model.imageName = device.deviceName;
      this.editor.getGrpah().updateItem(item, model);
    },
    deal (id) {
      this.$emit('deal', id);
    }
  }
};
</script>

<style scoped lang="scss">
.topo-container {
  position: absolute;
  width: 100%;
  height: 100%;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  .bottom-container {
    position: absolute;
    width: 100%;
    overflow: hidden;
    &.edit-statu {
      top: 42px;
      height: calc(100% - 42px);
    }
    &.view-statu {
      top: 0px;
      height: 100%;
    }
    .topo-sidebar {
      position: absolute;
      left: 0px;
      top: 0px;
      bottom: 0px;
    }
    .viewContainer {
      position: absolute;
      left: 0px;
      top: 0px;
      bottom: 0px;
      right: 0px;
      height: 100%;
      min-width: 597px;
      .viewport {
        position: absolute;
        top: 0px;
        bottom: 0px;
        right: 0px;
        height: 100%;
      }
    }
    .mini-viewport {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
}
</style>
