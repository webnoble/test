<template>
  <div>
    <ul ref="contextMenu" class="el-scrollbar__view el-select-dropdown__list context-menu">
      <li
        v-for="menu in menus"
        :key="menu.key"
        class="el-select-dropdown__item"
        @click="handleClick(menu)"
      >{{ menu.name }}</li>
    </ul>
  </div>
</template>

<script>
import eventBus from '&/utils/eventBus';
export default {
  name: 'ContextMenu',
  data () {
    return {
      menus: [{ key: 1, name: '关联设备' }]
    };
  },
  created () {
    this.bindEvent();
  },
  methods: {
    init () { },
    bindEvent () {
      eventBus.$on('contextmenuClick', e => {
        const menu = this.$refs.contextMenu;
        if (!menu) {
          return;
        }
        menu.style.left = e.canvasX + 'px';
        menu.style.top = e.canvasY + 'px';
        menu.style.display = 'block';
      });
      eventBus.$on('mousedown', () => {
        const menu = this.$refs.contextMenu;
        if (!menu) {
          return;
        }
        menu.style.display = 'none';
      });
    },
    handleClick (item) {
      alert(item.name);
      const menu = this.$refs.contextMenu;
      menu.style.display = 'none';
    }
  }
};
</script>

<style>
.context-menu {
  position: absolute;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin: 5px 0;
  z-index: 1;
  display: none;
}

.context-menu li {
  cursor: pointer;
  font-size: 12px;
  height: 28px;
  line-height: 28px;
}
.context-menu li:hover {
  background-color: #f5f7fa;
}
</style>
