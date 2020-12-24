<template>
  <div
    v-if="badlyList && badlyList.length>0 && currentRouter!='/warn'"
    class="warnTip"
    @click="goWarn"
  >
    <span class="num">{{ badlyList.length }}</span>
    <img src="@/assets/warn.gif" alt />
    <audio src></audio>
  </div>
</template>
<script>
export default {
  data () {
    return {
      num: 8
    };
  },
  computed: {
    currentRouter () {
      return this.$route.path;
    },
    warnList () {
      return this.$store.state.socket.subscribeList.warnList;
    },
    badlyList () {
      if (!this.warnList) return [];
      const badList = this.warnList.filter((item) => {
        const data = JSON.parse(item);
        return data.alarmLevel === 4 && !data.clearTime;
      });
      return badList;
    }
  },
  created () {
    // console.log(this.$store.state)
  },
  methods: {
    goWarn () {
      this.$router.push('/warn');
    }
  }
};
</script>
<style lang="scss">
.warnTip {
  position: fixed;
  right: 0;
  top: 20vh;
  width: 84px;
  height: 78px;
  background: #fff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.07);
  opacity: 0.7;
  border-radius: 39px 0px 0px 39px;
  z-index: 100;
  .num {
    position: absolute;
    width: 18px;
    height: 18px;
    text-align: center;
    line-height: 18px;
    right: 5px;
    background: rgba(255, 0, 0, 1);
    border-radius: 50%;
    color: #fff;
    font-size: 14px;
  }
  img {
    width: 47px;
    height: 48px;
    margin-top: 17px;
    margin-left: 25px;
  }
}
</style>
