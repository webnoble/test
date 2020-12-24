<template>
  <div class="percentloop">
    <div class="circle-left" :class="{'red': percentNum > 90}">
      <div ref="leftcontent" class="two"></div>
    </div>
    <div class="circle-right" :class="{'red': percentNum > 90}">
      <div ref="rightcontent"></div>
    </div>
    <div class="number">
      {{ percent }}%
    </div>
  </div>
</template>

<script>
export default {
  props: {
    percentNum: {
      type: [String, Number],
      default: 0
    },
    speed: { // 建议取值为0-3
      type: [String, Number],
      default: 1
    }
  },
  data () {
    return {
      // 百分数
      percent: 0,
      initDeg: 0,
      timeId: null,
      animationing: false
    }
  },
  watch: {
    'percentNum': function (val) {
      if (this.animationing) return
      this.goRotate(this.transformToDeg(val))
    }
  },
  created () {
    this.goRotate(this.transformToDeg(this.percentNum))
  },
  methods: {
    // 求旋转角度
    transformToDeg (percent) {
      let deg = 0
      if (percent >= 100) {
        deg = 360
      } else {
        deg = parseInt(360 * percent / 100)
      }
      return deg
    },
    transformToPercent (deg) {
      let percent = 0
      if (deg >= 360) {
        percent = 100
      } else {
        percent = parseInt(100 * deg / 360)
      }
      return percent
    },
    rotateLeft (deg) { // 大于180时，执行的动画
      this.$refs.leftcontent.style.transform = 'rotate(' + (deg - 180) + 'deg)'
    },
    rotateRight (deg) { // 小于180时，执行的动画
      this.$refs.rightcontent.style.transform = 'rotate(' + deg + 'deg)'
    },
    goRotate (deg) {
      this.animationing = true
      this.timeId = setInterval(() => {
        if (deg > this.initDeg) { // 递增动画
          this.initDeg += Number(this.speed)
          if (this.initDeg >= 180) {
            this.rotateLeft(this.initDeg)
            this.rotateRight(180) // 为避免前后两次传入的百分比转换为度数后的值不为步距的整数，可能出现的左右转动不到位的情况。
          } else {
            this.rotateRight(this.initDeg)
          }
        } else { // 递减动画
          this.initDeg -= Number(this.speed)
          if (this.initDeg >= 180) {
            this.rotateLeft(this.initDeg)
          } else {
            this.rotateLeft(180) // 为避免前后两次传入的百分比转换为度数后的值不为步距的整数，可能出现的左右转动不到位的情况。
            this.rotateRight(this.initDeg)
          }
        }
        this.percent = this.transformToPercent(this.initDeg) // 百分比数据滚动动画
        const remainer = Number(deg) - this.initDeg
        if (Math.abs(remainer) < this.speed) {
          this.initDeg += remainer
          if (this.initDeg > 180) {
            this.rotateLeft(deg)
          } else {
            this.rotateRight(deg)
          }
          this.animationFinished()
        }
      }, 10)
    },
    animationFinished () {
      this.percent = this.percentNum // 百分比数据滚动动画
      this.animationing = false
      clearInterval(this.timeId)
      this.$emit('animationFinished') // 动画完成的回调
    }
  }
}
</script>

<style scoped lang="scss">
.percentloop {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 125px;
  height: 125px;
  border-radius: 50%;
  overflow: hidden;
  .circle-left,
  .circle-right {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background-color: #54d168;
    overflow: hidden;
    & > div {
      width: 100%;
      height: 100%;
      background-color: #f1f1f1;
      transform-origin: right center;
    }
  }
  .red {
    background-color: red;
  }
  .circle-right {
    left: 50%;
    & > div {
      transform-origin: left center;
    }
  }
  .number {
    position: absolute;
    top: 8px;
    bottom: 8px;
    left: 8px;
    right: 8px;
    font-size: 32px;
    background-color: #fff;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2f394e;
  }
}
</style>
