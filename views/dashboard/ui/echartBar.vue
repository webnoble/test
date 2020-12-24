<template>
  <div ref="echartBar" class="echartBar"></div>
</template>
<script>
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/bar');
require('echarts/lib/component/dataZoom');
export default {
  props: {
    filterName: {
      type: String,
      default: 'week'
    },
    barData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      option: {
        xAxis: {
          type: 'category',
          data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
          axisLine: {
            lineStyle: {
              color: '#b8b8b8',
              width: 1
            }
          },
          splitLine: {
            show: true,
            //  改变轴线颜色
            lineStyle: {
              // 使用深浅的间隔色
              color: ['#E7E7E7'],
              type: 'dotted'
            }
          },
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: '12px',
              color: '#000'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: '12px',
              color: '#000'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#b8b8b8',
              width: 1
            }
          },
          splitLine: {
            show: true,
            //  改变轴线颜色
            lineStyle: {
              // 使用深浅的间隔色
              color: ['#E7E7E7'],
              type: 'dotted'
            }
          }
        },
        grid: {
          top: '9%',
          left: '50px',
          right: '10px',
          bottom: '2%',
          backgroundColor: '#fff',
          width: 'auto',
          height: '73%'
        },
        // dataZoom: [{
        //   type: 'slider',
        //   id: 'dataZoomX',
        //   show: true,
        //   realtime: true,
        //   xAxisIndex: 0,
        //   start: 10,
        //   end: 50, // 初始化滚动条
        //   orient: 'horizontal', // 布局方式是横还是竖。不仅是布局方式，对于直角坐标系而言，也决定了，缺省情况控制横向数轴还是纵向数轴。'horizontal'：水平。'vertical'：竖直。
        //   zoomLock: true, // 是否锁定选择区域（或叫做数据窗口）的大小。如果设置为 true 则锁定选择区域的大小，也就是说，只能平移，不能缩放。
        //   throttle: 100, // 设置触发视图刷新的频率。单位为毫秒（ms）。
        //   zoomOnMouseWheel: true, // 如何触发缩放。可选值为：true：表示不按任何功能键，鼠标滚轮能触发缩放。false：表示鼠标滚轮不能触发缩放。'shift'：表示按住 shift 和鼠标滚轮能触发缩放。'ctrl'：表示按住 ctrl 和鼠标滚轮能触发缩放。'alt'：表示按住 alt 和鼠标滚轮能触发缩放。
        //   moveOnMouseMove: true
        // }],
        series: [{
          data: [90, 80, 60, 80, 70, 100, 80],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(
              0, 1, 0, 0,
              [
                { offset: 1, color: '#5CE8FF' },
                { offset: 0, color: '#5466E0' }
              ]
            )
            // barBorderRadius: [10, 10, 0, 0]
          },
          showBackground: true,
          backgroundStyle: {
            color: '#fff'
          },
          barWidth: '30%',
          type: 'bar',
          label: {
            show: true,
            position: 'top',
            formatter: '{c}%'
          }
        }]
      }
    }
  },
  watch: {
    barData: {
      handler (val, oldval) {
        const arr = [];
        for (var key in val) {
          arr.push(val[key])
        }
        this.echartBar.setOption({
          series: [
            {
              data: arr
            }
          ]
        });
      },
      // 对象需要深度监听
      deep: true
    }
    // filterName (val) {
    //   if (val === 'week') {
    //     this.option.xAxis.data = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
    //     this.option.series[0].data = [90, 80, 60, 80, 70, 10, 80];
    //     this.echartBar.setOption({
    //       xAxis: {
    //         data: this.option.xAxis.data
    //       },
    //       series: [{
    //         data: this.option.series[0].data
    //       }]
    //     });
    //   } else if (val === 'month') {
    //     this.option.xAxis.data = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    //     this.option.series[0].data = [90, 80, 60, 80, 70, 50, 80, 60, 80, 70, 50, 80];
    //     this.echartBar.setOption({
    //       xAxis: {
    //         data: this.option.xAxis.data
    //       },
    //       series: [{
    //         data: this.option.series[0].data
    //       }]
    //     });
    //   } else if (val === 'year') {
    //     this.option.xAxis.data = ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'];
    //     this.option.series[0].data = [70, 80, 60, 80, 70, 50, 70, 60, 80, 90];
    //     this.echartBar.setOption({
    //       xAxis: {
    //         data: this.option.xAxis.data
    //       },
    //       series: [{
    //         data: this.option.series[0].data
    //       }]
    //     });
    //   }
    // }
  },
  mounted () {
    const arr = [];
    for (var key in this.barData) {
      arr.push(this.barData[key])
    }
    // console.log(arr);
    this.option.series[0].data = arr;
    this.echartBar = echarts.init(this.$refs.echartBar, 'light');
    this.echartBar.setOption(this.option);
    var that = this;
    // 自适应布局
    window.addEventListener('resize', function () {
      const width = that.$refs.echartBar.clientWidth;
      const height = that.$refs.echartBar.clientHeight;
      that.echartBar.resize({
        width: width,
        height: height
      })
    })
  }
}
</script>
<style lang="scss">
.echartBar {
  height: 90%;
}
</style>
