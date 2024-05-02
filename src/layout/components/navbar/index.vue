<template>
  <div class="navbar">
    <div class="left-menu">
      <Logo :collapse="false" />
      <clock></clock>
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
import clock from './components/clock'

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
  background: #f0f2f5;
  // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: space-between;

  .left-menu {
    display: flex;
    align-items: center;
  }

  .right-menu {
    height: 100%;
    display: flex;
    min-width: 280px;
    align-items: center;
    color: #000000d9;
    justify-content: flex-end;
    padding-right: 10px;

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
  }
}
</style>
