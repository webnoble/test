<template>
  <div ref="filters" class="filters">
    <span v-if="!item.filters">{{ showText?showText:item.label }}</span>
    <el-popover
      v-else
      v-model="showPopup"
      placement="bottom"
      trigger="click"
      :width="width"
      popper-class="filter-popup"
      @show="show"
    >
      <div class="layPopup" @click="closePopup"></div>
      <ul class="filters_list">
        <li @click="changeFilter">全部</li>
        <li v-for="(i,key) in filters" :key="key" @click="changeFilter(i)">{{ i.text }}</li>
      </ul>
      <div slot="reference">
        <span>{{ showText?showText:item.label }}</span>
        <span class="icon iconfont iconarrow_triangle-down"></span>
      </div>
    </el-popover>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      showPopup: false,
      width: 0,
      showText: ''
    }
  },
  computed: {
    filters: function () {
      let filters = [];
      if (typeof this.item.filters === 'string') {
        filters = this.$store.getters[this.item.filters]
      } else {
        filters = this.item.filters
      }
      return filters
    }
  },
  methods: {
    closePopup () {
      this.showPopup = false
    },
    show () {
      this.width = this.$refs.filters.clientWidth
    },
    changeFilter (item) {
      this.showPopup = false
      if (item) {
        this.showText = item.text;
      } else {
        this.showText = '';
      }
    }
  }
}
</script>
<style lang="scss" scope>
.filters {
  width: 100%;
  height: 50px;
  position: relative;
  text-align: center;
  line-height: 50px;
  box-shadow: 0px 0px 5px 0px rgba(44, 43, 64, 0.55);
  box-sizing: border-box;
  .el-popover__reference {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 50px;
  }
}
.filter-popup {
  border-radius: 0;
  box-shadow: 0px 0px 5px 0px rgba(44, 43, 64, 0.55);
  box-sizing: border-box;
  background: transparent;
  margin-top: -50px !important;
  padding: 0 !important;
  min-width: 0;
  .popper__arrow {
    display: none;
  }
  .layPopup {
    height: 50px;
    background: transparent;
  }
  .filters_list {
    background: rgba(255, 255, 255, 1);
    padding: 0 3px;
    li {
      padding: 5px 0;
      text-align: center;
      cursor: pointer;
      &:hover {
        background-color: #e8ebf3;
      }
    }
  }
}
</style>
