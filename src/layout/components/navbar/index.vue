<template>
  <div class="navbar">
    <div>
      <Logo :collapse="false" />
    </div>

    <div class="right-menu">
      <LangSelect class="p8 hover-effect" />
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useAppStore, useUserStore, useSettingsStore } from '@/store'
import { useRouter } from 'vue-router'
import LangSelect from './components/LangSelect'
import { emitter } from '@/utils/mitt'

import Logo from '@/layout/components/sidebar/Logo'

const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()
const settingsStore = useSettingsStore()

const set = reactive({
  device: computed(() => {
    return appStore.device
  }),
})

// 退出登录
const logout = async () => {
  await userStore.LOGIN_OUT()
  router.push('/login')
  window.location.reload()
}

defineOptions({
  name: 'NavBar',
})
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
  // background: #fff;
  background: #f0f2f5;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: space-between;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    height: 100%;
    display: flex;
    min-width: 280px;
    align-items: center;
    color: #000000d9;
    justify-content: flex-end;
    padding-right: 30px;

    .icons {
      height: 100%;
      line-height: 50px;
      display: inline-block;
    }

    &:focus {
      outline: none;
    }

    .hover-effect {
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }

    .p8 {
      padding: 0 8px;
    }

    .right-menu-item {
      display: inline-block;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
    }
  }
}
</style>
