<template>
  <div class="device-detail">
    <h3>设备数据</h3>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import devices from '../assets/devices.json'

export default defineComponent({
  name: 'Devices',
  setup() {
    let device = reactive({})
    const tableData = computed(() => {
      return devices
    })
    const route = useRoute()
    const loadData = () => {
      const { id } = route.params
      const _id = parseInt(id as string, 10)
      const findData = tableData.value.find((item) => item.ID === _id)
      if (findData) {
        device = findData
      }
      console.log(device)
    }
    onMounted(loadData)
    return {
      device,
      tableData,
    }
  },
})
</script>
