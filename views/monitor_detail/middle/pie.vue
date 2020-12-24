<template>
  <div ref="echartBar" class="echartBar circle"></div>
</template>
<script>
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/pie');
export default {
  props: {
    maxNum: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      option: {
        color: ['#5466e0', '#5cabfb', '#2ed6c6', '#ffc34e', '#aa49d6', '#26b414'],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['90%', '100%'],
            avoidLabelOverlap: false,
            legendHoverLink: false,
            hoverAnimation: false,
            left: 0,
            width: '100%',
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '22',
                fontWeight: '400',
                formatter: [
                  '{a|220个}',
                  '{b|总请求数}'
                ].join('\n'),
                rich: {
                  a: {
                    fontSize: '100%',
                    color: '#2F394E',
                    lineHeight: 32
                  },
                  b: {
                    fontSize: 14,
                    color: '#666666'
                  }
                }
              }
            },
            // labelLine: {
            //   show: false
            // },
            data: [
              { value: 62, name: '每秒请求数' },
              { value: 58, name: '运行线程数' },
              { value: 35, name: '空闲线程数' },
              { value: 75, name: '停止线程数' },
              { value: 64, name: '数据发送数' },
              { value: 68, name: '数据接收数' }
            ]
          }
        ]
      }
    }
  },
  mounted () {
    this.option.series[0].emphasis.label.formatter = [`{a|${this.maxNum || 0}个}`, '{b|总请求数}'].join('\n');
    this.echartBar = echarts.init(this.$refs.echartBar, 'light');
    this.echartBar.setOption(this.option);
    var that = this;
    // 默认高亮
    let index = 0; // 高亮索引
    this.echartBar.dispatchAction({
      type: 'highlight',
      seriesIndex: index,
      dataIndex: index
    });
    this.echartBar.on('mouseover', function (e) {
      if (e.dataIndex !== index) {
        that.echartBar.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: index
        });
      }
    });
    this.echartBar.on('mouseout', function (e) {
      index = e.dataIndex;
      that.echartBar.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: e.dataIndex
      });
    });
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
<style lang="scss" scoped>
.circle {
  font-size: 24px;
}
@media screen and (min-width: 1680px) {
  .circle {
    font-size: 34px;
  }
}
</style>
