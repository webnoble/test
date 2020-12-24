<template>
  <div ref="echartCircle" class="echartCircle"></div>
</template>

<script>
var echarts = require('echarts/lib/echarts');
// 引入饼状图组件
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
export default {
  props: {
    circleData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      option: {
        tooltip: {
          // 是否显示提示框组件，包括提示框浮层和 axisPointe
          show: false,
          // 触发类型 item数据项触发 axis 坐标轴触发
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        // 系列列表。每个系列通过 type 决定自己的图表类型
        series: [
          {
            name: '任务进度',
            type: 'pie',
            // 饼图的半径 第一项为内半径 第二项为外半径
            radius: ['90%', '100%'],
            // 是否启用防止标签重叠策略 默认开启
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            data: [
              {
                // 数据值
                value: 0,
                // 该数据项是否被选中
                selected: false,
                hoverAnimation: false,
                // 单个扇区的标签配置
                label: {
                  normal: {
                    // 是显示标签
                    show: true,
                    position: 'center',
                    fontSize: '100%',
                    color: '#2F394E',
                    // 标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 \n 换行
                    formatter: '{d}%'
                  }
                },
                itemStyle: {
                  normal: { color: '#54D168' },
                  emphasis: { color: '#54D168' }
                }
              },
              {
                // 数据值
                value: 100,
                // 该数据项是否被选中
                selected: false,
                itemStyle: {
                  normal: { color: '#F1F1F1' },
                  emphasis: { color: '#F1F1F1' }
                }
              }
            ]
          }
        ]
      }
    }
  },
  computed: {
    fontSize1: function () {
      return Math.round(document.body.clientWidth / 1920 * 32);
    }
  },
  created () {
    this.option.series[0].data[0].value = this.circleData.precent || this.option.series[0].data[0].value;
    if (this.circleData.state === 'ERROR') {
      this.option.series[0].data[0].itemStyle.emphasis.color = '#F13E3E'
    }
    this.option.series[0].data[1].value = 100 - this.option.series[0].data[0].value;
    this.option.series[0].radius[0] = this.circleData.borderWidth && this.circleData.width ? Math.round((1 - this.circleData.borderWidth / this.circleData.width * 2) * 100) + '%' : this.option.series[0].radius[0];
    this.option.series[0].data[0].label.normal.fontSize = this.circleData.fontSize ? Math.round(this.circleData.fontSize / 36 * 100) + '%' : this.option.series[0].data[0].label.normal.fontSize;
    this.option.series[0].data[0].itemStyle.emphasis.color = this.option.series[0].data[0].itemStyle.normal.color = this.circleData.color || this.option.series[0].data[0].itemStyle.emphasis.color;
  },
  mounted () {
    this.echartCircle = echarts.init(this.$refs.echartCircle);
    this.echartCircle.setOption(this.option);
    var that = this;
    // 自适应布局
    window.addEventListener('resize', function () {
      const width = that.$refs.echartCircle.clientWidth;
      const height = that.$refs.echartCircle.clientHeight;
      that.echartCircle.resize({
        width: width,
        height: height
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.echartCircle {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media screen and (max-width: 1920px) {
  .echartCircle {
    font-size: 32px;
  }
}
@media screen and (max-width: 1680px) {
  .echartCircle {
    font-size: 24px;
  }
}
@media screen and (max-width: 1366px) {
  .echartCircle {
    font-size: 16px;
  }
}
</style>

