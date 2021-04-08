<template>
  <el-container>
    <el-aside width="200px">
      <div style="margin: 32px 0;">
        <img src="./assets/logo.png" alt="" width="100" />
      </div>
      <el-menu
        :uniqueOpened="true"
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#0B0F12"
        text-color="#fff"
        active-text-color="#FE9E00">
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <template #title>OVERVIEW</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="height: 60px;">
        <div class="header-tabs">
          <a href="javascript:;" @click="routerView('/factories')" :class="{ active: currentPath === 'Factories' }">厂区数据</a>
          <a
            href="javascript:;"
            @click="routerView('/devices')"
            :class="{ active: currentPath === 'Devices' || currentPath === 'DeviceDetail' }">
            设备管理
          </a>
          <a href="javascript:;" @click="routerView('/alerts')" :class="{ active: currentPath === 'Alerts' }">告警管理</a>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup() {
    const router = useRouter()
    const routerView = (path: string) => {
      router.push(path)
    }
    const currentPath = computed(() => {
      return router.currentRoute.value.name
    })
    return {
      currentPath,
      routerView,
    }
  },
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.el-header {
  color: #333;
  line-height: 60px;
  margin-left: 200px;
  border-bottom: 1px solid #2f363a;
  padding: 0 32px !important;
}
.el-main {
  margin: 0 32px 0 232px;
  padding: 40px 0 !important;
  font-size: 14px;
}
.el-icon-menu {
  position: relative;
  top: -2px;
}
.el-menu {
  border-right: none !important;
}
.el-menu-item {
  font-weight: 600;
}
.el-aside {
  color: #333;
  background: #0B0F12;
  border-right: 1px solid #2f363a;
  text-align: center;
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 1002;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 45px;
  box-shadow: 0 0 15px #0b0b0b;
}
.header-tabs {
  a {
    color: #848383;
    margin-right: 48px;
    padding-bottom: 17px;
    &.active {
      color: #fff;
      border-bottom: 1px solid #FE9E00;
    }
  }
}
</style>