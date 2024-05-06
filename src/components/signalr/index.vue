<template>
  <div class="chat">
    <!-- <p class="chatInfo">
      通讯连接状态：
      <span :style="{ color: connectState == '已连接' ? 'green' : 'red' }">
        {{ connectState }}
      </span>
    </p> -->
  </div>
</template>
<script setup>
import * as signalR from '@microsoft/signalr'
import { ref, onMounted, onUnmounted } from 'vue'
import { setGlobal, getGlobal } from '@/utils/index.js'

let signal = ref(null)
// computed: {
//     connectState() {
//       let state = ''
//       if (!signal) return '断开'
//       let connectionState = signal.connection._connectionState
//       state = connectionState === 'Connected' ? '已连接' : '断开'
//       return state
//     },
//   }

let initSignalR = () => {
  console.log(signal, 'signal')
  if (signal.value != null) return
  let url = 'https://testim.kangzhiyunyi.cn' //服务器地址
  const { NickName, AvatarUrl, DoctorCode } = {}
  let nickName = NickName
  let avatar = AvatarUrl
  let msgCode = DoctorCode
  // 创建连接对象
  signal.value = new signalR.HubConnectionBuilder()
    .withUrl(`${url}/chat?nickName=${nickName}&Avatar=${avatar}&MsgSendCode=${msgCode}`, {
      skipNegotiations: true,
    })
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build()
  if (signal.value) {
    // 定义后端调用的方法
    signal.value.on('receive', res => {
      receiveData(res)
    })
    // 开始连接
    signal.value
      .start()
      .then(() => {
        console.log('通讯连接成功')
      })
      .catch(() => {
        console.log('连接失败')
      })

    signal.value.onclose(() => {
      console.log('通讯连接断开')
      reconnect()
    })
  }
  console.log(signal.value, '通讯对象')
  // 全局注入
  setGlobal('$signal', signal.value)
}

initSignalR()

onMounted(() => {
  console.log(getGlobal('$signal'))
})

onUnmounted(() => {})

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
          })
          .catch(e => {
            console.log('重新连接成功', e)
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
let receiveData = () => {
  let data = res
  // console.log("list收到消息", data);
  // 更新对应房间最新发送消息
  this.$refs.chatList && this.$refs.chatList.upDateMsg(data)
}
</script>
<style lang="scss" scoped>
</style>