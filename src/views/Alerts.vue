<template>
  <div class="alerts">
    <el-row :gutter="40">
      <el-col :span="14">
        <h3>告警列表</h3>
        <el-table
          :data="tableData"
          max-height="600"
          style="width: 100%">
          <el-table-column
            prop="NAME"
            label="告警名称">
            <template #default="{ row }">
              <span :class="{ warning: row.NAME === '告警事件' }">{{ row.NAME }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="INFO"
            label="告警信息">
          </el-table-column>
          <el-table-column
            prop="DEVICE_NAME"
            label="设备">
          </el-table-column>
          <el-table-column
            prop="VALUE"
            label="告警值">
          </el-table-column>
          <el-table-column
            prop="CREATE_AT"
            label="告警时间">
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="10">
        <h3>告警分析</h3>
        <el-card>
          <div id="alerts" style="width: 100%; height: 560px;"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import Alerts from '../assets/alerts.json'
import * as echarts from 'echarts'

export default defineComponent({
  name: 'Alerts',
  setup() {
    const tableData = computed(() => {
      return Alerts
    })
    const echartInit = () =>{
      const mainDom = document.getElementById('alerts')
      if (!mainDom) {
        return
      }
      const myChart = echarts.init(mainDom, 'dark')
      const option = {
        title: {
          text: '厂区设备告警分布',
          left: 'center'
        },
        backgroundColor: '#0B0F12',
        tooltip: {
            trigger: 'item'
        },
        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series: [
            {
                name: '告警条数',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: [
                    {value: 335, name: '东部厂房-1'},
                    {value: 310, name: '东部厂房-2'},
                    {value: 274, name: '西部厂房'},
                    {value: 235, name: '南部厂房'},
                    {value: 400, name: '北部厂房'},
                ].sort(function (a, b) { return a.value - b.value; }),
                roseType: 'radius',
                label: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                labelLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                },
                itemStyle: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                },

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: () => {
                    return Math.random() * 200;
                }
            }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
    onMounted(() => {
      echartInit()
    })
    return {
      tableData,
    }
  },
})
</script>

<style lang="scss">
.alerts {
  .warning {
    color: #f33838;
  }
}
</style>
