<template>
  <div class="clock-content">
    <span class="hours-minutes">{{ timeHoursMinutes }}</span>
    <span class="time-detail" :key="'timeDetailKey' + timeDetailKey">{{ timeDetail }}</span>
  </div>
</template>

<script setup>
import moment from 'moment'
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useAppStore } from '@/store'
const appStore = useAppStore()

let timeHoursMinutes = ref(null)
let timeDetail = ref(null)
let timeDetailKey = ref(0)
let timer = ref(null)

timeHoursMinutes.value = moment().format('HH:mm')
let initTimer = () => {
  timer && clearInterval(timer)
  timer = setInterval(() => {
    timeHoursMinutes.value = moment().format('HH:mm')
  }, 1000)
}

let initTimeDetail = lang => {
  if (lang == 'zh') {
    moment.updateLocale('zh-cn', {
      weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    })
  } else {
    moment.updateLocale('en', {
      weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    })
  }
  timeDetail = moment().format('DD-MM-YYYY dddd')
  // 解决dom未响应式更新
  timeDetailKey.value = timeDetailKey.value += 1
}

const locale = computed(() => appStore.lang)
initTimeDetail(locale.value)

watch(locale, (newValue, oldValue) => {
  if (newValue) {
    initTimeDetail(newValue)
  }
})

onMounted(() => {
  initTimer()
})

onUnmounted(() => {
  timer && clearInterval(timer)
})

defineOptions({
  name: 'clock',
})
</script>

<style scoped lang="scss">
.clock-content {
  display: flex;
  align-items: center;
}
.hours-minutes {
  font-size: 26px;
}
.time-detail {
  margin-left: 10px;
}
</style>
