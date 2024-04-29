<template>
  <div :class="set.classObject" class="app-wrapper">
    <div class="layout-section" :class="set.layoutMod + '-layout'">
      <div class="main-container">
        <div :class="{ 'fixed-header': set.fixedHeader }">
          <NavBar :class="set.layoutMod === 'vertical' ? '' : 'sidebar-container horizontal'" />
        </div>
        <AppMain :needTagsView="false" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, unref, reactive, computed, watch, watchEffect, onMounted, onBeforeMount } from 'vue'

import { NavBar, AppMain } from './components'
import { toggleClass } from '@/utils/el'
import { useEventListener } from '@vueuse/core'

import { useRoute } from 'vue-router'
import { useAppStore, useSettingsStore } from '@/store'

const appStore = useAppStore()
const settingsStore = useSettingsStore()

const hiddenMainContainer = 'hidden-main-container'

const set = reactive({
  device: computed(() => {
    return appStore.device
  }),
  fixedHeader: computed(() => {
    return settingsStore.fixedHeader
  }),
  classObject: computed(() => {
    const obj = {
      mobile: set.device === 'mobile',
    }
    return obj
  }),
  layoutMod: computed(() => {
    return settingsStore.layoutMod
  }),
})

const handleClickOutside = params => {
  appStore.CLOSE_SIDEBAR({ withoutAnimation: params })
}

const route = useRoute()
const WIDTH = ref(992)
const containerHiddenSideBar = ref(false)

watchEffect(() => {
  if (set.device === 'mobile') {
    handleClickOutside(false)
  }
})

watch(
  route,
  async () => {
    if (set.device === 'mobile') {
      handleClickOutside(false)
    }
  },
  { immediate: true }
)

const $_isMobile = () => {
  const rect = document.body.getBoundingClientRect()
  return rect.width - 1 < WIDTH.value
}

const $_resizeHandler = () => {
  if (!document.hidden) {
    const isMobile = $_isMobile()
    const currentDevice = isMobile ? 'mobile' : 'desktop'
    appStore.TOGGLE_DEVICE(currentDevice)
    if (isMobile) {
      handleClickOutside(true)
    }
  }
}

onMounted(() => {
  const isMobile = $_isMobile()
  if (isMobile) {
    appStore.TOGGLE_DEVICE('mobile')
    handleClickOutside(true)
  }
  toggleClass(unref(containerHiddenSideBar), hiddenMainContainer, document.querySelector('.main-container'))
})

onBeforeMount(() => {
  useEventListener('resize', $_resizeHandler)
})
</script>

<style lang="scss" scoped>
@import '../styles/mixin.scss';
@import '../styles/variables.module.scss';

.app-wrapper {
  @include clearFix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9 !important;
  // width: calc(100% - #{$sideBarWidth});
  width: 100%;
  transition: width 0.28s;
  &.main-container {
    width: 100%;
  }
}

.hideSidebar {
  .fixed-header {
    width: calc(100% - 54px);
  }
  .horizontal-layout .fixed-header {
    width: 100%;
  }
}
.horizontal-layout .fixed-header,
.mobile .fixed-header {
  width: 100%;
}

.layout-section {
  &.vertical-layout {
  }
  &.horizontal-layout {
    width: 100%;
    position: relative;
  }
}
</style>
