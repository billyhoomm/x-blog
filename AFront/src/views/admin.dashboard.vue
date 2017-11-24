<template>
  <div class="dashboard animated fadeIn">
    <!--我的信息title-->
    <h3 class="title">
      <i class="fa fa-fw fa-lg fa-dashboard"></i> 控制台 / <span class="">DASHBOARD</span>
    </h3>

    <div class="main">
      <h4 class="main--title"><i class="fa fa-server"></i> 统计/Statistic</h4>
      <section class="main--statistic">
        <div class="statisticEach">
          <h2>Today</h2>
          <p>
            {{total[0]}}
            <small>PV</small>
          </p>
        </div>
        <div class="statisticEach">
          <h2>Month</h2>
          <p>
            {{total[1]}}
            <small>PV</small>
          </p>
        </div>
        <div class="statisticEach">
          <h2>Year</h2>
          <p>
            {{total[2]}}
            <small>PV</small>
          </p>
        </div>
      </section>
      <h4 class="main--title"><i class="fa fa-bar-chart"></i> 今日统计/Charts</h4>
      <section class="main--statistic">
        <div class="statistic--chart" id="chart">
          <!--chart here-->
        </div>
      </section>

      <h4 class="main--title"><i class="fa fa-map-o"></i> 访问分布/Maps</h4>
      <section class="main--statistic">
        <div class="statistic--map" id="map">
          <!--map here-->
        </div>
      </section>
    </div>

  </div>
</template>
<style scoped lang="scss">
  //base
  @import "../theme/theme.scss";

  * {
    /*outline:1px solid #3d3d3d;*/
  }

  .dashboard {
    overflow: hidden;
    height: 100%;
    min-height: 500px;
    .title {
      width: 100%;
      color: #fff;
      margin-bottom: 30px;
    }

  }

  .main {
    color: #fff;
    .main--title {
      color: $base-theme-color;
    }
    .main--statistic {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 35px;
      .statisticEach {
        text-align: center;
        color: #fff;
        flex: 1;
        border-right: 1px solid #fff;
        border-left: 1px solid transparent;
        &:nth-last-child(1) {
          border-right: 4px solid transparent;
        }
        h2 {
          margin-bottom: 0;
          font-size: 20px;
        }
        p {
          color: $base-theme-color;
          font-size: 35px;
        }
      }

      .statistic--chart {
        width: 100%;
        height: 400px;
        border-radius: 5px;
        padding: 8px;
        box-sizing: border-box;
        background: #fff !important;
      }
      .statistic--map {
        width: 100%;
        height: 500px;
        padding: 8px;
        border-radius: 5px;
        box-sizing: border-box;
        background: #fff !important;
      }
    }
  }

</style>
<script type="text/javascript">
  import Vue from "vue";
  import copyright from '../components/copyright.vue'
  import {GetTotal, GetChart, GetMap} from "../api/api_statistic";

  // 引入 ECharts 主模块
  var echarts = require('echarts/lib/echarts');
  // 引入柱状图
  require('echarts/lib/chart/bar');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');
  require('echarts/lib/component/geo');
  require('../plugin/echarts/china');
  //  require('../plugin/echarts/dark');


  module.exports = {
    data: function () {
      return {
        total: [],
      }
    },
    methods: {
      setThis: function (value, key) {
        this.checkThis = key;
        this.changedValue = value;
      },
      f_getTotal: function (cb) {
        const _this = this;
        GetTotal().then((data)=> {
          _this.total = data;
          cb && cb();
        })
      },
      f_getChart: function (cb) {
        const _this = this;
        GetChart().then((data)=> {
          cb && cb(data);
        })
      },
      f_getMap: function (cb) {
        const _this = this;
        GetMap().then((data)=> {
          cb && cb(data);
        })
      },

    },
    mounted: function () {
      const _this = this;
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('chart'));
      _this.f_getTotal();
      _this.f_getChart(function (data) {
        // 绘制图表
        myChart.setOption({
          color: ['#ff0000'],
          title: {
            text: '过去24小时访问数变化',
            subtext: '实时统计',
            textAlign: 'left'
          },
          tooltip: {
            trigger: 'axis'
          },
          toolbox: {
            show: true,
            feature: {
              magicType: {type: ['line', 'bar']},
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data.x
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} PV'
            }
          },
          series: [
            {
              name: '访问数',
              type: 'line',
              data: data.y,
              markLine: {
                data: [
                  {type: 'average', name: '平均值'},
                  [{
                    symbol: 'none',
                    x: '90%',
                    yAxis: 'max'
                  }, {
                    symbol: 'circle',
                    label: {
                      normal: {
                        position: 'start',
                        formatter: '最大值'
                      }
                    },
                    type: 'max',
                    name: '最高点'
                  }]
                ]
              }
            }
          ]
        });
      });
      _this.f_getMap(function (data) {
        var myMap = echarts.init(document.getElementById('map'));
        myMap.setOption({
          backgroundColor: '#fff',
          title: {
            text: '过去30天访问分布图',
            subtext: '实时统计'
          },
          tooltip: {
            trigger: 'item'
          },
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {}
            }
          },
          geo: {
            map: 'china',
            label: {
              emphasis: {
                show: false
              }
            },
            roam: true,
            scaleLimit: {max: 4, min: 1.2},
            itemStyle: {
              normal: {
//                areaColor: '#38b7ea',
//                borderColor: '#38bbea'
              },
              emphasis: {
                areaColor: '#38b7ea'
              }
            }
          },
          series: [
            {
              name: '访问地:经度:纬度:访问数',
              type: 'scatter',
              coordinateSystem: 'geo',
              data: data,
              symbolSize: function (val) {
                let count = val[2];
                // 最大在8附近，count=24时，约等于8
                return Math.atan(count / 3) * 5.2
              },
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: '#ff0000'
                }
              }
            },
          ]
        })
      })
    },
    components: {
      copyright
    },
  }


</script>
