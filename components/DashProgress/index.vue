<template>
  <div class="dashProgress">
    <span>{{ num }}%</span>
    <div class="content">
      <ul class="box1">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div ref="box2" class="box2" :style="{'height':height}"></div>
      <div class="box3"></div>
    </div>
    <div>{{ name }}</div>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    num: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      height: ''
    }
  },
  mounted () {
    const num = 100 - (this.num * 0.6);
    const space = parseInt(this.num / 10) * 4;
    this.height = (num - space) + '%'
  }
}
</script>
<style lang="scss" scoped>
.dashProgress {
  text-align: center;
  min-width: 50px;
}
.content {
  width: 20px;
  height: 100px;
  position: relative;
  margin: 5px auto;
  ul {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 3;
    li {
      width: 100%;
      height: 4px;
      background-color: #ffff;
      margin-bottom: 6px;
      position: relative;
      &::after {
        content: '';
        display: inline-block;
        width: 6px;
        height: 6px;
        position: absolute;
        left: -4px;
        top: -1px;
      }
    }
  }
  .box2 {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #e1e1e1;
    z-index: 2;
    transition: all linear;
  }
  .box3 {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      rgba(107, 233, 254, 1),
      rgba(101, 119, 227, 1)
    );
    z-index: 1;
  }
}
</style>
