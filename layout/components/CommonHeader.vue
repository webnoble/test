<template>
  <div class="header">
    <el-row>
      <el-col :span="4">
        <img src="@/assets/logo.png" />
      </el-col>
      <el-col :span="12">
        <ul class="header__list">
          <li
            v-for="(item,key) in showList"
            :key="key"
            v-addClass="[item,currentRouter]"
            @click="linkTo(item)"
          >
            <span>{{ item.name }}</span>
            <i
              v-if="item.path=='/warn'&&warnList&&warnList.length>0"
              class="warnNum"
            >{{ warnList.length >=100 ? '99+': warnList.length }}</i>
          </li>
        </ul>
      </el-col>
      <el-col :span="8" class="right-menu">
        <!-- <template v-if="device === 'desktop'">
          <el-tooltip content="菜单搜索" effect="dark" placement="bottom">
            <search id="header-search" class="right-menu-item" />
          </el-tooltip>
          <error-log class="errLog-container right-menu-item hover-effect" />
          <el-tooltip content="语言切换" effect="dark" placement="bottom">
            <lang-select class="right-menu-item hover-effect" />
          </el-tooltip>

          <el-tooltip content="全屏" effect="dark" placement="bottom">
            <screenfull id="screenfull" class="right-menu-item hover-effect" />
          </el-tooltip>

          <el-tooltip content="字体大小" effect="dark" placement="bottom">
            <size-select id="size-select" class="right-menu-item hover-effect" />
          </el-tooltip>
        </template>-->
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <span>{{ userName }}</span>
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">注销登陆</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="icon iconfont iconicon_house goHome" @click="goHome">平台首页</span>
      </el-col>
    </el-row>
    <div class="voice_container">
      <div v-for="(item,index) in voiceList" :key="index">
        <div v-if="item.isStart == 1 && item.data">
          <audio :ref="`audio${item.levelId}`" muted :src="item.data.url"></audio>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { getSimpleFileInfoList, apiUrlfun } from '@/api/simpleFileInfo';
import defaultHeadPic from '@/assets/police.png';
import { logout } from '@/api/user';

function addClass (el, list, currentRouter) {
  // console.log(list)
  let isChild = false;
  if (
    currentRouter === list.path ||
    (list.redirect && currentRouter === list.redirect)
  ) {
    isChild = true;
  } else if (list.children && list.children.length > 0) {
    list.children.forEach((item) => {
      addClass(el, item, currentRouter);
    });
  }
  if (isChild) {
    el.className = 'active';
  }
}
export default {
  name: 'CommonHeader',
  components: {},
  directives: {
    addClass: {
      inserted: function (el, bingind, vnode) {
        el.className = '';
        addClass(el, bingind.value[0], bingind.value[1]);
      },
      bind: function () { },
      update: function (el, bingind, vnode) {
        if (
          JSON.stringify(bingind.oldValue) !== JSON.stringify(bingind.value)
        ) {
          el.className = '';
          addClass(el, bingind.value[0], bingind.value[1]);
        }
      },
      componentUpdated: function (el, bingind, vnode) { },
      unbind: function () { }
    }
  },
  data () {
    return {
      showList: [],
      voiceList: [],
      defaultHeadPic,
      portalUrl: ''
    };
  },
  computed: {
    ...mapGetters(['permission_routes', 'avatar', 'device']),
    warnList () {
      let list = [];
      if (this.$store.state.socket.subscribeList.warnList) {
        list = this.$store.state.socket.subscribeList.warnList;
        list = list.filter((item) => {
          return !JSON.parse(item).clearTime;
        });
      }
      return list;
    },
    currentRouter () {
      return this.$route.path;
    },
    userName () {
      return this.$store.getters.name;
    }
  },
  watch: {
    '$store.state.socket.subscribeList.warnList' () {
      let list = [];
      if (this.$store.state.socket.subscribeList.warnList) {
        list = this.$store.state.socket.subscribeList.warnList;
        list = list.filter((item) => {
          return !JSON.parse(item).clearTime;
        });
      }
      if (list.length > 0) {
        const warnInfo = JSON.parse(list[list.length - 1]);
        const audio = this.$refs[`audio${warnInfo.alarmLevel}`];
        if (audio) {
          console.log(audio[0].src);
          var player = new Audio(audio[0].src);
          player.preload = true;
          player.volume = 1;
          player.play();
        }
      }
    },
    '$store.state.permission.routes' () {
      this.showList = this.permission_routes.filter((item) => {
        return !item.hidden;
      });
    }
  },
  created () {
    this.$request.get('/getUrl/getPortalUrl').then((data) => {
      this.portalUrl = data['smm-portal-web'];
    });
    this.showList = this.permission_routes.filter((item) => {
      return !item.hidden;
    });
    if (sessionStorage.getItem('voiceList')) {
      this.voiceList = JSON.parse(sessionStorage.getItem('voiceList'));
      this.$forceUpdate();
    } else {
      this.$request.get('/alarm/audio/queryPage').then((res) => {
        const promise = [];
        res.items.forEach((item) => {
          promise.push(this.getSimpleFileInfoList(item));
        });
        Promise.all(promise).then((values) => {
          this.voiceList = values;
          sessionStorage.setItem('voiceList', JSON.stringify(this.voiceList));
        });
      });
    }
  },
  mounted () {
    this.$EventBus.$on('update', () => {
      this.voiceList = JSON.parse(sessionStorage.getItem('voiceList'));
      this.$forceUpdate();
    });
  },
  methods: {
    logout () {
      logout().then((resp) => {
        window.location.href = resp.sso_redirect_url;
      });
    },
    goHome () {
      if (!this.portalUrl) {
        this.$message('获取平台首页地址失败，请刷新页面');
        return false;
      }
      window.location.href = this.portalUrl;
    },
    getSimpleFileInfoList (item) {
      const promise = new Promise((resolve, reject) => {
        getSimpleFileInfoList(item.id).then((res) => {
          const data = res[0];
          if (data && data.id) {
            data.url = apiUrlfun() + 'static/' + data.id;
            console.log(data.url);
          }
          item.data = data;
          resolve(item);
          // this.$forceUpdate();
        });
      });
      return promise;
    },
    linkTo (item) {
      if (!item) return false;
      if (item.data && item.data.menuType === 'directory') {
        this.linkTo(item.children[0]);
      } else {
        this.$router.push(item.path);
      }
    }
  }
};
</script>
<style lang="scss">
.header {
  height: $navBar;
  line-height: $navBar;
  width: 100%;
  text-align: center;
  background: linear-gradient(-90deg, rgba(47, 53, 72, 1), rgba(37, 42, 57, 1));
  color: #ffffff;
  overflow: hidden;
  img {
    vertical-align: middle;
    width: 160px;
  }
  &__list {
    text-align: center;
    padding: 0;
    margin: 0;
    li {
      display: inline-block;
      margin-right: 3vw;
      width: 78px;
      text-align: center;
      cursor: pointer;
      color: #adb0b6;
      font-size: 16px;
      position: relative;
      .warnNum {
        display: inline-block;
        position: absolute;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        right: 5px;
        top: 6px;
        background: red;
        border-radius: 50%;
        color: #fff;
        font-size: 14px;
      }
      &:hover,
      &.active {
        span {
          border-bottom: 2px solid #5466e0;
          color: #fff;
        }
      }
      span {
        display: inline-block;
        height: 40px;
        line-height: 40px;
      }
    }
  }
  .right-menu {
    text-align: right;
    height: 64px;
    line-height: 64px;
    padding-right: 20px;
    font-size: 16px;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 64px;
      line-height: 64px;
      font-size: 16px;
      @include themeify {
        color: themed("light");
      }
      vertical-align: middle;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .goHome {
      position: relative;
      font-size: 14px;
      padding-left: 22px;
      cursor: pointer;
      &::before {
        position: absolute;
        left: 0;
      }
    }

    .avatar-container {
      margin-right: 40px;
      cursor: pointer;
      font-size: 14px;
      .avatar-wrapper {
        position: relative;
        color: #ffffff;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 27px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
