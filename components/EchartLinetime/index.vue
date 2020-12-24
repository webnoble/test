<!--
 * @Author: your name
 * @Date: 2020-05-26 20:48:03
 * @LastEditTime: 2020-05-27 10:57:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \monitor\src\views\dashboard\ui\echartLine.vue
-->
<template>
  <div class="echartLineTime">
    <el-date-picker
      v-model="time"
      type="datetime"
      format="yyyy-MM-dd hh:mm"
      value-format="timestamp"
      :picker-options="pickerOption"
      placeholder="开始时间"
    ></el-date-picker>
    <el-date-picker
      v-model="time"
      type="datetime"
      format="yyyy-MM-dd hh:mm"
      value-format="timestamp"
      :picker-options="pickerOption"
      placeholder="结束时间"
    ></el-date-picker>
    <div ref="echartLine" class="echartLine"></div>
  </div>
</template>
<script>
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/markLine');
require('echarts/lib/component/dataZoom');
export default {
  name: 'EchartLinetime',
  props: {
    chartsData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    meId: {
      type: String,
      default: 'OS_192_168_0_235'
    },
    meTypeId: {
      type: String,
      default: '10001'
    },
    kpiCode: {
      type: String,
      default: '100010002'
    }
  },
  data () {
    return {
      time: '',
      startTime: 1597573500000,
      timeArr: [],
      valueArr: [],
      selectableRange: '18:30:00 - 20:30:00',
      endTime: 1597580700000,
      pickerOption: {
        disabledDate (time) {
          return time.getTime() > Date.now() || time.getTime() < (Date.now() - 1000 * 24 * 60 * 60 * 2);
        }
      },
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
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 0,
            end: 20
          },
          {
            type: 'inside',
            realtime: true,
            start: 0,
            end: 20
          }
        ],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [
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
  created () {
    this.pickerOption.selectableRange = '18:30:00 - 20:30:00'
    this.getGraph();
  },
  mounted () {
    this.echartLine = echarts.init(this.$refs.echartLine, 'light');
    this.echartLine.setOption(this.option);
  },
  methods: {
    getGraph () {
      this.$request.get(`/pm/graph?meId=${this.meId}&meTypeId=${this.meTypeId}&kpiCode=${this.kpiCode}&startTime=${this.startTime}&endTime=${this.endTime}`).then(res => {
        res.forEach((item) => {
          this.timeArr.push(item.time);
          this.valueArr.push(item.value * 100);
          this.echartLine.setOption({
            xAxis: {
              data: this.timeArr
            },
            series: [
              {
                data: this.valueArr
              }
            ]
          })
        })
      })
    }
  }
};
</script>
<style lang="scss">
.echartLine {
  height: 100%;
}
</style>
