<template>
  <div class="devices">
    <h3>设备列表</h3>
    <el-table
      :data="tableData"
      max-height="600"
      style="width: 100%">
      <el-table-column
        prop="NAME"
        label="设备名称">
      </el-table-column>
      <el-table-column
        prop="INFO"
        label="设备信息">
      </el-table-column>
      <el-table-column
        prop="AREA"
        label="所属厂区">
      </el-table-column>
      <el-table-column
        prop="CREATE_AT"
        label="创建时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template #default="{ row }">
          <a href="javascript:;" style="margin-right: 20px;" @click="viewDevice(row)">
            <i class="el-icon-view"></i>
          </a>
         <a href="javascript:;">
           <i class="el-icon-edit-outline"></i>
         </a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import devices from '../assets/devices.json'

export default defineComponent({
  name: 'Devices',
  setup() {
    const tableData = ref(devices)
    const router = useRouter()
    const route = useRoute()
    const { area } = route.query
    if (area) {
      const findData = devices.filter((device) => device.AREA === area)
      tableData.value = findData
    }
    const viewDevice = ({ ID }: typeof devices[0]) => {
      router.push(`/devices/${ID}`)
    }
    return {
      viewDevice,
      tableData,
    }
  },
})
</script>

<style lang="scss">
.devices {
  a {
    font-size: 16px;
  }
}
</style>
