<template>
  <div class="device-detail">
    <el-row :gutter="40">
      <el-col :span="14">
        <h3>设备数据</h3>
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>当前数据</span>
              <div class="running">
                <span class="running-icon"> </span>
                <span class="running-icon-dot"></span>
              </div>
            </div>
          </template>
          <div id="current" style="width: 100%; height: 400px;"></div>
        </el-card>
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>历史数据</span>
            </div>
          </template>
          <div id="history" style="width: 100%; height: 400px;"></div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <h3>设备信息</h3>
        <el-card class="device-card">
          <div class="card-item">
            <label>设备名称：</label>
            <span>{{ device.NAME }}</span>
          </div>
          <div class="card-item">
            <label>设备描述：</label>
            <span>{{ device.INFO }}</span>
          </div>
          <div class="card-item">
            <label>所属厂区：</label>
            <span>{{ device.AREA }}</span>
          </div>
          <div class="card-item">
            <label>设备类型：</label>
            <span>{{ deviceTypeMap[device.TYPE] }}</span>
          </div>
          <div class="card-item">
            <label>设备型号：</label>
            <span>{{ device.MODEL }}</span>
          </div>
          <div class="card-item">
            <label>序列号码：</label>
            <span>{{ device.SN }}</span>
          </div>
          <div class="card-item">
            <label>SIM卡号：</label>
            <span>{{ device.SIMCARD }}</span>
          </div>
           <div class="card-item">
            <label>创建时间：</label>
            <span>{{ device.CREATE_AT }}</span>
          </div>
        </el-card>
        <el-card class="chart-card">
          <div id="map" style="height: 554px;width: 100%;"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import * as echarts from 'echarts'
import devices from '../assets/devices.json'
import AMapLoader from '@amap/amap-jsapi-loader'

export default defineComponent({
  name: 'Devices',
  setup() {
    let device: any = ref({})
    const deviceTypeMap = {
      1: '电表',
      2: '水表',
      3: '燃气表',
      4: '空气压强表',
    }
    const tableData = computed(() => {
      return devices
    })
    const route = useRoute()
    const loadData = () => {
      const { id } = route.params
      const _id = parseInt(id as string, 10)
      const findData = tableData.value.find((item) => item.ID === _id)
      if (findData) {
        device.value = findData
      }
    }
    const currentDataInit = () =>{
      const mainDom = document.getElementById('current')
      if (!mainDom) {
        return
      }
      const myChart = echarts.init(mainDom, 'dark')
      const option = {
        backgroundColor: '#0B0F12',
        series: [
          {
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            splitNumber: 12,
            itemStyle: {
              color: '#FFAB91',
            },
            progress: {
              show: true,
              width: 30,
            },

            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                width: 30,
              },
            },
            axisTick: {
              distance: -45,
              splitNumber: 5,
              lineStyle: {
                width: 2,
                color: '#999',
              },
            },
            splitLine: {
              distance: -52,
              length: 14,
              lineStyle: {
                width: 3,
                color: '#999',
              },
            },
            axisLabel: {
              distance: -20,
              color: '#999',
              fontSize: 20,
            },
            anchor: {
              show: false,
            },
            title: {
              show: false,
            },
            detail: {
              valueAnimation: true,
              width: '60%',
              lineHeight: 40,
              height: '15%',
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 60,
              fontWeight: 'normal',
            },
            data: [
              {
                value: 20,
              },
            ],
          },

          {
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            itemStyle: {
              color: '#FD7347',
            },
            progress: {
              show: true,
              width: 8,
            },

            pointer: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: 20,
              },
            ],
          },
        ],
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
    const historyDataInit = () =>{
      const mainDom = document.getElementById('history')
      if (!mainDom) {
        return
      }
      const myChart = echarts.init(mainDom, 'dark')
      const option = {
        backgroundColor: '#0B0F12',
        color: ['#00DED8'],
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
          markPoint: {
            data: [
              {type: 'max', name: '最大值'},
              {type: 'min', name: '最小值'}
            ]
          },
          markLine: {
            data: [
              {type: 'average', name: '平均值'}
            ]
          }
        }]
      }
      myChart.setOption(option)
    }
    AMapLoader.load({
      key: '83c7c12fa9dd4f828417843dc261662f', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '1.4.15', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      AMapUI: {
        // 是否加载 AMapUI，缺省不加载
        version: '1.1', // AMapUI 缺省 1.1
        plugins: ['overlay/SimpleMarker'],
      },
      Loca: {
        // 是否加载 Loca， 缺省不加载
        version: '1.3.2', // Loca 版本，缺省 1.3.2
      },
    })
      .then(AMap => {
        const { POS } = device.value
        console.log(POS)
        const pos = POS.split(',')
        const amap = new AMap.Map('map',{ // container为容器的id
          zoom: 15, //初始化地图层级
          center: pos //初始化地图中心点
        })
        // 标记
        const marker = new AMap.Marker({
          position: pos // 基点位置
        })
        const styleName = 'amap://styles/dark'
        amap.setMapStyle(styleName)
        // 地图添加标记
        amap.add(marker)
      })
      .catch(e => {
        console.log(e)
      })
    onMounted(() => {
      loadData()
      currentDataInit()
      historyDataInit()
    })
    const center = { lat: 40.689247, lng: -74.044502 }

    return {
      center,
      device,
      tableData,
      deviceTypeMap,
    }
  },
})
</script>

<style lang="scss">
.device-detail {
  .chart-card {
    .el-card__body {
      padding: 0px;
    }
  }
  .device-card .el-card {
    border: none;
    border-bottom: 1px solid #2f363a;
    .el-card__body {
      padding: 20px 0;
      .card-item {
        margin-bottom: 20px;
      }
      label {
        color: #848383;
        margin-right: 80px;
      }
    }
  }
}
</style>
