<template>
  <div class="toast-main" v-if="visible" @click="onClose()">
    <div class="toast-content">{{ toastContent }}</div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
let visible = ref(false)
let toastContent = ref('')

let onClose = () => {
  toastContent.value = ''
  visible.value = false
}

let show = obj => {
  const { text, duration = 3000 } = obj
  // duration 自动关闭时间 单位：毫秒，默认3秒，传0则不会自动关闭
  toastContent.value = text
  visible.value = true
  if (duration > 0) {
    setTimeout(() => {
      onClose()
    }, duration)
  }
}

defineExpose({ show })
</script>
<style lang="scss" scoped>
.toast-main {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .toast-content {
    max-width: 500px;
    max-height: 300px;
    position: fixed;
    background: rgba(0, 0, 0, 0.8);
    z-index: 999998;
    border-radius: 4px;
    padding: 30px 50px;
    color: #fff;
  }
}
</style>