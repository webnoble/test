<template>
  <div id="navigator">
    <div id="minimap" ref="minimap" class="minimap" />
  </div>
</template>

<script>
import G6 from '@antv/g6';
import eventBus from '&/utils/eventBus';
export default {
  name: 'Minimap',
  data () {
    return {
      minimap: null,
      graph: null
    };
  },
  created () {
    this.bindEvent();
  },
  beforeDestroy () {
    this.unbindEvent();
  },
  methods: {
    createMiniMap () {
      return new Promise((resolve, reject) => {
        const cfgs = {
          container: 'minimap',
          className: 'minimap',
          size: [200, 130]
          // type: 'delegate'
        };
        this.minimap = new G6.Minimap({ ...cfgs });
        resolve(this.minimap);
      });
    },
    bindEvent () {
      eventBus.$on('afterAddPage', this.onAfterAddPage);
      eventBus.$on('beforeDestory', this.onBeforeDestory);
    },
    unbindEvent () {
      eventBus.$off('afterAddPage', this.onAfterAddPage);
      eventBus.$off('beforeDestory', this.onBeforeDestory);
    },
    onAfterAddPage (page) {
      this.graph = page.graph;
      this.createMiniMap().then((minimap) => {
        this.graph.addPlugin(minimap);
      });
    },
    onBeforeDestory () {
      this.graph.removePlugin(this.minimap)
      this.minimap = null;
    }
  }
};
</script>

<style scoped>
#navigator {
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 3;
  border: 2px solid #edecf5;
}
</style>
