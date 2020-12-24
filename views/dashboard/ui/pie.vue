<!--
 * @Author: your name
 * @Date: 2020-05-26 16:08:13
 * @LastEditTime: 2020-05-26 17:13:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \monitor\src\views\dashboard\ui\pie.vue
-->
<template>
  <div class="pie">
    <div class="pie-container" :class="setClass(type)">
      <div class="pie1"></div>
      <div class="pie2"></div>
      <div class="pie3"></div>
    </div>
    <div class="text">
      <span>{{ num }}</span>个
    </div>
  </div>
</template>
<script>
export default {
  props: {
    num: {
      type: Number,
      default: 0
    },
    type: {
      type: Number,
      default: 1
    }
  },
  methods: {
    setClass (item) {
      const obj = {};
      obj['type' + item] = true;
      return obj;
    }
  }
}
</script>
<style lang="scss" scoped>
@keyframes moveover1 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes moveover2 {
  0% {
    transform: rotate(-180deg);
  }
  100% {
    transform: rotate(180deg);
  }
}
@keyframes moveover3 {
  0% {
    transform: rotate(-90deg);
  }
  100% {
    transform: rotate(270deg);
  }
}
@keyframes moveover4 {
  0% {
    transform: rotate(90deg);
  }
  100% {
    transform: rotate(450deg);
  }
}
.pie {
  position: relative;
  width: 8vw;
  height: 8vw;
  margin: auto;
  .text {
    font-size: 20px;
    width: 8vw;
    height: 8vw;
    line-height: 8vw;
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    color: #252a39;
    font-size: 14px;
    span {
      font-size: 20px;
    }
  }
}
.pie-container {
  width: 8vw;
  height: 8vw;
  position: relative;
  &.type1 {
    animation: moveover1 1s linear 1;
    .pie1 {
      background: linear-gradient(#ec4723, #f9c9be);
      &::after {
        background-color: #ec4723;
      }
    }
    .pie2 {
      background: linear-gradient(#fff, #f9c9be);
    }
  }
  &.type2 {
    transform: rotate(180deg);
    animation: moveover2 1s linear 1;
    .pie1 {
      background: linear-gradient(#f57923, #f9b789);
      &::after {
        background-color: #f57923;
      }
    }
    .pie2 {
      background: linear-gradient(#fff, #f9b789);
    }
  }
  &.type3 {
    transform: rotate(270deg);
    animation: moveover3 1s linear 1;
    .pie1 {
      background: linear-gradient(#5466e0, #c4caf5);
      &::after {
        background-color: #5466e0;
      }
    }
    .pie2 {
      background: linear-gradient(#fff, #c4caf5);
    }
  }
  &.type4 {
    transform: rotate(90deg);
    animation: moveover4 1s linear 1;
    .pie1 {
      background: linear-gradient(#2bc6d1, #bbedf1);
      &::after {
        background-color: #2bc6d1;
      }
    }
    .pie2 {
      background: linear-gradient(#fff, #bbedf1);
    }
  }
  .pie1 {
    position: absolute;
    width: 4vw;
    height: 8vw;
    border-radius: 4vw 0 0 4vw;
    z-index: 2;
    &::after {
      content: "";
      display: inline-block;
      width: 12px;
      height: 12px;
      position: absolute;
      top: 0;
      right: -4px;
      border-radius: 10px;
    }
  }
  .pie2 {
    position: absolute;
    width: 4vw;
    height: 8vw;
    border-radius: 0 4vw 4vw 0;
    left: 50%;
    z-index: 1;
  }
  .pie3 {
    position: absolute;
    width: calc(8vw - 24px);
    height: calc(8vw - 24px);
    line-height: calc(8vw - 24px);
    text-align: center;
    font-size: 20px;
    top: 12px;
    left: 12px;
    border-radius: 50%;
    background-color: #fff;
    z-index: 2;
  }
}
// .pie-container {
//   width: 100%;
//   position: relative;
//   // animation: moveover 3s linear infinite;
//   .pie1 {
//     position: absolute;
//     width: 50%;
//     padding-top: 100%;
//     border-radius: 100% 0 0 100%;
//     background: linear-gradient(#ec4723, #f9c9be);
//     z-index: 2;
//     &::after {
//       content: "";
//       display: inline-block;
//       width: 7px;
//       height: 7px;
//       position: absolute;
//       top: 0;
//       right: -2px;
//       background-color: #ec4723;
//       border-radius: 100%;
//     }
//   }
//   .pie2 {
//     position: absolute;
//     width: 50%;
//     padding-top: 100%;
//     border-radius: 0 50% 50% 0;
//     left: 50%;
//     background: linear-gradient(#fff, #f9c9be);
//     z-index: 1;
//   }
//   .pie3 {
//     position: absolute;
//     width: calc(100% - 16px);
//     padding-top: calc(100% - 16px);
//     top: 8px;
//     left: 8px;
//     border-radius: 50%;
//     // background-color: #fff;
//     z-index: 2;
//   }
// }
</style>
