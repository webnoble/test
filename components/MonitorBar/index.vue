
<template>
  <div class="monitorbar">
    <ul>
      <li
        v-for="(item,key) in showList"
        :key="key"
        :class="[currentPath.indexOf(item.path) !== -1?'active':'']"
        @click="jump(item)"
      >
        <div class="icon iconfont" :class="setClass(item.data.icon)"></div>
        <span>{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MonitorBar',
  data () {
    return {
      showList: [],
      currentPath: this.$route.path
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes'
    ])
  },
  created () {
    this.permission_routes.forEach((item) => {
      if (item.children && item.children.length > 0) {
        var list = item.children.find((i) => {
          return this.$route.path.indexOf(i.path) !== -1
        })
        if (list) {
          this.showList = item.children;
        }
      }
    })
  },
  methods: {
    jump (item) {
      this.$router.push(item.path)
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
.monitorbar {
  display: flex;
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 1px;
  // border-image: -webkit-linear-gradient(#111, #1bd0db, #111) 30 30;
  background-color: #1b2238;
  min-height: calc(100vh - 64px);
  box-sizing: border-box;
  // @include themeify {
  //   border-color: themed("navColor");
  // }
  li {
    padding: 20px;
    background-color: #1b2238;
    border-bottom: 1px solid #111934;
    color: #8d8f98;
    cursor: pointer;
    &:hover,
    &.active {
      background: -webkit-linear-gradient(left, #3f478b 0%, #2c2b40 100%);
      color: #d1d2d3;
      .icon {
        color: #5466e0;
      }
    }
    .icon {
      font-size: 30px;
      margin-bottom: 5px;
    }
  }
}
</style>
