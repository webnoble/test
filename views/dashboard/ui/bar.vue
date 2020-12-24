<template>
  <div class="bar-container">
    <div class="bar" :style="{height:score+'%'}">{{ score }}分</div>
    <div class="score">{{ score }}分</div>
    <div class="wave" :style="{bottom:`calc(${score}% - 25px)`}">
      <div class="wave1"></div>
      <div class="wave2"></div>
      <div class="wave3"></div>
    </div>
    <div class="bubble">
      <div
        v-for="(item,index) in bubbleList"
        :key="index"
        v-animation="item"
        class="dot"
        :style="{top:`calc(100% - ${score}%)`,width:item.size + 'px',height:item.size + 'px',left:item.positionX + '%',transitionDuration:`${item.speed}s`}"
      >{{ item.id }}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.bar-container {
  border: 1px solid #47c8f4;
  width: 50px;
  height: 60%;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  margin: auto;
  background-color: rgba(71, 200, 244, 0.1);
}
.bar {
  width: 50px;
  position: absolute;
  bottom: 0;
  z-index: 2;
  background: linear-gradient(
    180deg,
    rgba(107, 233, 254, 1) 0%,
    rgba(84, 102, 224, 1) 100%
  );
}
.score {
  width: 50px;
  position: absolute;
  bottom: 1%;
  z-index: 3;
  font-size: 14px;
  color: #fff;
}
.bubble {
  .dot {
    position: absolute;
    border-radius: 100%;
    background-color: rgba(107, 233, 254, 1);
    // transition: all 1s;
    transition-property: all;
    transition-timing-function: linear;
  }
}
.wave {
  position: absolute;
  width: 100%;
  height: 50px;
  line-height: 50px;
  z-index: 1;
  margin: 0 auto;
  font-size: 14px;
  text-align: center;
  div {
    background: #6be9fe;
    width: 100%;
    height: 50%;
    top: 39%;
    border-radius: 100%;
    -webkit-animation-duration: 5s;
    animation-duration: 5s;
  }
}
.wave1 {
  position: absolute;
  left: -35%;
  opacity: 0.7;
  animation: water-wave1 linear infinite;
}
.wave2 {
  position: absolute;
  left: 50%;
  opacity: 0.7;
  animation: water-wave2 linear infinite;
  -webkit-animation-duration: 3s;
  animation-duration: 3s;
}
.wave3 {
  position: absolute;
  right: -70%;
  opacity: 0.5;
  -webkit-animation-duration: 4s;
  animation-duration: 4s;
  animation: water-wave3 linear infinite;
}
@keyframes water-wave1 {
  0% {
    left: -35%;
    right: initial;
  }
  70% {
    left: 80%;
  }
  71% {
    right: 100%;
    left: initial;
  }
  100% {
    right: 40%;
    left: initial;
  }
}
@keyframes water-wave3 {
  100% {
    right: 100%;
  }
  0% {
    right: -70%;
  }
}
@keyframes water-wave2 {
  0% {
    left: 50%;
    right: initial;
  }
  10% {
    left: 80%;
    right: initial;
  }
  11% {
    right: 100%;
    left: initial;
  }
  100% {
    right: -50%;
    left: initial;
  }
}
</style>
<script>
export default {
  directives: {
    animation: {
      inserted: function (el, bingind, vnode) {
        setTimeout(() => {
          el.style.top = '-10px';
        })
      }
    }
  },
  props: {
    score: {
      default: 0,
      type: Number
    }
  },
  data () {
    return {
      bubbleList: []
    }
  },
  created () {
    // this.init();
  },
  methods: {
    init () {
      for (let i = 0; i < 4; i++) { this.creatDot(); }
    },
    creatDot () {
      const obj = {
        size: this.randomNum(4, 6),
        positionX: this.randomNum(2, 98),
        speed: this.randomNum(3, 5)
      }
      this.bubbleList.push(obj);
      setTimeout(() => {
        if (this.bubbleList.length > 100) {
          this.bubbleList = [];
          this.init();
        } else {
          this.creatDot();
        }
      }, obj.speed * 1000)
    },
    randomNum (minNum, maxNum) {
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
    }
  }
}
</script>
