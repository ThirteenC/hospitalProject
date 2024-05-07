<template>
  <div class="chat">
    <toast ref="toastRef" />
  </div>
</template>
<script setup>
import * as signalR from '@microsoft/signalr'
import { ref, computed } from 'vue'
import { setGlobal } from '@/utils/index.js'
import { axiosConfiguration } from '@/utils/explain'
import { useI18n } from 'vue-i18n'
import toast from '@/components/toast/index.vue'
const { t } = useI18n()
let signal = ref(null)
const toastRef = ref(null)
let DeviceType = ''
let DeviceId = ''

// 通讯连接状态
let connectState = computed(() => {
  let state = ''
  if (!signal.value) return '断开'
  let connectionState = signal.value.connection._connectionState
  state = connectionState === 'Connected' ? '已连接' : '断开'
  return state
})

let initSignalR = () => {
  if (signal.value != null) return
  let url = axiosConfiguration.signalrUrl //服务器地址

  DeviceType = 2 // 裝置類型(固定填 2)
  DeviceId = Date.now() // 裝置識別碼(應用程序第一啟動時產生)

  // 當應用程序第一次啟動時, 檢查 storage 是否有"DeviceId" 的欄位數據
  // 如果沒有則產生一個隨機碼並存入storage該欄位
  if (!localStorage.getItem('DeviceId')) {
    localStorage.setItem('DeviceId', DeviceId)
  }

  // 创建连接对象
  signal.value = new signalR.HubConnectionBuilder()
    .withUrl(`${url}`, {
      skipNegotiations: true,
    })
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build()
  if (signal.value) {
    // 定义服务端调用的方法
    signal.value.on('Receive', res => {
      receiveData(res)
    })
    // 开始连接
    signal.value
      .start()
      .then(() => {
        console.log('通讯连接成功')
        register()
        testSend()
      })
      .catch(() => {
        console.log('连接失败')
      })

    signal.value.onclose(() => {
      console.log('通讯连接断开')
      toastRef.value.show({ text: t('system.reconnectTips') })
      reconnect()
    })
  }
  // 全局注入
  setGlobal('$signal', signal.value)
}

initSignalR()

let reconnect = () => {
  const ms = 5000
  const start = timer => {
    setTimeout(() => {
      if (!signal.value) return
      let connectionState = signal.value.connection._connectionState
      if (connectionState === 'Connected') return
      try {
        signal.value
          .start()
          .then(() => {
            console.log('重新连接成功')
            register()
            toastRef.value.show({ text: t('system.reconnectionSuccessful') })
          })
          .catch(e => {
            console.log('重新连接失败', e)
            start(ms)
          })
      } catch (e) {
        //重试
        start(ms)
      }
    }, timer)
  }
}

// 接收数据
let receiveData = msg => {
  console.log('收到消息', msg)
  toastRef.value.show({ text: msg })
}

// 注册
let register = () => {
  let params = { DeviceId, DeviceType }
  let jsonStr = JSON.stringify(params)
  signal.value.invoke('Register', jsonStr)
}

// 测试发送
let testSend = () => {
  signal.value.invoke('TestInvoke', 'testInvoke Msg')
}
</script>
<style lang="scss" scoped>
</style>