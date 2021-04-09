<template>
  <div class="factories">
    <el-row :gutter="40">
      <el-col :span="14">
        <h3>厂区列表</h3>
        <el-row style="margin-top: 40px;" :gutter="40">
          <el-col v-for="(fac, index) in facData" :key="index" :span="12">
            <el-card @click="viewDevives(fac)">
              <div class="image">
                <img src="../assets/module.png" alt="" width="48">
              </div>
              <div class="card-item">
                <label>厂区名称：</label>
                <span>{{ fac.NAME }}</span>
              </div>
              <div class="card-item">
                <label>厂区信息：</label>
                <span>{{ fac.INFO }}</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="10">
        <h3>厂区分布</h3>
        <el-row style="margin-top: 40px;">
          <el-card>
            <div id="fac" style="width: 400px; height: 400px;"></div>
          </el-card>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted } from 'vue'
import Factories from '../assets/factories.json'
import * as echarts from 'echarts'
import { useRouter } from "vue-router"

export default defineComponent({
  name: 'Factories',
  setup() {
    const facData = computed(() => {
      return Factories
    })
    const echartInit = () =>{
      const mainDom = document.getElementById('fac')
      if (!mainDom) {
        return
      }
      const myChart = echarts.init(mainDom, 'dark')
      const option = {
        title: {
          text: '厂区能耗分布',
          left: 'center'
        },
        backgroundColor: '#0B0F12',
        color: [
          '#FE9E00',
          '#00DED8',
          '#ee6666',
          '#9a60b4',
          '#73c0de',
        ],
        tooltip: {
          trigger: 'item',
          formatter: (val) => {
            return `${val.data.value}%`
          }
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: [
              {value: 20, name: '东部厂房-1'},
              {value: 30, name: '东部厂房-2'},
              {value: 10, name: '西部厂房'},
              {value: 20, name: '南部厂房'},
              {value: 50, name: '北部厂房'},
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
    //onMounted
    onMounted(()=>{
      echartInit()
    })
    const router = useRouter()
    const viewDevives = ({ NAME }) => {
      router.push({
        path: '/devices',
        query: {
          area: NAME,
        },
      })
    }
    return {
      facData,
      echartInit,
      viewDevives,
    }
  },
})
</script>

<style lang="scss">
.factories {
  .image {
    float: left;
    margin-right: 20px;
  }
  .el-card {
    .card-item {
      label {
        color: #848383;
      }
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0px;
      }
    }
  }
}
</style>
