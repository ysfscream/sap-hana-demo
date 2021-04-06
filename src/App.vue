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
          <template #title>监控管理</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="height: 80px;"></el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {},
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
  line-height: 80px;
  margin-left: 200px;
  border-bottom: 1px solid #2f363a;
}
.el-main {
  margin: 0 32px 0 232px;
  padding: 60px 0 20px;
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
</style>