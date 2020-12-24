<!--
import { log } from 'util';
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
require('echarts/lib/component/markLine');
export default {
  props: {
    chartsData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data () {
    return {
      style: {
        green: {
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              { offset: 0, color: 'rgba(46, 214, 198, 0)' },
              { offset: 1, color: 'rgba(46, 214, 198, 0.5)' }
            ])
          },
          itemStyle: {
            color: '#2ED6C6'
          }
        },
        purple: {
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              { offset: 0, color: 'rgba(101, 119, 224, 0)' },
              { offset: 1, color: 'rgba(101, 119, 224, 0.4)' }
            ])
          },
          itemStyle: {
            color: '#6577E0'
          }
        },
        multipleStyle: [
          {
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                { offset: 0, color: 'rgba(92, 171, 251, 0)' },
                { offset: 1, color: 'rgba(92, 171, 251, 0.5)' }
              ])
            },
            itemStyle: {
              color: '#5CABFB'
            }
          },
          {
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                { offset: 0, color: 'rgba(46, 214, 198, 0)' },
                { offset: 1, color: 'rgba(46, 214, 198, 0.5)' }
              ])
            },
            itemStyle: {
              color: '#2ED6C6'
            }
          },
          {
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                { offset: 0, color: 'rgba(255, 208, 78, 0)' },
                { offset: 1, color: 'rgba(255, 208, 78, 0.3)' }
              ])
            },
            itemStyle: {
              color: '#FFD04E'
            }
          },
          {
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                { offset: 0, color: 'rgba(101, 119, 224, 0)' },
                { offset: 1, color: 'rgba(101, 119, 224, 0.4)' }
              ])
            },
            itemStyle: {
              color: '#6577E0'
            }
          }
        ],
        multipleStyle2: [
          {
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                { offset: 0, color: 'rgba(92, 171, 251, 0)' },
                { offset: 1, color: 'rgba(92, 171, 251, 0.5)' }
              ])
            },
            itemStyle: {
              color: '#5CABFB'
            }
          },
          {
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                { offset: 0, color: 'rgba(255, 208, 78, 0)' },
                { offset: 1, color: 'rgba(255, 208, 78, 0.3)' }
              ])
            },
            itemStyle: {
              color: '#FFD04E'
            }
          }
        ]
      },
      option: {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [
            '星期一',
            '星期二',
            '星期三',
            '星期四',
            '星期五',
            '星期六',
            '星期日'
          ],
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
              color: '#b8b8b8'
            }
          }
        },
        grid: {
          top: '10px',
          left: '50px',
          right: '80px',
          bottom: '20px',
          backgroundColor: '#fff',
          width: 'auto'
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
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
        series: [
          {
            markLine: {
              data: [],
              silent: true,
              label: {
                show: true,
                formatter: '{b}: {c}'
              },
              lineStyle: {
                color: '#F13E3E',
                type: 'dashed'
              },
              symbol: 'none'
            },
            lineStyle: {
              width: 1
            },
            itemStyle: {
              color: '#5466E0'
            },
            showBackground: true,
            backgroundStyle: {
              color: '#EDF6FD'
            },
            symbolSize: 5,
            symbol:
              'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z',
            smooth: false,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                { offset: 0, color: 'rgba(84, 102, 224, 0)' },
                { offset: 1, color: 'rgba(84, 102, 224, 0.31)' }
              ])
            },
            barWidth: '30%',
            type: 'line',
            label: {
              show: false // 开启显示
            }
          }
        ]
      }
    };
  },
  watch: {
    chartsData: {
      handler (val, oldval) {
        // console.log(val);
        const data = JSON.parse(JSON.stringify(val));
        const dataX = data.x.reverse();
        if (!val.multiple) {
          this.echartLine.setOption({
            xAxis: {
              data: dataX
            },
            series: [
              {
                data: val.y
              }
            ]
          });
        }
      },
      // 对象需要深度监听
      deep: true
    }
  },
  created () {
    const data = JSON.parse(JSON.stringify(this.chartsData));
    let dataX = data.x;
    if (data.x[0] > data.x[1]) {
      dataX = data.x.reverse();
    }
    this.option.xAxis.data = dataX;
    // console.log(this.option.xAxis.data)
    // console.log(this.option.xAxis.data)
    // console.log(this.chartsData);
    if (this.chartsData.multiple) {
      this.chartsData.y.forEach((item, index) => {
        const seriesObj = JSON.parse(JSON.stringify(this.option.series[0]));
        // console.log(seriesObj);
        if (index > 0) {
          this.option.series.push(seriesObj);
        }
        this.setSeries(index, item, this.style[this.chartsData.style][index]);
      });
    } else {
      this.setSeries(0, '', this.style[this.chartsData.style]);
      // this.option.series[0].data = this.chartsData.y;
      // this.option.series[0].areaStyle = this.style[this.chartsData.style].areaStyle;
      // // this.option.series[0].backgroundStyle = this.style[this.chartsData.style].backgroundStyle;
      // this.option.series[0].itemStyle = this.style[this.chartsData.style].itemStyle;
      // if (this.chartsData.markLine) this.option.series[0].markLine.data[0] = this.chartsData.markLine;
    }
  },
  mounted () {
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
      });
    });
    // const timer = setInterval(() => {
    //   this.getCharData()
    // }, 10000)
    // this.$once('hook:beforeDestroy', () => { clearInterval(timer); })
  },
  methods: {
    setSeries (index, data, style) {
      this.option.series[index].data = data || this.chartsData.y;
      this.option.series[index].areaStyle = style.areaStyle;
      // this.option.series[0].backgroundStyle = this.style[this.chartsData.style].backgroundStyle;
      this.option.series[index].itemStyle = style.itemStyle;
      if (this.chartsData.markLine && Math.max(...this.chartsData.y) > this.chartsData.markLine.yAxis) {
        this.option.series[index].markLine.data[0] = this.chartsData.markLine;
      } else {
        this.option.grid.right = '20px';
      }
    }
    // getCharData () {
    //   if (this.chartsData.multiple) {
    //     this.chartsData.y.forEach((item, index) => {
    //       item.unshift(Math.floor(Math.random() * Math.max(...item) * 1.1));
    //       item.pop();
    //       this.setSeries(index, item, this.style[this.chartsData.style][index]);
    //     });
    //   } else {
    //     this.chartsData.y.unshift(
    //       Math.floor(Math.random() * Math.max(...this.chartsData.y) * 1.1)
    //     );
    //     this.chartsData.y.pop();
    //     this.setSeries(0, '', this.style[this.chartsData.style]);
    //   }
    //   this.echartLine = echarts.init(this.$refs.echartLine, 'light');
    //   this.echartLine.setOption(this.option);
    // }
  }
};
</script>
<style lang="scss">
.echartLine {
  height: 100%;
}
</style>
