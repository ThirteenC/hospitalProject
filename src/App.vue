<template>
  <!-- <p class="test">{{ $t('header.home') }}</p> -->
  <el-config-provider :locale="locale" :size="size">
    <router-view />
    <signalr></signalr>
  </el-config-provider>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { useAppStore } from '@/store'
import signalr from '@/components/signalr/index.vue'
// import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'App',
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
    signalr,
  },
  setup() {
    // const { t } = useI18n()
    const appStore = useAppStore()
    const locale = computed(() => (appStore.lang === 'zh' ? zhCn : en))
    const size = computed(() => appStore.size)
    return {
      locale,
      size,
    }
  },
})
</script>
