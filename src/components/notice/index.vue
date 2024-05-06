<template>
  <div class="notice">
    <div class="notice-content" ref="noticeContent">欢迎使用我们的产品和服务！</div>
  </div>
</template>
<script>
import { defineComponent,ref, onMounted } from 'vue'

export default defineComponent({
    props: {
        content: {
            type: String,
            default: '欢迎使用我们的产品和服务！',
        },
        speed: {
            type: Number,
            default: 300,
        },
    },
  setup(props) {
    const noticeContent = ref(null)
    const content = props.content
    const speed = props.speed
    const contentWidth = props.content.length * 12

    onMounted(() => {
      noticeContent.value.style.width = contentWidth + 'px'
      let currentIndex = 0

      function marqueeRun() {
        if (currentIndex <= content.length - 1) {
          currentIndex++
        } else {
          currentIndex = 0
        }
        noticeContent.value.innerHTML = String(content.slice(currentIndex, currentIndex + 10))
        setTimeout(marqueeRun, speed)
      }

      marqueeRun()
    })

    return {
      noticeContent,
    }
  },
})
</script>

<style scoped>
.notice {
  width: 97%;
  overflow: hidden;
  position: relative;
  height: 48px;
  line-height: 48px;
  margin: 10px auto;
  background-color: #fef9e8;
  border: 1px solid #fef9e8;
  border-radius: 10px;
}
.notice-content {
  position: absolute;
  white-space: nowrap;
  color: #16a342;
  font-size: 24px;
  transform: left 0.5s ease-in-out;
}
</style>
