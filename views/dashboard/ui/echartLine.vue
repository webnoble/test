<!--
 * @Author: your name
 * @Date: 2020-05-26 20:48:03
 * @LastEditTime: 2020-05-27 10:57:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \monitor\src\views\dashboard\ui\echartLine.vue
-->
<template>
  <div ref="echartLine" class="echartLine"></div>
</template>
<script>
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
require('echarts/lib/component/tooltip');
export default {
  props: {
    filterName: {
      type: String,
      default: 'week'
    },
    chartsData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      option: {
        xAxis: {
          type: 'category',
          boundaryGap: false,
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
              color: ['#E7E7E7']
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
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              fontSize: '12px',
              color: '#000'
            }
          },
          axisTick: {
            alignWithLabel: true
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
              color: ['#E7E7E7']
            }
          }
        },
        toolbox: {
          show: true
        },
        tooltip: {
          trigger: 'axis',
          show: true
        },

        grid: {
          top: '5%',
          left: '50px',
          right: '16px',
          bottom: '2%',
          backgroundColor: '#fff',
          width: 'auto',
          height: '75%'
        },
        series: [{
          data: [90, 80, 60, 80, 70, 50, 80],
          itemStyle: {
            color: '#5466E0',
            barBorderRadius: [0, 10, 10, 0]
          },
          showBackground: true,
          backgroundStyle: {
            color: '#EDF6FD'
          },
          markPoint: {
            data: [
              { name: '周最低', value: 5, xAxis: 1, yAxis: -1.5 }
            ]
          },
          // markLine: {
          //   data: [
          //     { type: 'average', name: '平均值' }
          //   ]
          // },
          symbolSize: 5,
          symbol: 'circle',
          smooth: true,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(
              0, 1, 0, 0,
              [
                { offset: 0, color: 'rgba(84, 102, 224, 0)' },
                { offset: 1, color: 'rgba(84, 102, 224, 0.31)' }
              ]
            )
          },
          barWidth: '30%',
          type: 'line',
          label: {
            show: false // 开启显示
          }
        }]
      }
    }
  },
  watch: {
    chartsData: {
      handler (val, oldval) {
        const arr = [];
        for (var key in val) {
          arr.push(val[key])
        }
        this.echartLine.setOption({
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
    //     this.echartLine.setOption({
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
    //     this.echartLine.setOption({
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
    //     this.echartLine.setOption({
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
    // console.log(this.filterName);
    // this.option.xAxis.data = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    // this.option.series[0].data = [90, 80, 60, 80, 70, 50, 80, 60, 80, 70, 50, 80];
    const arr = [];
    for (var key in this.chartsData) {
      arr.push(this.chartsData[key])
    }
    this.option.series[0].data = arr;
    // this.option.series[0].data = this.chartsData;
    this.echartLine = echarts.init(this.$refs.echartLine, 'light');
    this.echartLine.setOption(this.option);
    var that = this;
    // 自适应布局
    window.addEventListener('resize', function () {
      const width = that.$refs.echartLine.clientWidth;
      const height = that.$refs.echartLine.clientHeight;
      that.echartLine.resize({
        width: width,
        height: height
      })
    })
  }
}
</script>
<style lang="scss" scoped>
.echartLine {
  height: 90%;
}
</style>
